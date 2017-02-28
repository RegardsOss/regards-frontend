/**
 * LICENSE_PLACEHOLDER
 */
import { BasicPageableSelectors } from '@regardsoss/store-utils'
import { reducerPath as projectUsersReducerPath } from './ProjectUserReducers'

export class ProjectUserSelectors extends BasicPageableSelectors {
  constructor(reducerPath = projectUsersReducerPath) {
    super(['admin', 'user-management', 'project-user-management', reducerPath])
  }
}

export default new ProjectUserSelectors()
