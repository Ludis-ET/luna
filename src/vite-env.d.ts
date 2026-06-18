/// <reference types="vite/client" />

interface Window {
  grecaptcha?: {
    getResponse: (widgetId?: number) => string
    reset: (widgetId?: number) => void
  }
}
