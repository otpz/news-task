import { db } from "@/db"
import { newsImagesTable, newsTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getAllNewsAsync = async () => {
    const news = await db.select().from(newsTable).leftJoin(newsImagesTable, eq(newsTable.imageId, newsImagesTable.id))
    if (news.length === 0) return null
    return news
}

export const getNewsByIdAsync = async (id: number) => {
    const news = await db.select().from(newsTable).leftJoin(newsImagesTable, eq(newsTable.imageId, newsImagesTable.id)).where(eq(newsTable.id, id)).limit(1)
    if (news.length === 0) return null
    return news[0]
}
