/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import filter from 'lodash/filter'
import map from 'lodash/map'
import find from 'lodash/find'
import { I18nProvider } from '@regardsoss/i18n'
import { AccessGroup, AccessRight, PluginConfiguration, PluginMetaData } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import AccessRightListComponent from '../components/AccessRightListComponent'
import { accessRightActions, accessRightSelectors } from '../clients/AccessRightClient'
import { accessGroupActions, accessGroupSelectors } from '../clients/AccessGroupClient'
import { pluginConfigurationActions, pluginConfigurationSelectors } from '../clients/PluginConfigurationClient'
import { pluginMetadataActions, pluginMetadataSelectors } from '../clients/PluginMetadataClient'

export class AccessGroupAccessRightsContainer extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
      accessgroup: PropTypes.string.isRequired,
    }).isRequired,
    // from mapStateToProps
    accessGroup: AccessGroup,
    accessRights: PropTypes.objectOf(AccessRight),
    pluginConfigurationList: PropTypes.objectOf(PluginConfiguration),
    pluginMetaDataList: PropTypes.objectOf(PluginMetaData),
    // from mapDispatchToProps
    fetchAccessGroup: PropTypes.func,
    fetchPluginConfigurationList: PropTypes.func,
    fetchPluginMetaDataList: PropTypes.func,
    fetchAccessRights: PropTypes.func,
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
      this.props.fetchAccessRights(this.props.params.accessgroup),
      this.props.fetchPluginMetaDataList(),
      this.props.fetchPluginConfigurationList()])
      .then(() => {
        this.setState({
          loading: false,
          submitStatus: undefined,
        })
      })
  }

  onSubmit = (datasetList, formValues) => {
    console.log('SUBMITTING', datasetList, formValues)
    const { accessGroup, accessRights } = this.props
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
      dataset: dataset.content,
    }))
    const requests = []
    newAccessRightList.forEach((newAccessRight) => {
      // First update access right that are already configured
      const accessRightAlreadyExisting = find(accessRights, accessRight => newAccessRight.dataset.id === accessRight.content.dataset.id)
      if (accessRightAlreadyExisting) {
        newAccessRight.id = accessRightAlreadyExisting.content.id
        requests.push(this.props.updateAccessRight(accessRightAlreadyExisting.content.id, newAccessRight))
      } else {
        requests.push(this.props.createAccessRight(newAccessRight))
      }
    })
    // Run all promises together and wait the end to refresh the current access group
    return Promise.all(requests)
      .then((actionsResults) => {
        const errors = filter(actionsResults, ar => ar.error)
        this.props.fetchAccessGroup(accessGroup.content.name)
        return {
          error: errors && errors.length > 0,
        }
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
    const { accessGroup, accessRights, pluginConfigurationList, pluginMetaDataList } = this.props
    const { loading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-accessright-dataaccess-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={loading}
          isContentError={!loading && !accessGroup}
        >
          {() => (
            <AccessRightListComponent
              accessGroup={accessGroup}
              accessRights={accessRights}
              pluginConfigurationList={pluginConfigurationList}
              pluginMetaDataList={pluginMetaDataList}
              deleteAccessRight={this.onDelete}
              submitAccessRights={this.onSubmit}
            />
          )}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  accessGroup: accessGroupSelectors.getById(state, ownProps.params.accessgroup),
  accessRights: accessRightSelectors.getList(state),
  pluginConfigurationList: pluginConfigurationSelectors.getList(state),
  pluginMetaDataList: pluginMetadataSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginConfigurationList: () => dispatch(pluginConfigurationActions.fetchEntityList({
    microserviceName: 'rs-dam',
  }, /*{
   pluginId: 'ICheckDataAccess'
   // TODO fix when backend update to pluginType too
   }*/)),
  fetchAccessGroup: accessGroupName => dispatch(accessGroupActions.fetchEntity(accessGroupName)),
  fetchPluginMetaDataList: microserviceName => dispatch(pluginMetadataActions.fetchEntityList({
    microserviceName: 'rs-dam',
  }, /* {
   pluginType: 'ICheckDataAccess'
   }*/)),
  fetchAccessRights: accessgroupName => dispatch(accessRightActions.fetchPagedEntityList(0, 10000, {}, { accessgroup: accessgroupName })),
  updateAccessRight: (id, entity) => dispatch(accessRightActions.updateEntity(id, entity)),
  createAccessRight: entity => dispatch(accessRightActions.createEntity(entity)),
  deleteAccessRight: id => dispatch(accessRightActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccessGroupAccessRightsContainer)
