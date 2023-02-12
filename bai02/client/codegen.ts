
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "src/graphql-client/**/*.graphql",
  generates: {
    "src/generated/graphql.tsx": {
      //preset: "client",
      plugins: ["typescript", "typescript-operations"]
    }
  }
};

export default config;
