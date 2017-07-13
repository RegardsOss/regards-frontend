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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { datasetActions, datasetSelectors } from '../clients/DatasetClient'
import DatasetListComponent from '../components/DatasetListComponent'
import messages from '../i18n'

/**
 * Show the dataset list
 */
export class DatasetListContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    datasetList: DataManagementShapes.DatasetList,
    // from mapDispatchToProps
    fetchDatasetList: PropTypes.func,
    deleteDataset: PropTypes.func,
  }
  state = {
    isLoading: true,
  }
  componentWillMount() {
    Promise.resolve(this.props.fetchDatasetList())
      .then((actionResult) => {
        if (!actionResult.error) {
          this.setState({
            isLoading: false,
          })
        }
      })
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/dataset/create/datasource`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/board`
  }

  handleEdit = (datasetId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/dataset/${datasetId}/edit`
    browserHistory.push(url)
  }

  handleDelete =(datasetId) => {
    this.props.deleteDataset(datasetId)
  }

  render() {
    const { datasetList } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          <DatasetListComponent
            datasetList={datasetList}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            backUrl={this.getBackUrl()}
            createUrl={this.getCreateUrl()}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  datasetList: datasetSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchDatasetList: () => dispatch(datasetActions.fetchPagedEntityList(0, 100)),
  deleteDataset: id => dispatch(datasetActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetListContainer)
