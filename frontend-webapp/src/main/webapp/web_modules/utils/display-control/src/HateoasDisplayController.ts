/**
 * An Access Controller is a pure function which implements a logic for
 * displaying or not the passed React component.
 *
 * For HATEOAS, the component's "endpoints" prop must have an entry
 * of key "endpointKey" in order to be displayed
 *
 * For example:
 * endpointKey = "projects_url"
 * endpoints = {
 *  "projects_url": "http://myAwesomeUrl",
 *  "projects_users_url": "http://myOtherAwesomeUrl"
 * }
 *
 * @type {IDisplayController}
 * @param {JSX.Element} component The component on which extract endpoints
 * @return {boolean}
 */
export const HateoasDisplayController = (component: JSX.Element): boolean => {
  return typeof component.props.endpoints[component.props.endpointKey] !== 'undefined'
}
