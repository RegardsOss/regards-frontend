/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { DataManagementShapes } from '@regardsoss/shape'
import ModuleConfiguration from '../../../shapes/ModuleConfiguration'
/**
 * Component to display search results parameters
 * @author Sébastien binda
 */
class SearchResultsComponent extends React.Component {
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
    selectableDataObjectsAttributes: DataManagementShapes.AttributeModelList,
    selectableDataSetsAttributes: DataManagementShapes.AttributeModelList,
  }

  render() {
    const moduleConf = {
      ...get(this.props.adminForm.form, `${this.props.adminForm.currentNamespace}.searchResult`),
    }

    const module = {
      type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
      active: true,
      applicationId: this.props.appName,
      conf: moduleConf,
    }
    // Override the adminForm used by the search result
    // to save the submodule conf in a subset of the current conf (by re-setting namespace)
    const adminForm = {
      ...this.props.adminForm,
      currentNamespace: `${this.props.adminForm.currentNamespace}.searchResult`,
      conf: {
        // limit the number of attributes visible
        selectableDataObjectsAttributes: this.props.selectableDataObjectsAttributes,
        selectableDataSetsAttributes: this.props.selectableDataSetsAttributes,
      },
    }
    return (
      <LazyModuleComponent
        project={this.props.project}
        appName={this.props.appName}
        module={module}
        admin
        adminForm={adminForm}
      />
    )
  }
}

export default SearchResultsComponent
