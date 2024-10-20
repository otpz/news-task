"use server"
import { db } from "@/db";
import { getAuthUser, isAdmin } from "../dal";
import { AnnouncementsFormSchema, AnnouncementsFormState } from "../definitions";
import { annoncementsImageTable, annoncementsTable, InsertAnnouncement} from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { uploadImage } from "@/helpers/streamImage";

export const createAnnouncementActionAsync = async (state: AnnouncementsFormState, formData: FormData) => {
    
    const authUser = await getAuthUser()
    if (!authUser) return {errorMessage: "You are not authenticate to create news."}
    const admin = await isAdmin()
    if (!admin) return {errorMessage: "You are not authorized to create news."}
 
    // validation
    const validatedFields = AnnouncementsFormSchema.safeParse({
        subject: formData.get('subject'),
        content: formData.get('content'),
        expireDate: formData.get('expireDate'),
    })

    if (!validatedFields.success) {
        return {errors: validatedFields.error.flatten().fieldErrors}
    }

    const imageFile = formData.get('image') as File
    
    const imagePath = await uploadImage(imageFile)
    
    let announcementImageId: number | null = null
    
    if (imagePath){
        const imageId = await db.insert(annoncementsImageTable).values({imageName: imagePath}).returning({id: annoncementsImageTable.id})
        announcementImageId = imageId[0].id
    }

    // update
    const createAnnouncement: InsertAnnouncement = {
        subject: validatedFields.data.subject,
        content: validatedFields.data.content,
        expireDate: validatedFields.data.expireDate,
        imageId: announcementImageId
    }

    try {
        await db.insert(annoncementsTable).values(createAnnouncement)
    } catch (error) {
        console.log(error)
        return {errorMessage: "An error occurred while updating the user."}        
    }

    revalidatePath("/announcements")
    revalidatePath("/admin/announcement")
    return {message: "Announcement created successfully."}
}

export const updateAnnouncementActionAsync = async (state: AnnouncementsFormState, formData: FormData) => {
    
    const authUser = await getAuthUser()
    if (!authUser) return {errorMessage: "You are not authenticate to update news."}
    const admin = await isAdmin()
    if (!admin) return {errorMessage: "You are not authorized to update news."}

    // validation
    const validatedFields = AnnouncementsFormSchema.safeParse({
        subject: formData.get('subject'),
        content: formData.get('content'),
        expireDate: formData.get('expireDate'),
    })

    const announcementId = parseInt(formData.get('id') as string)
    if (!announcementId) return {errorMessage: "Announcement not found."}

    if (!validatedFields.success) {
        return {errors: validatedFields.error.flatten().fieldErrors}
    }
    
    const formdataImageId = parseInt(formData.get('imageId') as string)
    const imageFile = formData.get('image') as File
    
    const imagePath = await uploadImage(imageFile)
    
    let announcementImageId: number | null = formdataImageId
    if (imagePath){
        console.log("**********",formdataImageId,"**********") 
        if (isNaN(formdataImageId) || formdataImageId === null){
            const imageId = await db.insert(annoncementsImageTable).values({imageName: imagePath}).returning({id: annoncementsImageTable.id})
            announcementImageId = imageId[0].id
        } else {
            const imageId = await db.update(annoncementsImageTable).set({imageName: imagePath}).where(eq(annoncementsImageTable.id, formdataImageId)).returning({id: annoncementsImageTable.id})
            announcementImageId = imageId[0].id
        }
    }

    // update
    const updateAnnouncement: InsertAnnouncement = {
        subject: validatedFields.data.subject,
        content: validatedFields.data.content,
        expireDate: validatedFields.data.expireDate,
        imageId: announcementImageId
    }

    try {
        await db.update(annoncementsTable).set(updateAnnouncement).where(eq(annoncementsTable.id, announcementId))
    } catch (error) {
        console.log(error)
        return {errorMessage: "An error occurred while updating the announcement."}        
    }

    revalidatePath("/announcements")
    revalidatePath("/admin/announcement")
    revalidatePath(`/admin/announcement/${announcementId}`)
    return {message: "News updated successfully."}
}

export const deleteAnnouncementActionAsync = async (announcementId: number) => {

    const authUser = await getAuthUser()
    if (!authUser) return {errorMessage: "You are not authenticate to delete news."}
    const admin = await isAdmin()
    if (!admin) return {errorMessage: "You are not authorized to delete news."}

    try {
        await db.delete(annoncementsTable).where(eq(annoncementsTable.id, announcementId))
    } catch (error) {
        console.log(error)
        return {errorMessage: "An error occurred while deleting the news."}        
    }

    revalidatePath("/admin/announcement")
    return {message: "Announcement deleted successfully."}
}