declare module "@regardsoss/authentication" {
  export const isAuthenticated: any
  export const logout: any
  export const fetchAuthenticate: (username: String, password: String) => void
  export const authorizationMiddleware: any
  export const authentication: any
}

