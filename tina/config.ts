import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "7148f33e-0420-4a7e-8be6-ec6066254fc5",
  token: process.env.TINA_TOKEN || "5e2cf636d44f15e2258da57c3f459df097cc478f",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "json",
        fields: [
          { type: "string", name: "heroTagline", label: "Hero Tagline" },
          { type: "string", name: "heroTitle", label: "Hero Title" },
          { type: "image", name: "heroImage", label: "Hero Image" },
          { type: "string", name: "experienceTitle", label: "Experience Title" },
          { type: "string", name: "experienceText", label: "Experience Text", ui: { component: "textarea" } },
          {
            type: "object",
            name: "offerings",
            label: "Offerings",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Image" },
            ],
          },
        ],
      },
    ],
  },
});