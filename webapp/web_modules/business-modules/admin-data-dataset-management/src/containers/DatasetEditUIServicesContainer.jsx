/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AccessShapes } from '@regardsoss/shape'
import DatasetEditUIServicesComponent from '../components/DatasetEditUIServicesComponent'
import { uiPluginConfigurationSelectors, uiPluginConfigurationActions } from '../clients/UIPluginConfigurationClient'
import { uiPluginDefinitionSelectors, uiPluginDefinitionActions } from '../clients/UIPluginDefinitionClient'
import { linkUIPluginDatasetActions, linkUIPluginDatasetSelectors } from '../clients/LinkUIPluginDatasetClient'
import messages from '../i18n'

export class DatasetEditUIServicesContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      datasetId: PropTypes.string.isRequired,
      datasetIpId: PropTypes.string.isRequired,
    }).isRequired,

    // from mapStateToProps
    uiPluginConfigurationList: AccessShapes.UIPluginConfList,
    uiPluginDefinitionList: AccessShapes.UIPluginDefinitionList,
    linkUIPluginDataset: AccessShapes.LinkUIPluginDataset,

    // from mapDispatchToProps
    fetchUIPluginConfigurationList: PropTypes.func,
    fetchUIPluginDefinitionList: PropTypes.func,
    fetchLinkUIPluginDataset: PropTypes.func,
    updateLinkUIPluginDataset: PropTypes.func,
  }

  static mapStateToProps = (state, ownProps) => ({
    uiPluginConfigurationList: uiPluginConfigurationSelectors.getList(state),
    uiPluginDefinitionList: uiPluginDefinitionSelectors.getList(state),
    linkUIPluginDataset: linkUIPluginDatasetSelectors.getById(state, ownProps.params.datasetIpId),
  })

  static mapDispatchToProps = dispatch => ({
    fetchUIPluginConfigurationList: uiPluginId => dispatch(uiPluginConfigurationActions.fetchPagedEntityList(0, 100,
      // { isActive: true, isDefault: false }
    )),
    fetchUIPluginDefinitionList: () => dispatch(uiPluginDefinitionActions.fetchPagedEntityList(
      0, 100, {},
      { type: 'SERVICE' },
    )),
    fetchLinkUIPluginDataset: id => dispatch(linkUIPluginDatasetActions.fetchEntity(id)),
    updateLinkUIPluginDataset: (id, linkUIPluginDataset) => dispatch(linkUIPluginDatasetActions.updateEntity(id, linkUIPluginDataset)),
  })

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const tasks = [
      this.props.fetchUIPluginDefinitionList(),
      this.props.fetchUIPluginConfigurationList(),
      this.props.fetchLinkUIPluginDataset(this.props.params.datasetIpId),
    ]
    Promise.all(tasks)
      .then(() => this.setState({
        isLoading: false,
      }))
  }

  getBackUrl = () => {
    const { params: { project, datasetId, datasetIpId } } = this.props
    return `/admin/${project}/data/collections/dataset/${datasetId}/${datasetIpId}/plugins`
  }

  getForm = () => {
    const { uiPluginDefinitionList, uiPluginConfigurationList, linkUIPluginDataset } = this.props
    return (<DatasetEditUIServicesComponent
      backUrl={this.getBackUrl()}
      uiPluginConfigurationList={uiPluginConfigurationList}
      uiPluginDefinitionList={uiPluginDefinitionList}
      linkUIPluginDataset={linkUIPluginDataset}
      handleSubmit={this.handleSubmit}
      currentDatasetIpId={this.props.params.datasetIpId}
      currentDatasetId={this.props.params.datasetId}
    />)
  }

  redirectToListDataset = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/collections/dataset/list`)
  }

  handleSubmit = (updatedLinkUIPluginDataset) => {
    Promise.resolve(this.props.updateLinkUIPluginDataset(this.props.params.datasetIpId, updatedLinkUIPluginDataset))
      .then((actionResult) => {
        if (!actionResult.error) {
          this.redirectToListDataset()
        }
      })
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


export default connect(DatasetEditUIServicesContainer.mapStateToProps, DatasetEditUIServicesContainer.mapDispatchToProps)(DatasetEditUIServicesContainer)
