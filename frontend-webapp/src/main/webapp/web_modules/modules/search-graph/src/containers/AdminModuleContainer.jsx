/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { Model } from '@regardsoss/model'
import CollectionModelSelectors from '../model/CollectionModelSelectors'
import CollectionModelActions from '../model/CollectionModelActions'
import ModuleForm from '../components/admin/ModuleForm'
import ModuleConfiguration from '../model/ModuleConfiguration'


/**
 * Module container for admin interface (module instance configuration)
 */
class AdminModuleContainer extends React.Component {

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
    // from map dispatch to properies
    fetchCollectionModels: React.PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    const { fetchCollectionModels } = this.props
    fetchCollectionModels()
  }


  render() {
    const { collectionModels, project, appName, adminForm } = this.props
    return (
      <ModuleForm
        collectionModels={collectionModels}
        project={project}
        appName={appName}
        adminForm={adminForm}
      />)
  }

}

const mapStateToProps = state => ({
  // fetched collection models to provide the available graph levels
  collectionModels: CollectionModelSelectors.getList(state) || {},
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionModels: () => dispatch(CollectionModelActions.fetchEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminModuleContainer)
