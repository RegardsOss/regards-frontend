declare module "@regardsoss/display-control" {
  export type IDisplayController = (component: JSX.Element) => boolean

  export const applyDisplayControl: (controller: IDisplayController, mapStateToProps: any, mapDispatchToProps: any) => any
  export const HateoasDisplayController: (component: JSX.Element) => IDisplayController
  export const applyHateoasDisplayControl: (DecoratedComponent: React.ComponentClass<any>) => any
  export const endpointReducer: any
  export const EndpointActions: any
}

