/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string
  readonly VITE_API_URL?: string
  // Add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.avif"
declare module "*.bmp"
declare module "*.gif"
declare module "*.ico"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.jfif"
declare module "*.pjpeg"
declare module "*.pjp"
declare module "*.png"
declare module "*.webp"

declare module "*.svg"

declare module "*.module.css"
declare module "*.module.scss"
declare module "*.module.sass"
