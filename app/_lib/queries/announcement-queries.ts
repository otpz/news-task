import { db } from "@/db"
import { annoncementsImageTable, annoncementsTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getAllAnnouncementAsync = async () => {
    const announcements = await db.select().from(annoncementsTable).leftJoin(annoncementsImageTable, eq(annoncementsTable.imageId, annoncementsImageTable.id))
    if (announcements.length === 0) return null
    return announcements
}

export const getAnnouncementByIdAsync = async (id: number) => {
    const news = await db.select().from(annoncementsTable).leftJoin(annoncementsImageTable, eq(annoncementsTable.imageId, annoncementsImageTable.id)).where(eq(annoncementsTable.id, id)).limit(1)
    if (news.length === 0) return null
    return news[0]
}
