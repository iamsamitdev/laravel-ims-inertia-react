export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User
  }
}

// declare global {
//   function route(name: string, params?: Record<string, any>, absolute?: boolean): string
//   var route: (name: string, params?: Record<string, any>, absolute?: boolean) => string
// } 