/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { AttributeModel, SearchResultsTargetsEnum } from '@regardsoss/model'
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
    // eslint-disable-next-line react/no-unused-prop-types
    appName: React.PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
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
    const { attributeModels, moduleConf: { searchQuery, attributes, attributesRegroupements, resultType } } = this.props
    const { attributesFetching } = this.state
    return (
      <LoadableContentDisplayDecorator
        isLoading={attributesFetching}
      >
        <SearchResultsComponent
          searchQuery={searchQuery}
          attributesConf={attributes}
          attributesRegroupementsConf={attributesRegroupements}
          attributeModels={attributeModels}
          target={resultType || SearchResultsTargetsEnum.DATAOBJECT_RESULTS}
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
