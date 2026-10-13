
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

function getOptimizedImageUrl(url: string, width: number) {
  const normalizedUrl = url.startsWith("//")
    ? `https:${url}`
    : url;

  const optimizedUrl = new URL(normalizedUrl);
  optimizedUrl.searchParams.set("w", String(width));
  optimizedUrl.searchParams.set("fm", "webp");
  // optimizedUrl.searchParams.set("q", "85"); conversion quality

  return optimizedUrl.toString();
}

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
        image: getOptimizedImageUrl(imageUrl, 800),
        imageFull: getOptimizedImageUrl(imageUrl, 1600),
        alt: typeof entry.fields.alt === "string" ? entry.fields.alt : "",
        narrative : typeof entry.fields.narrative === "string" ? entry.fields.narrative : ""
      }
    ]
  });
}

export async function getHomePhotos() {
  const response = await client.getEntries({
    content_type: "photoWondersInSight",
    "fields.featuredOnHome": true,
    include: 1,
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
        image: getOptimizedImageUrl(imageUrl, 800),
        imageFull: getOptimizedImageUrl(imageUrl, 1600),
        alt: typeof entry.fields.alt === "string" ? entry.fields.alt : "",
        narrative:
          typeof entry.fields.narrative === "string"
            ? entry.fields.narrative
            : "",
      },
    ];
  });
}
