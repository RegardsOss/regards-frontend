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
import { connect } from '@regardsoss/redux'
import { DataManagementClient } from '@regardsoss/client'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { modulesHelper } from '@regardsoss/modules-api'
import ModuleConfiguration from '../shapes/ModuleConfiguration'
import ModuleComponent from '../components/user/ModuleComponent'
import ContextManager from './user/context/ContextManager'

// default attribute model selectors
const attributeModelSelectors = DataManagementClient.AttributeModelSelectors()

/**
 * Main container to display module form.
 * @author Sébastien binda
 */
export class ModuleContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      fetchingAttributes: attributeModelSelectors.isFetching(state),
      attributeModels: attributeModelSelectors.getList(state),
    }
  }

  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration.isRequired,

    // Set by mapStateToProps
    fetchingAttributes: PropTypes.bool.isRequired,
    attributeModels: DataManagementShapes.AttributeModelList.isRequired,
  }

  render() {
    const {
      id: moduleId, project, moduleConf,
      fetchingAttributes, attributeModels,
    } = this.props
    if (fetchingAttributes) {
      // wait for attributes to be resolved before resolving and showing module
      return null
    }

    return (
      /* URL management container: blocks view while it is not initialized to avoid useless requests (no view) */
      <ContextManager
        moduleId={moduleId}
        project={project}
        configuration={moduleConf}
        attributeModels={attributeModels}
      >
        { /* View : module (report all module properties) */}
        <ModuleComponent
          {...modulesHelper.getReportedUserModuleProps(this.props)}
        />
      </ContextManager>
    )
  }
}

export default connect(ModuleContainer.mapStateToProps)(ModuleContainer)
