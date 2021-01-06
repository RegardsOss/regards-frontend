/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DataManagementShapes } from '@regardsoss/shape'
import DatasetEditFilesComponent from '../components/DatasetEditFilesComponent'
import { datasetSelectors, datasetActions } from '../clients/DatasetClient'
import messages from '../i18n'

export class DatasetEditFilesContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      datasetId: PropTypes.string.isRequired,
    }).isRequired,

    // from mapStateToProps
    currentDataset: DataManagementShapes.Dataset,

    // from mapDispatchToProps
    fetchDataset: PropTypes.func,
    updateDataset: PropTypes.func,
  }

  static mapStateToProps = (state, ownProps) => ({
    currentDataset: datasetSelectors.getById(state, ownProps.params.datasetId),
  })

  static mapDispatchToProps = (dispatch) => ({
    fetchDataset: (id) => dispatch(datasetActions.fetchEntity(id)),
    updateDataset: (id, entity) => dispatch(datasetActions.updateEntity(id, entity)),
  })

  state = {
    isLoading: true,
  }

  componentDidMount() {
    this.props.fetchDataset(this.props.params.datasetId)
      .then(() => this.setState({
        isLoading: false,
      }))
  }

  getBackUrl = () => {
    const { params: { project }, currentDataset } = this.props
    return `/admin/${project}/data/collections/dataset/${currentDataset.content.id}/edit`
  }

  getLinksUrl = () => {
    const { params: { project }, currentDataset } = this.props
    return `/admin/${project}/data/collections/dataset/${currentDataset.content.id}/links`
  }

  getForm = () => {
    const { currentDataset } = this.props
    return (
      <DatasetEditFilesComponent
        currentDataset={currentDataset}
        backURL={this.getBackUrl()}
        linksURL={this.getLinksUrl()}
        handleRefreshEntity={this.handleRefreshEntity}
        handleUpdateEntity={this.handleUpdateEntity}
      />
    )
  }

  handleRefreshEntity = () => {
    this.props.fetchDataset(this.props.params.datasetId)
  }

  handleUpdateEntity = (entity) => {
    this.props.updateDataset(this.props.params.datasetId, entity)
  }

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.getForm}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

export default connect(DatasetEditFilesContainer.mapStateToProps, DatasetEditFilesContainer.mapDispatchToProps)(DatasetEditFilesContainer)
