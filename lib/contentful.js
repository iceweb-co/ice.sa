import { createClient } from "contentful";

export const contentfulClient = (preview) => {
  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: preview
      ? process.env.CONTENTFUL_PREVIEW_TOKEN
      : process.env.CONTENTFUL_DELIVERY_TOKEN,
    host: preview ? "preview.contentful.com" : undefined,
  });
};
