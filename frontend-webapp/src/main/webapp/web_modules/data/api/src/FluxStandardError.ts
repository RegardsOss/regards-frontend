export interface FluxStandardError extends Error {
  response: any
  status: number
  statusText: string
}

