import { FluxStandardError } from "@regardsoss/api"

export const defaultFluxStandardError: FluxStandardError = {
  message: '500 - Internal Server Error',
  name: 'ApiError',
  response: undefined,
  status: 500,
  statusText: 'Internal Server Error'
}
