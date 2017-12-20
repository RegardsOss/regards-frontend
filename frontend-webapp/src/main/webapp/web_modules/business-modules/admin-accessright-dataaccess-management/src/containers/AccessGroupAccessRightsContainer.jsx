/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { connect } from '@regardsoss/redux'
import filter from 'lodash/filter'
import map from 'lodash/map'
import find from 'lodash/find'
import { I18nProvider } from '@regardsoss/i18n'
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import AccessRightListContainer from './AccessRightListContainer'
import { accessRightActions, accessRightSelectors } from '../clients/AccessRightClient'
import { accessGroupActions, accessGroupSelectors } from '../clients/AccessGroupClient'
import { pluginConfigurationActions, pluginConfigurationSelectors } from '../clients/PluginConfigurationClient'
import { pluginMetaDataActions, pluginMetaDataSelectors } from '../clients/PluginMetadataClient'
import messages from '../i18n'

export class AccessGroupAccessRightsContainer extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
      accessgroup: PropTypes.string.isRequired,
    }).isRequired,
    // from mapStateToProps
    accessGroup: DataManagementShapes.AccessGroup,
    accessRights: DataManagementShapes.AccessRightList,
    pluginConfigurationList: CommonShapes.PluginConfigurationList,
    pluginMetaDataList: CommonShapes.PluginMetaDataList,
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
      dataset: {
        id: dataset.content.id,
        entityType: dataset.content.entityType,
      },
    }))
    const requests = []
    newAccessRightList.forEach((newAccessRight) => {
      // First update access right that are already configured
      const accessRightAlreadyExisting = find(accessRights, accessRight => newAccessRight.dataset.id === accessRight.content.dataset.id)
      if (accessRightAlreadyExisting) {
        const accessRightToUpdate = Object.assign({}, newAccessRight, { id: accessRightAlreadyExisting.content.id })
        requests.push(this.props.updateAccessRight(accessRightAlreadyExisting.content.id, accessRightToUpdate))
      } else {
        requests.push(this.props.createAccessRight(newAccessRight))
      }
    })
    // Run all promises together and wait the end to refresh the current access group
    return Promise.all(requests)
      .then((actionsResults) => {
        const errors = filter(actionsResults, ar => ar.error)
        this.props.fetchAccessRights(accessGroup.content.name)
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
    // Force redraw
    this.setState({
      loading: true,
    })
    Promise.resolve(this.props.deleteAccessRight(accessRight.id))
      .then(() => {
        this.setState({
          loading: false,
        })
        this.props.fetchAccessRights(this.props.accessGroup.content.name)
      })
  }

  render() {
    const {
      params, accessGroup, accessRights, pluginConfigurationList, pluginMetaDataList,
    } = this.props
    const { loading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={loading}
          isContentError={!loading && !accessGroup}
        >
          {() => (
            <AccessRightListContainer
              params={params}
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
  pluginMetaDataList: pluginMetaDataSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginConfigurationList: () => dispatch(pluginConfigurationActions.fetchEntityList({
    microserviceName: 'rs-dam',
  }, {
    pluginId: 'fr.cnes.regards.modules.dataaccess.domain.accessright.ICheckDataAccess',
  })),
  fetchAccessGroup: accessGroupName => dispatch(accessGroupActions.fetchEntity(accessGroupName)),
  fetchPluginMetaDataList: microserviceName => dispatch(pluginMetaDataActions.fetchEntityList({
    microserviceName: 'rs-dam',
  }, {
    pluginType: 'fr.cnes.regards.modules.dataaccess.domain.accessright.ICheckDataAccess',
  })),
  fetchAccessRights: accessgroupName => dispatch(accessRightActions.fetchPagedEntityList(0, 10000, {}, { accessgroup: accessgroupName })),
  updateAccessRight: (id, entity) => dispatch(accessRightActions.updateEntity(id, entity)),
  createAccessRight: entity => dispatch(accessRightActions.createEntity(entity)),
  deleteAccessRight: id => dispatch(accessRightActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccessGroupAccessRightsContainer)
