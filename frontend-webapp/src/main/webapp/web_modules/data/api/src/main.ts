import {FluxStandardError} from "./FluxStandardError"
import Schemas from "./schemas/index"
import {Action} from "flux-standard-action"


export interface FluxStandardAction extends Action<FluxStandardError> {
    error: boolean
}

export const defaultFluxStandardError: FluxStandardError = {
    message: '500 - Internal Server Error',
    name: 'ApiError',
    response: undefined,
    status: 500,
    statusText: 'Internal Server Error'
}

export default {
    PROJECT_ACCOUNT: Schemas.PROJECT_ACCOUNT,
    PROJECT_ACCOUNT_ARRAY: Schemas.PROJECT_ACCOUNT_ARRAY,
    ACCOUNT: Schemas.ACCOUNT,
    ACCOUNT_ARRAY: Schemas.ACCOUNT_ARRAY,

    PROJECT: Schemas.PROJECT,
    PROJECT_ARRAY: Schemas.PROJECT_ARRAY,

    // TODO remove
    PROJECT_ADMIN: Schemas.PROJECT_ADMIN,
    PROJECT_ADMIN_ARRAY: Schemas.PROJECT_ADMIN_ARRAY,
}
