import cloudinary from "cloudinary";
import fs from "fs/promises";

export default async function uploadFile(file, resourceType, folder) {
  try {
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder,
      chunk_size: 50000000, // 50 mb size
      resource_type: resourceType,
    });

    // After successful upload remove the file from local storage
    await fs.rm(file.path);

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
  } catch (error) {
    console.log("error in upload", error);
    return {};
  }
}
