/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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


  render() {
    const { project, appName, adminForm } = this.props
    const module = {
      type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
      active: true,
      applicationId: this.props.appName,
    }
    const adminFormForSearchResult = {
      ...adminForm,
      currentNamespace: `${adminForm.currentNamespace}.searchResult`,
      conf: {
        forbidRestrictions: true,
      },
    }

    return (
      <LazyModuleComponent
        project={project}
        appName={appName}
        module={module}
        admin
        adminForm={adminFormForSearchResult}
      />
    )
  }
}
export default SearchResultFormComponent
