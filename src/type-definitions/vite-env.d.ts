/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_CLIENT_SECRET: string;
  // ... more environment variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
