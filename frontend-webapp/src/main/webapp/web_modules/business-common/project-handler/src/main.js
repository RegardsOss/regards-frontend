/**
 * LICENSE_PLACEHOLDER
 **/
import ProjectHandler from './containers/ProjectHandler'
import { projectReducers } from './clients/ProjectClient'

/**
 * Module to handle current project of the interface. Fetch the project and put the information in the store.
 * To use this module just add <ProjectHandler projectName={} /> into your application DOM.
 *
 */
export default {
  ProjectHandler,
  projectReducers,
}
