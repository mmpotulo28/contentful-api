// lib/contentful.ts
import { createClient } from "contentful-management";
import { createClient as createDeliveryClient } from "contentful";

export const client = createDeliveryClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "", // Ensure this is set
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || "", // Ensure this is used
});

export const managementClient = createClient({
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_TOKEN || "", // Ensure this is set
});
