/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isNil from 'lodash/isNil'
import filter from 'lodash/filter'
import { browserHistory } from 'react-router'
import { DataManagementShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { tableSelectors, tableActions } from '../clients/TableClient'
import { accessRightActions } from '../clients/AccessRightClient'
import { datasetWithAccessRightActions, datasetWithAccessRightSelectors } from '../clients/DatasetWithAccessRightClient'
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
    meta: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    isFetching: PropTypes.bool.isRequired,
    fetchDatasetWithAccessRightPage: PropTypes.func.isRequired,
    clearSelection: PropTypes.func.isRequired,
    deleteAccessRight: PropTypes.func.isRequired,
    updateAccessRight: PropTypes.func.isRequired,
    createAccessRight: PropTypes.func.isRequired,
  }

  state ={
    filters: {},
    isSubmitting: false,
  }

  onSubmit = (selectedDatasetsWithAccessright, formValues) => {
    const { accessGroup } = this.props
    // Create new access rights
    const newAccessRightList = map(selectedDatasetsWithAccessright, (datasetWithAR) => ({
      id: get(datasetWithAR, 'content.accessRight.id', null),
      qualityFilter: { // XXX-workaround: backend refuses missing quality filter (clear when correctly coded on backend)
        maxScore: undefined,
        minScore: undefined,
        qualityLevel: undefined,
      },
      dataAccessPlugin: formValues.dataAccessPlugin,
      accessGroup: accessGroup.content,
      metadataAccessLevel: formValues.access,
      fileAccessLevel: formValues.dataAccess,
      dataset: {
        id: get(datasetWithAR, 'content.dataset.id', null),
        type: get(datasetWithAR, 'content.dataset.type', null),
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
    this.setState({
      isSubmitting: true,
    })
    // Run all promises together and wait the end to refresh the current access group
    return Promise.all(requests)
      .then((actionsResults) => {
        const errors = filter(actionsResults, (ar) => ar.error)
        this.refresh()
        this.setState({
          isSubmitting: false,
        })
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
        this.refresh()
      })
  }

  getBackURL = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/access-group/list`
  }

  navigateToCreateDataset = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/collections/dataset/create/datasource`
    browserHistory.push(url)
  }

  refresh = () => {
    const { meta, fetchDatasetWithAccessRightPage, clearSelection } = this.props
    const pageSize = get(meta, 'size', 0)
    const accessGroupName = get(this.props.accessGroup, 'content.name', null)
    if (accessGroupName) {
      clearSelection() // clear selection to avoid selected elements changes
      fetchDatasetWithAccessRightPage(0, pageSize, { accessGroupName }, this.state.filters)
    }
  }

  filter = (filters) => {
    if (!isNil(filters)) {
      this.setState({ filters })
    }
  }

  render() {
    return (
      <AccessRightListComponent
        accessGroup={this.props.accessGroup.content}
        deleteAccessRight={this.onDelete}
        submitAccessRights={this.onSubmit}
        navigateToCreateDataset={this.navigateToCreateDataset}
        backURL={this.getBackURL()}
        selectedDatasetsWithAccessright={this.props.selectedDatasetsWithAccessright}
        onRefresh={this.refresh}
        onFilter={this.filter}
        filters={this.state.filters}
        isFetching={this.props.isFetching}
        isSubmitting={this.state.isSubmitting}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  meta: datasetWithAccessRightSelectors.getMetaData(state),
  selectedDatasetsWithAccessright: tableSelectors.getToggledElementsAsList(state),
  isFetching: datasetWithAccessRightSelectors.isFetching(state),
})

const mapDispatchToProps = (dispatch) => ({
  clearSelection: () => dispatch(tableActions.unselectAll()),
  fetchDatasetWithAccessRightPage: (pageIndex, pageSize, pathParams, queryParams) => dispatch(datasetWithAccessRightActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams)),
  updateAccessRight: (id, entity) => dispatch(accessRightActions.updateEntity(id, entity)),
  createAccessRight: (entity) => dispatch(accessRightActions.createEntity(entity)),
  deleteAccessRight: (id) => dispatch(accessRightActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccessRightListContainer)
