/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import filter from 'lodash/filter'
import map from 'lodash/map'
import find from 'lodash/find'
import { I18nProvider } from '@regardsoss/i18n'
import { AccessGroup, PluginConfiguration, PluginMetaData } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import AccessRightListComponent from '../components/AccessRightListComponent'
import { accessRightActions } from '../clients/AccessRightClient'
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
      // Used to propagate to children a submit error
      submitStatus: undefined,
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
          submitStatus: undefined,
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
      dataset: dataset.content,
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
      .then((actionsResults) => {
        const errors = filter(actionsResults, ar => ar.error)
        this.setState({
          submitStatus: errors && errors.length > 0,
        })
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
          {() => (
            <AccessRightListComponent
              accessGroup={accessGroup}
              pluginConfigurationList={pluginConfigurationList}
              pluginMetaDataList={pluginMetaDataList}
              deleteAccessRight={this.onDelete}
              submitAccessRights={this.onSubmit}
              submitStatus={this.state.submitStatus}
            />
          )}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  accessGroup: accessGroupSelectors.getById(state, ownProps.params.accessgroup),
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
  updateAccessRight: (id, entity) => dispatch(accessRightActions.updateEntity(id, entity)),
  createAccessRight: entity => dispatch(accessRightActions.createEntity(entity)),
  deleteAccessRight: id => dispatch(accessRightActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccessGroupAccessRightsContainer)
