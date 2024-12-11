// lib/contentful.ts
import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

// client.createEntry = async (contentType: string, fields: any) => {
//   return client.getSpace().then((space) => {
//     return space.createEntry(contentType, { fields });
//   });
// };

export default client;
