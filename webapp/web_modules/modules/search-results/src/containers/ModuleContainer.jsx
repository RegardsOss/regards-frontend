/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { LoadingComponent } from '@regardsoss/display-control'
import { modulesHelper } from '@regardsoss/modules-api'
import { AttributeModelActions, AttributeModelSelectors } from '../clients/AttributeModelClient'
import ModuleConfiguration from '../models/ModuleConfiguration'
import URLManagementContainer from './user/URLManagementContainer'
import ModuleComponent from '../components/user/ModuleComponent'
import { TableDisplayModeEnum } from '../models/navigation/TableDisplayModeEnum'
import { DISPLAY_MODE_ENUM } from '../definitions/DisplayModeEnum'


/**
 * Main container to display module form.
 * @author Sébastien binda
 */
export class ModuleContainer extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration.isRequired,

    // Set by mapStateToProps
    attributeModels: DataManagementShapes.AttributeModelList,
    // Set by mapDispatchToProps
    fetchAllModelsAttributes: PropTypes.func,
  }

  state = {
    attributesFetching: true,
  }

  /**
   * Lifecycle method: component did mount. Used here to fetch attribute models
   */
  componentDidMount = () => Promise.resolve(this.props.fetchAllModelsAttributes()).then(() => this.setState({ attributesFetching: false }))

  /**
   * Computes the view objects type to display
   * @param {string} displayMode display mode from configuration
   * @return {string} view objects type
   */
  getInitialViewObjectType = (displayMode) => {
    switch (displayMode) {
      case DISPLAY_MODE_ENUM.DISPLAY_DATA:
        return ENTITY_TYPES_ENUM.DATA
      case DISPLAY_MODE_ENUM.DISPLAY_DATA_DATASET:
        // when showing datasets, select dataset tab first (by default)
        return ENTITY_TYPES_ENUM.DATASET
      case DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT:
        return ENTITY_TYPES_ENUM.DOCUMENT
      default:
        throw new Error(`Unexpected display mode : ${displayMode}`)
    }
  }

  render() {
    const { moduleConf, attributeModels } = this.props
    const { attributesFetching } = this.state
    const initialViewObjectType = this.getInitialViewObjectType(moduleConf.displayMode)
    const initialTableDisplayMode = moduleConf.initialViewMode || TableDisplayModeEnum.LIST
    // compute if this component is externally driven: is there parent module parameters?
    const isExternallyDriven = !!(moduleConf.searchQuery || (moduleConf.initialContextTags && moduleConf.initialContextTags.length))
    if (!attributesFetching) {
      return (
        /* URL management container: blocks view while it is not initialized to avoid useless requests (no view) */
        <URLManagementContainer
          initialViewObjectType={initialViewObjectType}
          initialTableDisplayMode={initialTableDisplayMode}
          initialContextTags={this.props.moduleConf.initialContextTags}
          isExternallyDriven={isExternallyDriven}
        >
          { /* View : module (report all module properties) */}
          <ModuleComponent
            attributeModels={attributeModels}
            {...modulesHelper.getReportedUserModuleProps(this.props)}
          />
        </URLManagementContainer>
      )
    }
    return (
      <LoadingComponent />
    )
  }
}
const mapStateToProps = state => ({
  attributeModels: AttributeModelSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAllModelsAttributes: () => dispatch(AttributeModelActions.fetchEntityList()),
})

const UnconnectedModuleContainer = ModuleContainer
export { UnconnectedModuleContainer }

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
