"use server"
import { db } from "@/db";
import { InsertUser, InsertUserRole, usersRoleTable, usersTable } from "@/db/schema";
import { comparePassword, hashPassword } from "@/helpers/passwordBcrypt";
import { eq } from "drizzle-orm";
import { createSession, deleteSession } from "../session";
import { SigninFormSchema, SigninFormState, SignupFormSchema, SignupFormState } from "../definitions";
import { getUserByEmail } from "../queries/user-queries";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const signupActionAsync = async (state: SignupFormState, formData: FormData) => {
  
  // validation
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    surname: formData.get('surname'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!validatedFields.success) {
    return {errors: validatedFields.error.flatten().fieldErrors}
  }

  if (await getUserByEmail(validatedFields.data.email)){
    return {errors: {email: ["Email already exists"]}}
  }

  const hashedPassword = await hashPassword(validatedFields.data.password)

  const user : InsertUser = {
    email: validatedFields.data.email,
    name: validatedFields.data.name,
    surname: validatedFields.data.surname,
    password: hashedPassword
  }

  try {
    const newUserId = await db.insert(usersTable).values(user).returning({id: usersTable.id})
    console.log("user id", newUserId)
    const newUserRoleId = await db.insert(usersRoleTable).values({userId: newUserId[0].id, roleId: 2}).returning({id: usersRoleTable.id})
    console.log("new user role id", newUserRoleId)
  } catch (error: any) {
    console.log(error)
    return {errors: {email: ["Email already exists"]}}
  }
  
  return {message: "Sign up successful. Redirecting to sign in page."}
}

export const signinActionAsync = async (state: SigninFormState, formData: FormData) => {
  
  // validation
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {errors: validatedFields.error.flatten().fieldErrors}
  }

  const user = await db.select().from(usersTable).where(eq(usersTable.email, validatedFields.data.email))
  if (!user[0]){
    return {errors: {email: ["User not found"]}}
  }

  const isPasswordValid = await comparePassword(validatedFields.data.password, user[0].password)
  if (!isPasswordValid){
    return {errors: {password: ["Invalid password"]}}
  }

  // create session
  const userId = user[0].id
  const fullName = user[0].name + " " + user[0].surname
  await createSession(userId, fullName)
  
  return {message: "Sign in successful. Redirecting to profile."}
}

export const logoutUserAsync = async () => {
    await deleteSession()
    console.log("User signed out")
}
