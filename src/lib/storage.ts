import { storage } from "@/lib/appwrite";
import { ID } from "appwrite";

export async function uploadFile(file: File) {
  const data = await storage.createFile(
    import.meta.env.VITE_APPWRITE_EVENTS_BUCKET_IMAGES_ID,
    ID.unique(),
    file
  );
  return data;
}

export function getPreviewImageById(fileId: string) {
  return storage.getFilePreview(
    import.meta.env.VITE_APPWRITE_EVENTS_BUCKET_IMAGES_ID,
    fileId
  );
}

export function deleteFileById(fileId: string) {
  return storage.deleteFile(
    import.meta.env.VITE_APPWRITE_EVENTS_BUCKET_IMAGES_ID,
    fileId
  );
}
