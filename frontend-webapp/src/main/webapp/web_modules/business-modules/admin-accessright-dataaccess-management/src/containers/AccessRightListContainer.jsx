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
import get from 'lodash/get'
import map from 'lodash/map'
import filter from 'lodash/filter'
import { browserHistory } from 'react-router'
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import TableClient from '../clients/TableClient'
import AccessRightClient from '../clients/AccessRightClient'
import DatasetWithAccessRightClient from '../clients/DatasetWithAccessRightClient'
import AccessRightListComponent from '../components/AccessRightListComponent'

export class AccessRightListContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // Access group to configure.
    accessGroup: DataManagementShapes.AccessGroup.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    selectedDatasetsWithAccessright: PropTypes.arrayOf(DataManagementShapes.DatasetWithAccessRight).isRequired,
    // Availables plugin configuration for custom access rights delegated to plugins
    pluginConfigurationList: CommonShapes.PluginConfigurationList.isRequired,
    // Availables plugin definitions for custom access rights delegated to plugins
    pluginMetaDataList: CommonShapes.PluginMetaDataList.isRequired,
    meta: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    fetchDatasetWithAccessRightPage: PropTypes.func.isRequired,
    deleteAccessRight: PropTypes.func.isRequired,
    updateAccessRight: PropTypes.func.isRequired,
    createAccessRight: PropTypes.func.isRequired,
  }

  state = {
    filters: {},
  }

  onSubmit = (selectedDatasetsWithAccessright, formValues) => {
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
    const newAccessRightList = map(selectedDatasetsWithAccessright, datasetWithAR => ({
      id: get(datasetWithAR, 'content.accessRight.id', null),
      qualityFilter,
      dataAccessRight,
      accessGroup: accessGroup.content,
      accessLevel: formValues.access,
      dataset: {
        id: get(datasetWithAR, 'content.dataset.id', null),
        entityType: get(datasetWithAR, 'content.dataset.entityType', null),
      },
    }))
    const requests = []
    newAccessRightList.forEach((newAccessRight) => {
      // First update access right that are already configured
      if (newAccessRight.id) {
        requests.push(this.props.updateAccessRight(newAccessRight.id, newAccessRight))
      } else {
        requests.push(this.props.createAccessRight(newAccessRight))
      }
    })
    // Run all promises together and wait the end to refresh the current access group
    return Promise.all(requests)
      .then((actionsResults) => {
        const errors = filter(actionsResults, ar => ar.error)
        this.refresh()
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
    console.error('access to delete', accessRight)
    Promise.resolve(this.props.deleteAccessRight(accessRight.id))
      .then(() => {
        this.refresh()
      })
  }

  getBackURL = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/access-right/access-group/list`
  }

  setFilters = (filters, refresh) => {
    if (refresh) {
      this.setState({ filters }, this.refresh)
    } else {
      this.setState({ filters })
    }
  }

  navigateToCreateDataset = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/collections/dataset/create/datasource`
    browserHistory.push(url)
  }

  refresh = () => {
    const { meta, fetchDatasetWithAccessRightPage } = this.props
    const { filters } = this.state
    const curentPage = get(meta, 'number', 0)
    const accessGroupName = get(this.props.accessGroup, 'content.name', null)
    if (accessGroupName) {
      fetchDatasetWithAccessRightPage(0, AccessRightListComponent.PAGE_SIZE * (curentPage + 1), { accessGroupName }, filters)
    }
  }

  render() {
    return (
      <AccessRightListComponent
        accessGroup={this.props.accessGroup.content}
        pluginConfigurationList={this.props.pluginConfigurationList}
        pluginMetaDataList={this.props.pluginMetaDataList}
        deleteAccessRight={this.onDelete}
        submitAccessRights={this.onSubmit}
        navigateToCreateDataset={this.navigateToCreateDataset}
        backURL={this.getBackURL()}
        selectedDatasetsWithAccessright={this.props.selectedDatasetsWithAccessright}
        setFilters={this.setFilters}
        onRefresh={this.refresh}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  meta: DatasetWithAccessRightClient.datasetWithAccessRightSelectors.getMetaData(state),
  selectedDatasetsWithAccessright: TableClient.tableSelectors.getToggledElementsAsList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchDatasetWithAccessRightPage: (pageIndex, pageSize, pathParams, queryParams) => dispatch(DatasetWithAccessRightClient.datasetWithAccessRightActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams)),
  updateAccessRight: (id, entity) => dispatch(AccessRightClient.accessRightActions.updateEntity(id, entity)),
  createAccessRight: entity => dispatch(AccessRightClient.accessRightActions.createEntity(entity)),
  deleteAccessRight: id => dispatch(AccessRightClient.accessRightActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccessRightListContainer)
