import { Action } from "flux-standard-action"
import { Schema } from "normalizr"
declare module "@regardsoss/api" {

  interface FluxStandardError extends Error {
    response: any
    status: number
    statusText: string
  }

  interface FluxStandardAction extends Action<FluxStandardError> {
    error: boolean
  }

  export const PROJECT_ACCOUNT: Schema
  export const PROJECT_ACCOUNT_ARRAY: Schema
  export const ACCOUNT: Schema
  export const ACCOUNT_ARRAY: Schema
  export const PROJECT: Schema
  export const PROJECT_ARRAY: Schema
  export const PROJECT_ADMIN: Schema
  export const PROJECT_ADMIN_ARRAY: Schema
  export const defaultFluxStandardError: FluxStandardError
}

