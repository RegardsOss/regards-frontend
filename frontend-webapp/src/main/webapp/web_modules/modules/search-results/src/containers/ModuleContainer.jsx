/**
 * LICENSE_PLACEHOLDER
 **/
import reduce from 'lodash/reduce'
import join from 'lodash/join'
import { connect } from '@regardsoss/redux'
import { AttributeModel, SearchResultsTargetsEnum } from '@regardsoss/model'
import { LoadingComponent } from '@regardsoss/display-control'
import { AttributeModelActions, AttributeModelSelectors } from '../models/client/AttributeModelClient'
import ModuleConfiguration from '../models/ModuleConfiguration'
import SearchResultsComponent from '../components/user/SearchResultsComponent'
/**
 * Main container to display module form.
 * @author Sébastien binda
 */
class ModuleContainer extends React.Component {

  static propTypes = {
    // Props supplied by LazyModuleComponent
    appName: React.PropTypes.string,
    project: React.PropTypes.string,
    // Default props given to the form
    moduleConf: ModuleConfiguration.isRequired,

    // Set by mapDispatchToProps
    fetchAllModelsAttributes: React.PropTypes.func,
    attributeModels: React.PropTypes.objectOf(AttributeModel),
  }

  constructor(props) {
    super(props)

    // Calculate needed facettes from given props.
    const { moduleConf: { attributes } } = props
    // Calculate facettes
    const facettes = reduce(attributes, (result, value, key) => {
      if (value.facetable) {
        result.push(value.attributeFullQualifiedName)
      }
      return result
    }, [])
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
    const { attributeModels, moduleConf: {
      enableFacettes,
      searchQuery,
      attributes,
      attributesRegroupements,
      resultType,
      singleDatasetIpId,
      breadcrumbInitialContextLabel,
    } } = this.props
    const { attributesFetching } = this.state

    // TODO inject control for single dataset ipId (for who relaunches the research)
    if (!attributesFetching) {
      return (
        <SearchResultsComponent
          appName={appName}
          project={project}
          enableFacettes={enableFacettes}
          searchQuery={searchQuery}
          facettesQuery={this.state.facettesQuery}
          attributesConf={attributes}
          attributesRegroupementsConf={attributesRegroupements}
          attributeModels={attributeModels}
          target={resultType || SearchResultsTargetsEnum.DATAOBJECT_RESULTS}
          singleDatasetIpId={singleDatasetIpId}
          breadcrumbInitialContextLabel={breadcrumbInitialContextLabel}
        />
      )
    }
    return (
      <LoadingComponent />
    )
  }
}
const
  mapStateToProps = state => ({
    attributeModels: AttributeModelSelectors.getList(state),
  })

const
  mapDispatchToProps = dispatch => ({
    fetchAllModelsAttributes: () => dispatch(AttributeModelActions.fetchEntityList()),
  })

const UnconnectedModuleContainer = ModuleContainer
export {
  UnconnectedModuleContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
