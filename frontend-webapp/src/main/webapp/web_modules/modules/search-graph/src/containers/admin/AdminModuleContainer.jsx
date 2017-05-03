/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { Model, AttributeModel } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import CollectionModelSelectors from '../../model/CollectionModelSelectors'
import CollectionModelActions from '../../model/CollectionModelActions'
import { AttributeModelActions, AttributeModelSelectors } from '../../model/client/AttributeModelClient'
import ModuleForm from '../../components/admin/ModuleForm'
import ModuleConfiguration from '../../model/ModuleConfiguration'


/**
 * Module container for admin interface (module instance configuration)
 */
export class AdminModuleContainer extends React.Component {

  static propTypes = {
    // from module loader
    project: React.PropTypes.string.isRequired,
    appName: React.PropTypes.string.isRequired,
    adminForm: React.PropTypes.shape({
      changeField: React.PropTypes.func,
      form: ModuleConfiguration,
    }),
    // form map state to properties
    collectionModels: React.PropTypes.objectOf(Model).isRequired,
    selectableAttributes: React.PropTypes.objectOf(AttributeModel),
    hasError: React.PropTypes.bool,
    // from map dispatch to properies
    fetchCollectionModels: React.PropTypes.func.isRequired,
    fetchSelectableAttributes: React.PropTypes.func.isRequired,
  }

  componentWillMount = () => this.setState({ loading: true })


  componentDidMount = () => {
    const { fetchCollectionModels, fetchSelectableAttributes } = this.props
    Promise.all([fetchCollectionModels(), fetchSelectableAttributes()]).then(() => this.setState({ loading: false }))
  }


  render() {
    const { collectionModels, project, appName, adminForm, selectableAttributes, hasError } = this.props
    const { loading } = this.state
    return (
      <LoadableContentDisplayDecorator
        isLoading={loading}
        isContentError={hasError}
        isEmpty={false}
      >
        <ModuleForm
          collectionModels={collectionModels}
          selectableAttributes={selectableAttributes}
          project={project}
          appName={appName}
          adminForm={adminForm}
        />
      </LoadableContentDisplayDecorator>
    )
  }

}

const mapStateToProps = state => ({
  // fetched collection models to provide the available graph levels
  collectionModels: CollectionModelSelectors.getList(state) || {},
  selectableAttributes: AttributeModelSelectors.getList(state),
  hasError: AttributeModelSelectors.hasError(state) || AttributeModelSelectors.hasError(state),
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionModels: () => dispatch(CollectionModelActions.fetchEntityList()),
  fetchSelectableAttributes: () => dispatch(AttributeModelActions.fetchEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminModuleContainer)
