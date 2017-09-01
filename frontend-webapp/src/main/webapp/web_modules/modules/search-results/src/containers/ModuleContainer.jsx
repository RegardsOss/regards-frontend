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
import { AttributeModel, SearchResultsTargetsEnum } from '@regardsoss/model'
import { LoadingComponent } from '@regardsoss/display-control'
import { AttributeModelActions, AttributeModelSelectors } from '../clients/AttributeModelClient'
import ModuleConfiguration from '../models/ModuleConfiguration'
import URLManagementContainer from './user/URLManagementContainer'
import DescriptionContainer from './user/DescriptionContainer'
import ModuleComponent from '../components/user/ModuleComponent'
import DisplayModeEnum from '../models/navigation/DisplayModeEnum'

/**
 * Main container to display module form.
 * @author Sébastien binda
 */
export class ModuleContainer extends React.Component {

  static propTypes = {
    // Props supplied by LazyModuleComponent
    appName: PropTypes.string,
    project: PropTypes.string,
    // Default props given to the form
    moduleConf: ModuleConfiguration.isRequired,

    // Set by mapDispatchToProps
    fetchAllModelsAttributes: PropTypes.func,
    attributeModels: PropTypes.objectOf(AttributeModel),
  }

  constructor(props) {
    super(props)

    // Calculate needed facettes from given props.
    const { moduleConf: { attributes } } = props
    // Calculate facettes
    const facettes = reduce(attributes, (result, value, key) =>
      value.facetable ? [...result, value.attributeFullQualifiedName] : result, [])
    this.state = {
      attributesFetching: true,
      facettesQuery: facettes && facettes.length > 0 ? `facets=${join(facettes, ',')}` : null,
    }
  }

  componentWillMount() {
    return Promise.resolve(this.props.fetchAllModelsAttributes()).then(() => this.setState({ attributesFetching: false }))
  }

  render() {
    const { appName, project } = this.props
    const {
      attributeModels,
      moduleConf: {
        enableFacettes,
        searchQuery,
        attributes,
        datasetAttributes,
        attributesRegroupements,
        displayDatasets,
        breadcrumbInitialContextLabel,
    } } = this.props
    const { attributesFetching, facettesQuery } = this.state
    // when showing datasets, select dataset tab first (by default)
    const initialViewObjectType = displayDatasets ? SearchResultsTargetsEnum.DATASET_RESULTS : SearchResultsTargetsEnum.DATAOBJECT_RESULTS

    if (!attributesFetching) {
      return (
        <div>
          { /* URL management container (no view) */}
          <URLManagementContainer
            currentPath={browserHistory.getCurrentLocation().pathname}
            currentQuery={browserHistory.getCurrentLocation().query}
            initialViewObjectType={initialViewObjectType}
            initialDisplayMode={DisplayModeEnum.LIST}
            displayDatasets={!!displayDatasets}
          />
          { /* Description handling */}
          <DescriptionContainer />
          { /* View : module */}
          <ModuleComponent
            appName={appName}
            project={project}
            resultsTitle={breadcrumbInitialContextLabel}
            enableFacettes={!!enableFacettes}
            searchQuery={searchQuery}
            facettesQuery={facettesQuery}
            attributesConf={attributes}
            displayDatasets={!!displayDatasets}
            attributesRegroupementsConf={attributesRegroupements}
            datasetAttributesConf={datasetAttributes}
            attributeModels={attributeModels}
          />
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
