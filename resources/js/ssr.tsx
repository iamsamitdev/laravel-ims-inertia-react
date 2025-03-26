import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

// ziggy.d.ts
// เปลี่ยนเป็น module augmentation
export {};

declare global {
  interface Window {
    route(name: string, params?: any, absolute?: boolean): string;
  }
}

const appName = import.meta.env.VITE_APP_NAME || 'IMS-Thai'

// กำหนด type ให้ตรงกับที่ Ziggy ต้องการ
type ZiggyRoute = {
  (): any;
  (name: string, params?: Record<string, any> | string | number, absolute?: boolean): string;
};

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
        setup: ({ App, props }) => {
            // Create a simple implementation for SSR
            globalThis.route = ((name: string, params?: any, absolute?: boolean): string => {
                return name;
            }) as ZiggyRoute;
            
            return <App {...props} />
        },
    })
) 