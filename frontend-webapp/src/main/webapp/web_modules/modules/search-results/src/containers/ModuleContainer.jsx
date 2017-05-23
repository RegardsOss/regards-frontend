/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import reduce from 'lodash/reduce'
import join from 'lodash/join'
import { connect } from '@regardsoss/redux'
import { AttributeModel, SearchResultsTargetsEnum } from '@regardsoss/model'
import { LoadingComponent } from '@regardsoss/display-control'
import { AttributeModelActions, AttributeModelSelectors } from '../client/AttributeModelClient'
import ModuleConfiguration from '../models/ModuleConfiguration'
import URLManagementContainer from './user/URLManagementContainer'
import DatasetServicesContainer from './user/DatasetServicesContainer'
import ModuleComponent from '../components/user/ModuleComponent'


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
      value.facetable ? [...result, value.attributeFullQualifiedName] : result)
    this.state = {
      attributesFetching: true,
      facettesQuery: facettes && facettes.length > 0 ? `facets=${join(facettes, ',')}` : null,
    }
  }

  componentWillMount() {
    Promise.resolve(this.props.fetchAllModelsAttributes()).then(() => {
      this.setState({
        attributesFetching: false,
      })
    })
  }

  render() {
    const { appName, project } = this.props
    const {
      attributeModels,
      moduleConf: {
        enableFacettes,
        searchQuery,
        attributes,
        attributesRegroupements,
        resultType,
        singleDatasetIpId,
        breadcrumbInitialContextLabel,
    } } = this.props
    const { attributesFetching, facettesQuery } = this.state

    if (!attributesFetching) {
      return (
        <div>
          { /* URL management container (no view) */}
          <URLManagementContainer
            currentPath={browserHistory.getCurrentLocation().pathname}
            currentQuery={browserHistory.getCurrentLocation().query}
            initialContextLabel={breadcrumbInitialContextLabel}
            initialViewObjectType={resultType || SearchResultsTargetsEnum.DATAOBJECT_RESULTS}
          />
          { /* Current dataset services management (no view) */}
          <DatasetServicesContainer initialDatasetIpId={singleDatasetIpId} />
          { /* View : module */}
          <ModuleComponent
            appName={appName}
            project={project}
            enableFacettes={enableFacettes}
            searchQuery={searchQuery}
            facettesQuery={facettesQuery}
            initialDatasetIpId={singleDatasetIpId}
            attributesConf={attributes}
            attributesRegroupementsConf={attributesRegroupements}
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
