import type { CodegenConfig } from "@graphql-codegen/cli";
import { urlResolver } from "./src/lib/UrlResolver";

const config: CodegenConfig = {
  overwrite: true,
  schema: urlResolver.graphql(),
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
