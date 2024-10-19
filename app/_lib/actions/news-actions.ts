"use server"
import { db } from "@/db";
import { getAuthUser, isAdmin } from "../dal";
import { NewsFormSchema, NewsFormState } from "../definitions";
import { newsTable } from "@/db/schema";
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
    console.log(imagePath)

    // update
    const createNews = {
        subject: validatedFields.data.subject,
        content: validatedFields.data.content,
        expireDate: validatedFields.data.expireDate
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
    
    // update
    const updateNews = {
        subject: validatedFields.data.subject,
        content: validatedFields.data.content,
        expireDate: validatedFields.data.expireDate
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