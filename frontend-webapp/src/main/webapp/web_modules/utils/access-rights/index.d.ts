declare module "@regardsoss/access-rights" {
  export interface DependencyAccessRight {
    id?: string
    verb: string
    endpoint: string
    access?: boolean
  }
  export const connectDependencies: any
  export const accessRightsReducers: any
}

