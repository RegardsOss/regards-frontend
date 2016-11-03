/**
 * A Display Controller is a pure function which implements the logic for
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
const HateoasDisplayController = (component) => {
  return typeof component.props.endpoints[component.props.endpointKey] !== 'undefined'
}

export default HateoasDisplayController
