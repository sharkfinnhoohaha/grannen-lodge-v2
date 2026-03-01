import { defineConfig } from "tinacms";

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: null, 
  token: null, 
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
        format: "md",
        fields: [
          { type: "string", name: "heroTagline", label: "Hero Tagline" },
          { type: "string", name: "heroTitle", label: "Hero Title" },
          { type: "image", name: "heroImage", label: "Hero Image" },
          { type: "string", name: "experienceTitle", label: "Experience Title" },
          { type: "string", name: "experienceText", label: "Experience Text", ui: { component: "textarea" } },
          {
            type: "object",
            list: true,
            name: "offerings",
            label: "Offerings",
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description" },
              { type: "image", name: "image", label: "Image" },
            ],
          },
        ],
      },
    ],
  },
});
