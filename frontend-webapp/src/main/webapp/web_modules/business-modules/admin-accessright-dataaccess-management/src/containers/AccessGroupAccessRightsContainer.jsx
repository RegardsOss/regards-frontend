/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { map, find } from 'lodash'
import { I18nProvider } from '@regardsoss/i18n'
import { AccessGroup, PluginConfiguration, PluginMetaData } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import AccessRightActions from '../model/AccessRightActions'
import AccessRightListComponent from '../components/AccessRightListComponent'
import AccessGroupSelectors from '../model/AccessGroupSelectors'
import AccessGroupActions from '../model/AccessGroupActions'
import PluginConfigurationActions from '../model/PluginConfigurationActions'
import PluginConfigurationSelectors from '../model/PluginConfigurationSelectors'
import PluginMetaDataActions from '../model/PluginMetaDataActions'
import PluginMetaDataSelectors from '../model/PluginMetaDataSelectors'

export class AccessGroupAccessRightsContainer extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
      accessgroup: PropTypes.string.isRequired,
    }).isRequired,
    // from mapStateToProps
    accessGroup: AccessGroup,
    pluginConfigurationList: PropTypes.objectOf(PluginConfiguration),
    pluginMetaDataList: PropTypes.objectOf(PluginMetaData),
    // from mapDispatchToProps
    fetchAccessGroup: PropTypes.func,
    fetchPluginConfigurationList: PropTypes.func,
    fetchPluginMetaDataList: PropTypes.func,
    updateAccessRight: PropTypes.func,
    createAccessRight: PropTypes.func,
    deleteAccessRight: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchAccessGroup(this.props.params.accessgroup),
      this.props.fetchPluginMetaDataList(),
      this.props.fetchPluginConfigurationList()])
      .then(() => {
        this.setState({
          loading: false,
        })
      })
  }

  onSubmit = (datasetList, formValues) => {
    const { accessGroup } = this.props
    // Create new access rights
    const dataAccessRight = {
      dataAccessLevel: formValues.dataAccess,
    }
    if (formValues) {
      dataAccessRight.pluginConfiguration = formValues.pluginConfiguration
    }
    const qualityFilter = {
      maxScore: formValues.quality.max,
      minScore: formValues.quality.min,
      qualityLevel: formValues.quality.level,
    }
    const newAccessRightList = map(datasetList, dataset => ({
      qualityFilter,
      dataAccessRight,
      accessGroup: accessGroup.content,
      accessLevel: formValues.access,
      dataSet: dataset,
    }))
    const requests = []
    newAccessRightList.forEach((newAccessRight) => {
      // First update access right that are already configured
      const accessRightAlreadyExisting = find(accessGroup.content.accessRights, accessRight => newAccessRight.dataSet.id === accessRight.dataSet.id)
      if (accessRightAlreadyExisting) {
        requests.push(this.props.updateAccessRight(accessRightAlreadyExisting.id, newAccessRight))
      } else {
        requests.push(this.props.createAccessRight(newAccessRight))
      }
    })
    // Run all promises together and wait the end to refresh the current access group
    return Promise.all(requests)
      .then(() => {
        this.props.fetchAccessGroup(accessGroup.content.name)
      })
  }

  /**
   * Delete an access right linked to the accessGroupName
   * @param accessRight
   */
  onDelete = (accessRight) => {
    Promise.resolve(this.props.deleteAccessRight(accessRight.id))
      .then(() => {
        this.props.fetchAccessGroup(this.props.accessGroup.content.name)
      })
  }

  render() {
    const { accessGroup, pluginConfigurationList, pluginMetaDataList } = this.props
    const { loading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-accessright-dataaccess-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={loading}
          isContentError={!loading && !accessGroup}
        >
          <AccessRightListComponent
            accessGroup={accessGroup}
            pluginConfigurationList={pluginConfigurationList}
            pluginMetaDataList={pluginMetaDataList}
            deleteAccessRight={this.onDelete}
            submitAccessRights={this.onSubmit}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  accessGroup: AccessGroupSelectors.getById(state, ownProps.params.accessgroup),
  pluginConfigurationList: PluginConfigurationSelectors.getList(state),
  pluginMetaDataList: PluginMetaDataSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginConfigurationList: () => dispatch(PluginConfigurationActions.fetchPagedEntityList(0, 100, {
    microserviceName: 'rs-dam',
  }, /*{
    pluginId: 'ICheckDataAccess'
    // TODO fix when backend update to pluginType too
  }*/)),
  fetchAccessGroup: accessGroupName => dispatch(AccessGroupActions.fetchEntity(accessGroupName)),
  fetchPluginMetaDataList: microserviceName => dispatch(PluginMetaDataActions.fetchPagedEntityList(0, 100, {
    microserviceName: 'rs-dam',
  }, /* {
    pluginType: 'ICheckDataAccess'
  }*/)),
  updateAccessRight: (id, entity) => dispatch(AccessRightActions.updateEntity(id, entity)),
  createAccessRight: entity => dispatch(AccessRightActions.createEntity(entity)),
  deleteAccessRight: id => dispatch(AccessRightActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccessGroupAccessRightsContainer)
