import Button from "@/components/Button";
import Container from "@/components/Container";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/use-auth";

import { deleteEventById, getEventById } from "@/lib/events";
import { getPreviewImageById } from "@/lib/storage";
import { LiveBeatEvent } from "@/types/events";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";

function Event() {
  const params: { eventId: string } = useParams();
  const [, navigate] = useLocation();
  const { isAdmin } = useAuth();
  const [event, setEvent] = useState<LiveBeatEvent | undefined>();

  const imageUrl = event?.imageFileId && getPreviewImageById(event.imageFileId);

  const image = {
    url: imageUrl,
    alt: "",
    height: event?.imageHeight,
    width: event?.imageWidth,
  };
  useEffect(() => {
    (async function run() {
      const { event } = await getEventById(params.eventId);
      setEvent(event);
    })();
  }, [params.eventId]);

  async function handleOnDeleteEvent() {
    if (!event?.$id) return;
    await deleteEventById(event.$id);
    navigate("/");
  }

  return (
    <Layout>
      <Container className="grid gap-12 grid-cols-1 md:grid-cols-2">
        <div>
          {image?.url && (
            <img
              className="block rounded"
              width={image.width}
              height={image.height}
              src={image.url.toString()}
              alt={image.alt}
            />
          )}
        </div>

        <div>
          {event && (
            <>
              <h1 className="text-3xl font-bold mb-6">{event?.name}</h1>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-200">
                <strong>Date:</strong>{" "}
                {event?.date &&
                  new Date(event?.date).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
              </p>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-200">
                <strong>Location:</strong> {event?.location}
              </p>
              {isAdmin && (
                <p className="mt-6">
                  <Button color="red" onClick={handleOnDeleteEvent}>
                    Delete Event
                  </Button>
                </p>
              )}
            </>
          )}
        </div>
      </Container>
    </Layout>
  );
}

export default Event;
