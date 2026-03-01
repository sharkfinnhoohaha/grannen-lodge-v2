import { client } from "../../tina/__generated__/client";
import PageClient from "@/components/PageClient";

export default async function Page() {
  const result = await client.queries.page({ relativePath: "home.md" });

  return (
    <PageClient
      data={result.data}
      query={result.query}
      variables={result.variables}
    />
  );
}

