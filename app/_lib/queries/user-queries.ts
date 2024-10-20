import { db } from "@/db"
import { usersTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getUserByEmail = async (email: string) => {    
    const user = await db.select().from(usersTable).where(eq(usersTable.email, email))

    if (!user[0]) return null

    return user[0]
}

export const getAllUserAsync = async () => {
    const users = await db.select().from(usersTable)
    if (!users) return null
    return users
}