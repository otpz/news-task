import fs from 'fs';
import path from 'path';


export const uploadImage = async (imageFile: File) => {

    let imagePath = null

    if (imageFile.size === 0) return null

    const uploadDir = path.join(process.cwd(), 'public/uploads') // path to save the file

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true }) // create the directory if it doesn't exist
        console.log("Directory created")
    }
    console.log("Directory exists")
    
    const fileName = `${Date.now()}-${imageFile.name}`
    imagePath = path.join(uploadDir, fileName)
    
    // read and write the file
    const fileData = Buffer.from(await imageFile.arrayBuffer())
    fs.writeFileSync(imagePath, fileData)
    
    return `/uploads/${fileName}`
} 