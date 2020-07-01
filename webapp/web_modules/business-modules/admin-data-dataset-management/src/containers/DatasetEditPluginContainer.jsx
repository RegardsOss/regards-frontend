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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { CatalogShapes, CommonShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import DatasetEditPluginComponent from '../components/DatasetEditPluginComponent'
import { linkPluginDatasetActions, linkPluginDatasetSelectors } from '../clients/LinkPluginDatasetClient'
import { pluginConfigurationActions, pluginConfigurationSelectors } from '../clients/PluginConfigurationClient'
import { pluginMetaDataActions, pluginMetaDataSelectors } from '../clients/PluginMetaDataClient'
import messages from '../i18n'

export class DatasetEditPluginContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      datasetId: PropTypes.string,
      datasetIpId: PropTypes.string.isRequired,
    }),

    // from mapStateToProps
    pluginConfigurationList: CommonShapes.PluginConfigurationList,
    pluginMetaDataList: CommonShapes.PluginMetaDataList,
    linkPluginDataset: CatalogShapes.LinkPluginDataset,

    // from mapDispatchToProps
    fetchPluginConfiguration: PropTypes.func,
    fetchPluginMetaData: PropTypes.func,
    fetchLinkPluginDataset: PropTypes.func,
    updateLinkPluginDataset: PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const tasks = [
      this.props.fetchPluginConfiguration(),
      this.props.fetchPluginMetaData(),
      this.props.fetchLinkPluginDataset(this.props.params.datasetIpId),
    ]
    Promise.all(tasks)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  onSubmit = (linkPluginDataset) => {
    Promise.resolve(this.props.updateLinkPluginDataset(this.props.params.datasetIpId, linkPluginDataset.content))
      .then((actionResult) => {
        if (!actionResult.error) {
          this.redirectToUIServices()
        }
      })
  }

  getBackUrl = () => {
    const { params: { project, datasetId } } = this.props
    return `/admin/${project}/data/collections/dataset/${datasetId}/links`
  }

  getForm = () => {
    const {
      pluginConfigurationList,
      pluginMetaDataList,
      linkPluginDataset,
    } = this.props
    return (<DatasetEditPluginComponent
      pluginConfigurationList={pluginConfigurationList}
      pluginMetaDataList={pluginMetaDataList}
      linkPluginDataset={linkPluginDataset}
      onSubmit={this.onSubmit}
      backUrl={this.getBackUrl()}
      currentDatasetIpId={this.props.params.datasetIpId}
      currentDatasetId={this.props.params.datasetId}
    />)
  }

  redirectToUIServices = () => {
    const { params: { project, datasetId, datasetIpId } } = this.props
    const url = `/admin/${project}/data/collections/dataset/${datasetId}/${datasetIpId}/ui-services`
    browserHistory.push(url)
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

const mapStateToProps = (state, ownProps) => ({
  pluginConfigurationList: pluginConfigurationSelectors.getList(state),
  pluginMetaDataList: pluginMetaDataSelectors.getList(state),
  linkPluginDataset: linkPluginDatasetSelectors.getById(state, ownProps.params.datasetIpId),
})

const mapDispatchToProps = (dispatch) => ({
  fetchPluginConfiguration: () => dispatch(pluginConfigurationActions.fetchEntityList({
    microserviceName: 'rs-catalog',
  }, {
    pluginType: 'fr.cnes.regards.modules.catalog.services.domain.plugins.IService',
  })),
  fetchPluginMetaData: () => dispatch(pluginMetaDataActions.fetchEntityList({
    microserviceName: 'rs-catalog',
  }, {
    pluginType: 'fr.cnes.regards.modules.catalog.services.domain.plugins.IService',
  })),
  fetchLinkPluginDataset: (datasetIpId) => dispatch(linkPluginDatasetActions.fetchEntity(datasetIpId)),
  updateLinkPluginDataset: (datasetIpId, linkPluginDataset) => dispatch(linkPluginDatasetActions.updateEntity(datasetIpId, linkPluginDataset)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetEditPluginContainer)
