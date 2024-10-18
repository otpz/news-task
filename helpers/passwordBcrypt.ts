import bcrypt from "bcrypt"

//hash password
export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(12)
    return await bcrypt.hash(password, salt)
}

//compare password
export const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword)
}