
import "server-only";
import { createClient } from "contentful";

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";

if (!space || !accessToken) {
  throw new Error(
    "Les variables CONTENTFUL_SPACE_ID et CONTENTFUL_ACCESS_TOKEN sont requises."
  );
}

const client = createClient({
  space,
  accessToken,
  environment,
});

export async function getContentfulPhotos() {
  const response = await client.getEntries({
    content_type: "photoWondersInSight",
    include: 1
  });

  return response.items.flatMap((entry) => {
    const photo = entry.fields.photo;

    if (!photo || typeof photo !== "object" || !("fields" in photo)) {
      return [];
    }

    const asset = photo as {
      fields: {
        title?: string;
        description?: string;
        file?: {
          url?: string;
        };
      };
    };

    const imageUrl = asset.fields.file?.url;

    if (!imageUrl) {
      return [];
    }

    const categories = entry.fields.category;
    const theme = Array.isArray(categories)
      ? categories[0]
      : categories;

    return [
      {
        id: entry.sys.id,
        title:
          typeof entry.fields.subject === "string"
            ? entry.fields.subject
            : asset.fields.title || "Photographie sans titre",
        theme: typeof theme === "string" ? theme : "",
        lieu:
          typeof entry.fields.location === "object" &&
          entry.fields.location !== null &&
          "lat" in entry.fields.location &&
          "lon" in entry.fields.location
            ? `${entry.fields.location.lat}, ${entry.fields.location.lon}`
            : asset.fields.description || "",
        image: imageUrl.startsWith("//")
          ? `https:${imageUrl}`
          : imageUrl,
        alt: asset.fields.title || asset.fields.description || "",
      }
    ]
  });
}
