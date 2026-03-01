// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "7148f33e-0420-4a7e-8be6-ec6066254fc5",
  token: process.env.TINA_TOKEN || "5e2cf636d44f15e2258da57c3f459df097cc478f",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
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
          { type: "image", name: "experienceImage", label: "Experience Image" },
          { type: "string", name: "experienceTitle", label: "Experience Title" },
          { type: "string", name: "experienceText", label: "Experience Text", ui: { component: "textarea" } },
          {
            type: "object",
            name: "theme",
            label: "Theme & Design",
            fields: [
              { type: "string", name: "primaryColor", label: "Primary Theme Color", ui: { component: "color" } },
              { type: "string", name: "backgroundColor", label: "Background Color", ui: { component: "color" } },
              { type: "string", name: "heroTitleSize", label: "Hero Font Size", description: "e.g. 10rem, 150px" }
            ]
          },
          {
            type: "object",
            list: true,
            name: "offerings",
            label: "Offerings",
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description" },
              { type: "image", name: "image", label: "Image" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
