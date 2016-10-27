import connectDependencies from "./AccessRightsDecorator"
import accessRightsReducers from "./AccessRightsReducers"

export interface DependencyAccessRight {
    id?: string
    verb: string
    endpoint: string
    access?: boolean
}

export { connectDependencies, accessRightsReducers }
