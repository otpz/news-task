"use server"
import { db } from "@/db";
import { getAuthUser, isAdmin } from "../dal";
import { NewsFormSchema, NewsFormState } from "../definitions";
import { InsertNews, newsImagesTable, newsTable } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { uploadImage } from "@/helpers/streamImage";

export const createNewsActionAsync = async (state: NewsFormState, formData: FormData) => {
    
    const authUser = await getAuthUser()
    if (!authUser) return {errorMessage: "You are not authenticate to create news."}
    const admin = await isAdmin()
    if (!admin) return {errorMessage: "You are not authorized to create news."}
 
    // validation
    const validatedFields = NewsFormSchema.safeParse({
        subject: formData.get('subject'),
        content: formData.get('content'),
        expireDate: formData.get('expireDate'),
    })

    if (!validatedFields.success) {
        return {errors: validatedFields.error.flatten().fieldErrors}
    }

    const imageFile = formData.get('image') as File
    
    const imagePath = await uploadImage(imageFile)
    
    let newsImageId: number | null = null
    if (imagePath){
        const imageId = await db.insert(newsImagesTable).values({imageName: imagePath}).returning({id: newsImagesTable.id})
        newsImageId = imageId[0].id
    }

    // update
    const createNews: InsertNews = {
        subject: validatedFields.data.subject,
        content: validatedFields.data.content,
        expireDate: validatedFields.data.expireDate,
        imageId: newsImageId
    }

    try {
        await db.insert(newsTable).values(createNews)
    } catch (error) {
        console.log(error)
        return {errorMessage: "An error occurred while updating the user."}        
    }

    revalidatePath("/admin/news")
    return {message: "News created successfully."}
}

export const updateNewsActionAsync = async (state: NewsFormState, formData: FormData) => {
    
    const authUser = await getAuthUser()
    if (!authUser) return {errorMessage: "You are not authenticate to update news."}
    const admin = await isAdmin()
    if (!admin) return {errorMessage: "You are not authorized to update news."}

    // validation
    const validatedFields = NewsFormSchema.safeParse({
        subject: formData.get('subject'),
        content: formData.get('content'),
        expireDate: formData.get('expireDate'),
    })

    const newsId = parseInt(formData.get('id') as string)
    if (!newsId) return {errorMessage: "News not found."}

    if (!validatedFields.success) {
        return {errors: validatedFields.error.flatten().fieldErrors}
    }
    
    const formdataImageId = parseInt(formData.get('imageId') as string)
    const imageFile = formData.get('image') as File
    
    const imagePath = await uploadImage(imageFile)
    
    let newsImageId: number | null = formdataImageId
    if (imagePath){
           
        if (isNaN(formdataImageId) || formdataImageId === null){
            const imageId = await db.insert(newsImagesTable).values({imageName: imagePath}).returning({id: newsImagesTable.id})
            newsImageId = imageId[0].id
        } else {
            const imageId = await db.update(newsImagesTable).set({imageName: imagePath}).where(eq(newsImagesTable.id, formdataImageId)).returning({id: newsImagesTable.id})
            newsImageId = imageId[0].id
        }
    }

    // update
    const updateNews = {
        subject: validatedFields.data.subject,
        content: validatedFields.data.content,
        expireDate: validatedFields.data.expireDate,
        imageId: newsImageId
    }

    try {
        await db.update(newsTable).set(updateNews).where(eq(newsTable.id, newsId))
    } catch (error) {
        console.log(error)
        return {errorMessage: "An error occurred while updating the user."}        
    }

    revalidatePath("/admin/news")
    revalidatePath(`/admin/news/${newsId}`)
    return {message: "News updated successfully."}
}

export const deleteNewsActionAsync = async (newsId: number) => {

    const authUser = await getAuthUser()
    if (!authUser) return {errorMessage: "You are not authenticate to delete news."}
    const admin = await isAdmin()
    if (!admin) return {errorMessage: "You are not authorized to delete news."}

    try {
        await db.delete(newsTable).where(eq(newsTable.id, newsId))
    } catch (error) {
        console.log(error)
        return {errorMessage: "An error occurred while deleting the news."}        
    }

    revalidatePath("/admin/news")
    return {message: "News deleted successfully."}
}