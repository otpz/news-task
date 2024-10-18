"use server"
import { cookies } from "next/headers"
import { decrypt } from "./session"
import { cache } from "react"
import { usersTable } from "@/db/schema"
import { db } from "@/db"
import { eq } from "drizzle-orm"

export const verifySession = cache(async () => {

    const cookie = cookies().get("session")?.value
    const session = cookie ? await decrypt(cookie) : null

    if (!session || !cookie){
        return null
    }

    const userId: number = session.userId as number

    return {isAuth: true, userId: userId}
})

export const getAuthUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null
    try {
        const data = await db.select({
            id: usersTable.id, 
            name: usersTable.name, 
            surname: usersTable.surname,
            email: usersTable.email,
        })
        .from(usersTable)
        .where(eq(usersTable.id, session.userId))
        const user = data[0]
        return user
    } catch (error) {
        console.log('Failed to fetch user', error)
        return null
    }
})
