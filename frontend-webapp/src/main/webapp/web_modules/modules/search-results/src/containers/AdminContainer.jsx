/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { AttributeModel } from '@regardsoss/model'
import SearchResultsConfigurationComponent from '../components/admin/SearchResultsConfigurationComponent'
import { AttributeModelAction, AttributeModelSelector } from '../models/client/AttributeModelClient'
import ModuleConfiguration from '../models/ModuleConfiguration'


/**
 * Main container to display administration view of the module form.
 * @author Sébastien binda
 */
class AdminContainer extends React.Component {


  static propTypes = {
    // Props supplied by LazyModuleComponent
    // eslint-disable-next-line react/no-unused-prop-types
    appName: React.PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    project: React.PropTypes.string,
    adminForm: React.PropTypes.shape({
      changeField: React.PropTypes.func,
      form: ModuleConfiguration,
    }).isRequired,
    // Default props given to the form
    moduleConf: ModuleConfiguration.isRequired,

    // Set by mapStateToProps and mapDispatchToProps
    attributeModels: React.PropTypes.objectOf(AttributeModel),
    fetchAllModelsAttributes: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      attributesFetching: !this.props.moduleConf.selectableAttributes,
    }
  }

  componentWillMount() {
    if (this.state.attributesFetching) {
      Promise.resolve(this.props.fetchAllModelsAttributes()).then(() => {
        this.setState({
          attributesFetching: false,
        })
      })
    }
  }

  render() {
    const { moduleConf: {
      resultType,
      attributes,
      attributesRegroupements,
      selectableAttributes,
      enableFacettes },
    } = this.props


    if (this.props.adminForm.form && !this.state.attributesFetching) {
      return (
        <SearchResultsConfigurationComponent
          selectableAttributes={selectableAttributes || this.props.attributeModels}
          attributesConf={this.props.adminForm.form.conf.attributes}
          attributesRegroupementsConf={this.props.adminForm.form.conf.attributesRegroupements}
          changeField={this.props.adminForm.changeField}
          defaultAttributesConf={attributes}
          defaultAttributesRegroupementsConf={attributesRegroupements}
          defaultEnableFacettes={enableFacettes}
          defaultResultType={resultType}
        />
      )
    }
    return null
  }
}

const mapStateToProps = (state, ownProps) => ({
  attributeModels: AttributeModelSelector.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAllModelsAttributes: () => dispatch(AttributeModelAction.fetchPagedEntityList(0, 100)),
})

const UnconnectedAdminContainer = AdminContainer
export {
  UnconnectedAdminContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)

