"use server"
import { db } from "@/db"
import { SelectUserRole, usersRoleTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { JWTPayload, SignJWT, jwtVerify} from "jose" // for session encryption
import { cookies } from "next/headers" // for session cookies
import { NextRequest, NextResponse } from "next/server"

const secretKey = process.env.SECRET_SESSION_KEY
const key = new TextEncoder().encode(secretKey) //encode the secret key

// Encrypts a payload and returns the JWT
export async function encrypt(payload: JWTPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("10d")
        .sign(key)
}

// Decrypts a JWT and returns the payload
export async function decrypt(input: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    })
    return payload
}

export async function createSession(userId: number, fullName: string) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

    const getUserRole: SelectUserRole[] = await db.select().from(usersRoleTable).where(eq(usersRoleTable.userId, userId)).limit(1)
    const roleId = getUserRole[0].roleId

    const session = await encrypt({userId, fullName, expiresAt, roleId})
    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax", // or "strict"
    })
}

export async function deleteSession(){
    cookies().delete('session')
}

export async function updateSession(request: NextRequest){
    const session = request.cookies.get('session')?.value

    if (!session) return null

    const payload = await decrypt(session)

    if (!payload) return null
    
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const res = NextResponse.next()
    res.cookies.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
    })
    return res
}

export async function getSession(){
    const session = cookies().get('session')?.value
    if (!session) return null
    return await decrypt(session)
}




