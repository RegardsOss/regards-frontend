/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { datasetActions } from '../clients/DatasetClient'
import DatasetListComponent from '../components/DatasetListComponent'
import messages from '../i18n'

/**
 * Show the dataset list
 */
export class DatasetListContainer extends React.Component {
  static propTypes = {
    meta: PropTypes.shape({
      // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapDispatchToProps
    fetchDatasetList: PropTypes.func,
    deleteDataset: PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  UNSAFE_componentWillMount() {
    Promise.resolve(this.props.fetchDatasetList()).then((actionResult) => {
      if (!actionResult.error) {
        this.setState({
          isLoading: false,
        })
      }
    })
  }

  onRefresh = (filters) => {
    const { meta, fetchDatasetList } = this.props
    const curentPage = get(meta, 'number', 0)
    const curentPageSize = get(meta, 'size', DatasetListComponent.PAGE_SIZE)
    return fetchDatasetList(0, curentPageSize * (curentPage + 1), {}, filters)
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/collections/dataset/create/datasource`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/collections/board`
  }

  navigateToCreateDataset = () => {
    browserHistory.push(this.getCreateUrl())
  }

  handleEdit = (datasetId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/collections/dataset/${datasetId}/edit`
    browserHistory.push(url)
  }

  handleDelete = (datasetId) => {
    this.props.deleteDataset(datasetId)
  }

  render() {
    const { fetchDatasetList } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator isLoading={isLoading}>
          <DatasetListComponent
            fetchPage={fetchDatasetList}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            backUrl={this.getBackUrl()}
            createUrl={this.getCreateUrl()}
            navigateToCreateDataset={this.navigateToCreateDataset}
            onRefresh={this.onRefresh}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch) => ({
  fetchDatasetList: (pageIndex, pageSize, requestParams, queryParams) => dispatch(datasetActions.fetchPagedEntityList(pageIndex, pageSize, requestParams, queryParams)),
  deleteDataset: (id) => dispatch(datasetActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetListContainer)
