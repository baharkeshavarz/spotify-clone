import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import uniqid from 'uniqid'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('songFile') as unknown as File
  const img: File | null = data.get('imageFile') as unknown as File
  const title: string = data.get('title') as string
  const uniqueID = uniqid();
  const fileExtension = file.name.split('.').pop();
  const imgExtension = img.name.split('.').pop();

  // Find the physical path of projcet
  const projectRoot = process.cwd();
  const uploadPath = `${projectRoot}/public/`;

  if (!file || !img) {
    return NextResponse.json({ success: false })
  }

  // Read the file content as an ArrayBuffer using await file.arrayBuffer() and then convert 
  // it into a Node.js Buffer object using Buffer.from(bytes). This is key. It turns the data 
  // from a Web API object into a Node.js Buffer, allowing you to handle the data easily.

  // Upload the song
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const path = `${uploadPath}/songs/musics/song-${title}-${uniqueID}.${fileExtension}`
  await writeFile(path, buffer);

 // Upload the image
  const bytesImg = await img.arrayBuffer()
  const bufferImg = Buffer.from(bytesImg)
  const imagePath = `${uploadPath}/songs/images/image-${title}-${uniqueID}.${imgExtension}`
  await writeFile(imagePath, bufferImg);

  return NextResponse.json({ 
        success: true,
        songFile: `song-${title}-${uniqueID}.${fileExtension}`,
        imageFile:`image-${title}-${uniqueID}.${imgExtension}`,
   })
}
