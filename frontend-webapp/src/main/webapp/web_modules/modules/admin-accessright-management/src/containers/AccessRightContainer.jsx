/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from 'react-redux'
import { map, find } from 'lodash'
import { I18nProvider } from '@regardsoss/i18n'
import { AccessGroup, PluginConfiguration, PluginMetaData } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import AccessRightActions from '../model/AccessRightActions'
import AccessRightComponent from '../components/AccessRightComponent'
import AccessGroupSelectors from '../model/AccessGroupSelectors'
import AccessGroupActions from '../model/AccessGroupActions'
import PluginConfigurationActions from '../model/PluginConfigurationActions'
import PluginConfigurationSelectors from '../model/PluginConfigurationSelectors'
import PluginMetaDataActions from '../model/PluginMetaDataActions'
import PluginMetaDataSelectors from '../model/PluginMetaDataSelectors'

export class AccessRightContainer extends React.Component {
  static propTypes = {
    // from mapStateToProps
    accessGroupList: React.PropTypes.objectOf(AccessGroup),
    pluginConfigurationList: React.PropTypes.objectOf(PluginConfiguration),
    pluginMetaDataList: React.PropTypes.objectOf(PluginMetaData),
    // from mapDispatchToProps
    fetchAccessGroup: React.PropTypes.func,
    fetchPluginConfigurationList: React.PropTypes.func,
    fetchPluginMetaDataList: React.PropTypes.func,
    fetchAccessGroupList: React.PropTypes.func,
    updateAccessRight: React.PropTypes.func,
    createAccessRight: React.PropTypes.func,
    deleteAccessRight: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchAccessGroupList(),
      this.props.fetchPluginMetaDataList(),
      this.props.fetchPluginConfigurationList()])
      .then(() => {
        this.setState({
          loading: false,
        })
      })
  }

  onSubmit = (accessGroupName, datasetList, formValues) => {
    const { accessGroupList } = this.props
    const accessGroup = accessGroupList[accessGroupName].content
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
      accessGroup,
      accessLevel: formValues.access,
      dataSet: dataset,
    }))
    const requests = []
    newAccessRightList.forEach((newAccessRight) => {
      // First update access right that are already configured
      const accessRightAlreadyExisting = find(accessGroup.accessRights, accessRight => newAccessRight.dataSet.id === accessRight.dataSet.id)
      if (accessRightAlreadyExisting) {
        requests.push(this.props.updateAccessRight(accessRightAlreadyExisting.id, newAccessRight))
      } else {
        requests.push(this.props.createAccessRight(newAccessRight))
      }
    })
    // Run all promises together and wait the end to refresh the current access group
    return Promise.all(requests)
      .then(() => {
        this.props.fetchAccessGroup(accessGroupName)
      })
  }

  /**
   * Delete an access right linked to the accessGroupName
   * @param accessGroupName
   * @param accessRight
   */
  onDelete = (accessGroupName, accessRight) => {
    Promise.resolve(this.props.deleteAccessRight(accessRight.content.id))
      .then(() => {
        this.props.fetchAccessGroup(accessGroupName)
      })
  }

  render() {
    const { accessGroupList, pluginConfigurationList, pluginMetaDataList } = this.props
    const { loading } = this.state
    return (
      <I18nProvider messageDir="modules/admin-accessright-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={loading}
        >
          {() => (
            <AccessRightComponent
              accessGroupList={accessGroupList}
              pluginConfigurationList={pluginConfigurationList}
              pluginMetaDataList={pluginMetaDataList}
              onSubmit={this.onSubmit}
              onDelete={this.onDelete}
            />)}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  accessGroupList: AccessGroupSelectors.getList(state),
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
  fetchAccessGroupList: () => dispatch(AccessGroupActions.fetchPagedEntityList(0, 100)),
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

export default connect(mapStateToProps, mapDispatchToProps)(AccessRightContainer)
