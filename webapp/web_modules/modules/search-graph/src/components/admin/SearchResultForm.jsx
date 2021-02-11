/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import isEqual from 'lodash/isEqual'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import ModuleConfiguration from '../../shapes/ModuleConfiguration'

/**
* Search result configuration form, using search result module
*/
class SearchResultFormComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string,
    appName: PropTypes.string.isRequired,
    adminForm: PropTypes.shape({
      currentNamespace: PropTypes.string,
      isCreating: PropTypes.bool,
      isDuplicating: PropTypes.bool,
      isEditing: PropTypes.bool,
      changeField: PropTypes.func,
      form: ModuleConfiguration,
    }),
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { appName, adminForm } = newProps
    const nextState = { ...(this.state || {}) }
    if (!isEqual(oldProps.appName, appName)) {
      nextState.module = {
        type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
        active: true,
        applicationId: appName,
      }
    }
    if (!isEqual(oldProps.adminForm, adminForm)) {
      nextState.searchResultsAdminForm = {
        ...adminForm,
        currentNamespace: `${adminForm.currentNamespace}.searchResult`,
        conf: {
          forbidRestrictions: true,
        },
      }
    }
    if (!isEqual(this.state, nextState)) {
      this.setState(nextState)
    }
  }

  render() {
    const { project, appName } = this.props
    const { module, searchResultsAdminForm } = this.state

    return (
      <LazyModuleComponent
        project={project}
        appName={appName}
        module={module}
        admin
        adminForm={searchResultsAdminForm}
      />
    )
  }
}
export default SearchResultFormComponent
