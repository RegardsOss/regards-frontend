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
    project: PropTypes.string.isRequired,
    appName: PropTypes.string.isRequired,
    adminForm: PropTypes.shape({
      changeField: PropTypes.func,
      form: ModuleConfiguration,
    }),
    // form map state to properties
    collectionModels: PropTypes.objectOf(Model).isRequired,
    selectableAttributes: PropTypes.objectOf(AttributeModel),
    hasError: PropTypes.bool,
    // from map dispatch to properies
    fetchCollectionModels: PropTypes.func.isRequired,
    fetchSelectableAttributes: PropTypes.func.isRequired,
  }

  componentWillMount = () => this.setState({ loading: true })


  componentDidMount = () => {
    const { fetchCollectionModels, fetchSelectableAttributes } = this.props
    return Promise.all([fetchCollectionModels(), fetchSelectableAttributes()]).then(() => this.setState({ loading: false }))
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
