/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly BUILD_DATE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
