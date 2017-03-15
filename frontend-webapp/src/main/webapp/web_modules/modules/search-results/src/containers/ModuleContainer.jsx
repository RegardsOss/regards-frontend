/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { AttributeModel } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import AttributeModelActions from '../models/attributes/AttributeModelActions'
import AttributeModelSelector from '../models/attributes/AttributeModelSelector'
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
    const { attributeModels, moduleConf: { enableFacettes, searchQuery, attributes, attributesRegroupements, resultType } } = this.props
    const { attributesFetching } = this.state
    return (
      <LoadableContentDisplayDecorator
        isLoading={attributesFetching}
      >
        <SearchResultsComponent
          appName={appName}
          project={project}
          enableFacettes={enableFacettes}
          searchQuery={searchQuery}
          attributesConf={attributes}
          attributesRegroupementsConf={attributesRegroupements}
          attributeModels={attributeModels}
          target={resultType}
        />
      </LoadableContentDisplayDecorator>
    )
  }

}

const mapStateToProps = state => ({
  attributeModels: AttributeModelSelector.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAllModelsAttributes: () => dispatch(AttributeModelActions.fetchPagedEntityList(0, 100)),
})

const UnconnectedModuleContainer = ModuleContainer
export {
  UnconnectedModuleContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
