import { LiveBeatEvent } from "@/types/events";
import { databases } from "./appwrite";

export async function getEvents() {
  const { documents } = await databases.listDocuments(
    import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_EVENTS_COLLECTIONS_ID
  );
  return {
    events: documents.map((document) => {
      const event: LiveBeatEvent = {
        $id: document.$id,
        name: document.name,
        location: document.location,
        date: document.date,
      };
      return event;
    }),
  };
}
