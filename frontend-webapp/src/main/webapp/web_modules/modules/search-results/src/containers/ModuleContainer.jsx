/**
 * LICENSE_PLACEHOLDER
 **/
import reduce from 'lodash/reduce'
import join from 'lodash/join'
import { connect } from '@regardsoss/redux'
import { AttributeModel, SearchResultsTargetsEnum } from '@regardsoss/model'
import { LoadingComponent } from '@regardsoss/display-control'
import { AttributeModelAction, AttributeModelSelector } from '../models/client/AttributeModelClient'
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
    getAttributeModel: React.PropTypes.func,
    fetchAllModelsAttributes: React.PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    attributeModels: React.PropTypes.objectOf(AttributeModel),
  }

  constructor(props) {
    super(props)
    this.state = {
      attributesFetching: true,
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
      hideDatasets = false,
      breadcrumbInitialContextLabel,
    } } = this.props
    const { attributesFetching } = this.state

    if (!attributesFetching) {
      // Get applicable facettes to add to search request
      const facettes = reduce(attributes, (result, value, key) => {
        if (value.facetable) {
          const attribute = this.props.getAttributeModel(value.id)
          if (attribute && attribute.content && attribute.content.fragment) {
            result.push(`${attribute.content.fragment.name}.${attribute.content.name}`)
          }
        }
        return result
      }, [])
      const facettesQuery = facettes && facettes.length > 0 ? `facets=${join(facettes, ',')}` : null

      return (
        <SearchResultsComponent
          appName={appName}
          project={project}
          enableFacettes={enableFacettes}
          searchQuery={searchQuery}
          facettesQuery={facettesQuery}
          attributesConf={attributes}
          attributesRegroupementsConf={attributesRegroupements}
          attributeModels={attributeModels}
          target={resultType || SearchResultsTargetsEnum.DATAOBJECT_RESULTS}
          hideDatasets={hideDatasets}
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
    getAttributeModel: id => AttributeModelSelector.getById(state, id),
    attributeModels: AttributeModelSelector.getList(state),
  })

const
  mapDispatchToProps = dispatch => ({
    fetchAllModelsAttributes: () => dispatch(AttributeModelAction.fetchPagedEntityList(0, 100)),
  })

const
  UnconnectedModuleContainer = ModuleContainer
export {
  UnconnectedModuleContainer
  ,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
