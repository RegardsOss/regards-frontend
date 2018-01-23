/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import reduce from 'lodash/reduce'
import join from 'lodash/join'
import { connect } from '@regardsoss/redux'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { DataManagementShapes } from '@regardsoss/shape'
import { LoadingComponent } from '@regardsoss/display-control'
import { AttributeModelActions, AttributeModelSelectors } from '../clients/AttributeModelClient'
import ModuleConfiguration from '../models/ModuleConfiguration'
import URLManagementContainer from './user/URLManagementContainer'
import DescriptionContainer from './user/DescriptionContainer'
import ModuleComponent from '../components/user/ModuleComponent'
import FeedbackDisplayComponent from '../components/user/feedback/FeedbackDisplayComponent'
import { TableDisplayModeEnum } from '../models/navigation/TableDisplayModeEnum'
import { DISPLAY_MODE_ENUM } from '../definitions/DisplayModeEnum'

/**
 * Main container to display module form.
 * @author Sébastien binda
 */
export class ModuleContainer extends React.Component {
  static propTypes = {
    // Default props given to the form
    moduleConf: ModuleConfiguration.isRequired,

    // Set by mapDispatchToProps
    fetchAllModelsAttributes: PropTypes.func,
    attributeModels: DataManagementShapes.AttributeModelList,
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
      expanded: true,
      attributesFetching: true,
      facettesQuery: facettes && facettes.length > 0 ? `facets=${join(facettes, ',')}` : null,
    }
  }

  componentDidMount = () => Promise.resolve(this.props.fetchAllModelsAttributes()).then(() => this.setState({ attributesFetching: false }))

  onExpandChange = () => this.setState({ expanded: !this.state.expanded })

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
    const {
      attributeModels,
      moduleConf: {
        enableDownload,
        enableFacettes,
        enableQuicklooks,
        searchQuery,
        attributes,
        attributesQuicklook,
        datasetAttributes,
        documentAttributes,
        attributesRegroupements,
        breadcrumbInitialContextLabel,
        displayMode,
        displayConf,
      },
    } = this.props
    const { expanded, attributesFetching, facettesQuery } = this.state
    const initialViewObjectType = this.getInitialViewObjectType(displayMode)
    if (!attributesFetching) {
      return (
        <div>
          {/* Feedback handling for long actions in module */}
          <FeedbackDisplayComponent />
          { /* Description handling */}
          <DescriptionContainer />
          { /* URL management container: blocks view while it is not initialized to avoid useless requests (no view) */}
          <URLManagementContainer
            currentPath={browserHistory.getCurrentLocation().pathname}
            currentQuery={browserHistory.getCurrentLocation().query}
            initialViewObjectType={initialViewObjectType}
            initialTableDisplayMode={TableDisplayModeEnum.LIST}
          >
            { /* View : module */}
            <ModuleComponent
              expanded={expanded}
              onExpandChange={this.onExpandChange}
              resultsTitle={breadcrumbInitialContextLabel}
              enableFacettes={!!enableFacettes}
              enableQuicklooks={!!enableQuicklooks}
              enableDownload={!!enableDownload}
              searchQuery={searchQuery}
              facettesQuery={facettesQuery}
              attributesConf={attributes}
              attributesQuicklookConf={attributesQuicklook}
              attributesRegroupementsConf={attributesRegroupements}
              datasetAttributesConf={datasetAttributes}
              documentAttributesConf={documentAttributes}
              attributeModels={attributeModels}
              displayMode={displayMode}
              displayConf={displayConf}
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
export {
  UnconnectedModuleContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
