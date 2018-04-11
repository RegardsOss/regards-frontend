/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import reduce from 'lodash/reduce'
import join from 'lodash/join'
import { connect } from '@regardsoss/redux'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { LoadingComponent } from '@regardsoss/display-control'
import { modulesHelper } from '@regardsoss/modules-api'
import { AttributeModelActions, AttributeModelSelectors } from '../clients/AttributeModelClient'
import ModuleConfiguration from '../models/ModuleConfiguration'
import URLManagementContainer from './user/URLManagementContainer'
import DescriptionContainer from './user/DescriptionContainer'
import FeedbackDisplayContainer from './user/feedback/FeedbackDisplayContainer'
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

  constructor(props) {
    super(props)

    // Calculate needed facettes from given props.
    const { moduleConf: { attributes, displayMode, documentAttributes } } = props
    // We retrieve attrs facettables depending of the display mode
    const facettesAttrsToCheck = displayMode === DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT ? documentAttributes : attributes

    // Calculate facettes
    const facettes = reduce(facettesAttrsToCheck, (result, value, key) =>
      value.facetable ? [...result, value.attributeFullQualifiedName] : result, [])

    this.state = {
      attributesFetching: true,
      facettesQuery: facettes && facettes.length > 0 ? `facets=${join(facettes, ',')}` : null,
    }
  }

  componentDidMount = () => Promise.resolve(this.props.fetchAllModelsAttributes()).then(() => this.setState({ attributesFetching: false }))

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
    const { attributeModels, moduleConf } = this.props
    const { attributesFetching, facettesQuery } = this.state
    const initialViewObjectType = this.getInitialViewObjectType(moduleConf.displayMode)
    const initialTableDisplayMode = moduleConf.initialViewMode || TableDisplayModeEnum.LIST
    // compute if this component is externally driven: is there parent module parameters?
    const isExternallyDriven = !!(moduleConf.searchQuery || (moduleConf.initialContextTags && moduleConf.initialContextTags.length))

    if (!attributesFetching) {
      return (
        <div>
          {/* Feedback handling for long actions in module */}
          <FeedbackDisplayContainer />
          { /* Description handling */}
          <DescriptionContainer />
          { /* URL management container: blocks view while it is not initialized to avoid useless requests (no view) */}
          <URLManagementContainer
            initialViewObjectType={initialViewObjectType}
            initialTableDisplayMode={initialTableDisplayMode}
            initialContextTags={this.props.moduleConf.initialContextTags}
            isExternallyDriven={isExternallyDriven}
          >
            { /* View : module (report all module properties) */}
            <ModuleComponent
              facettesQuery={facettesQuery}
              attributeModels={attributeModels}
              {...modulesHelper.getReportedUserModuleProps(this.props)}
            />
          </URLManagementContainer>
        </div>
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
