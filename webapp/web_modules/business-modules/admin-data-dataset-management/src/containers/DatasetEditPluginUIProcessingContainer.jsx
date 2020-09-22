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
import compose from 'lodash/fp/compose'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import find from 'lodash/find'
import { connect } from '@regardsoss/redux'
import {
  CatalogShapes, CommonShapes, AccessShapes, ProcessingShapes,
} from '@regardsoss/shape'
import { I18nProvider, withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { LoadableContentDisplayDecorator, allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { uiPluginConfigurationSelectors, uiPluginConfigurationActions } from '../clients/UIPluginConfigurationClient'
import { uiPluginDefinitionSelectors, uiPluginDefinitionActions } from '../clients/UIPluginDefinitionClient'
import { linkUIPluginDatasetActions, linkUIPluginDatasetSelectors } from '../clients/LinkUIPluginDatasetClient'
import { linkPluginDatasetActions, linkPluginDatasetSelectors } from '../clients/LinkPluginDatasetClient'
import { pluginConfigurationActions, pluginConfigurationSelectors } from '../clients/PluginConfigurationClient'
import { pluginMetaDataActions, pluginMetaDataSelectors } from '../clients/PluginMetaDataClient'
import { processingActions, processingSelectors } from '../clients/ProcessingClient'
import { linkProcessingDatasetActions } from '../clients/LinkProcessingDatasetClient'
import DatasetEditPluginUIProcessingComponent, { DATASET_LINK_TYPE } from '../components/DatasetEditPluginUIProcessingComponent'
import styles from '../styles'
import messages from '../i18n'

export class DatasetEditPluginUIProcessingContainer extends React.Component {
    static mapStateToProps = (state, ownProps) => ({
      // Plugins
      pluginConfigurationList: pluginConfigurationSelectors.getList(state),
      pluginMetaDataList: pluginMetaDataSelectors.getList(state),
      linkPluginDataset: linkPluginDatasetSelectors.getById(state, ownProps.params.datasetIpId),

      // Services UI
      uiPluginConfigurationList: uiPluginConfigurationSelectors.getList(state),
      uiPluginDefinitionList: uiPluginDefinitionSelectors.getList(state),
      linkUIPluginDataset: linkUIPluginDatasetSelectors.getById(state, ownProps.params.datasetIpId),

      // Processing
      processingConfigurationList: processingSelectors.getList(state),
      processingMetadataList: pluginMetaDataSelectors.getList(state),

      availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
    })

    static mapDispatchToProps = (dispatch) => ({
      // Plugins
      fetchPluginConfigurationList: () => dispatch(pluginConfigurationActions.fetchEntityList({
        microserviceName: 'rs-catalog',
      }, {
        pluginType: 'fr.cnes.regards.modules.catalog.services.domain.plugins.IService',
      })),
      fetchPluginMetaDataList: () => dispatch(pluginMetaDataActions.fetchEntityList({
        microserviceName: 'rs-catalog',
      }, {
        pluginType: 'fr.cnes.regards.modules.catalog.services.domain.plugins.IService',
      })),
      fetchLinkPluginDataset: (datasetIpId) => dispatch(linkPluginDatasetActions.fetchEntity(datasetIpId)),
      updateLinkPluginDataset: (datasetIpId, linkPluginDataset) => dispatch(linkPluginDatasetActions.updateEntity(datasetIpId, linkPluginDataset)),

      // Services UI
      fetchUIPluginConfigurationList: (uiPluginId) => dispatch(uiPluginConfigurationActions.fetchPagedEntityList(0, 100,
        // { isActive: true, isDefault: false }
      )),
      fetchUIPluginDefinitionList: () => dispatch(uiPluginDefinitionActions.fetchPagedEntityList(
        0, 100, {},
        { type: 'SERVICE' },
      )),
      fetchLinkUIPluginDataset: (id) => dispatch(linkUIPluginDatasetActions.fetchEntity(id)),
      updateLinkUIPluginDataset: (id, linkUIPluginDataset) => dispatch(linkUIPluginDatasetActions.updateEntity(id, linkUIPluginDataset)),

      // Processing
      fetchProcessingConfigurationList: () => dispatch(processingActions.fetchEntityList()),
      fetchProcessingMetadataList: () => dispatch(pluginMetaDataActions.fetchEntityList({
        microserviceName: 'rs-processing',
      }, {
        pluginType: 'fr.cnes.regards.modules.processing.plugins.IProcessDefinition',
      })),
      fetchLinkProcessingDataset: (datasetIpId) => dispatch(linkProcessingDatasetActions.getLinkProcessDataset(datasetIpId)),
      updateLinkProcessingDataset: (datasetIpId, linkProcessingDataset) => dispatch(linkProcessingDatasetActions.putLinkProcessDataset(datasetIpId, linkProcessingDataset)),
    })

    static propTypes = {
      // from router
      params: PropTypes.shape({
        project: PropTypes.string.isRequired,
        datasetId: PropTypes.string.isRequired,
        datasetIpId: PropTypes.string.isRequired,
      }).isRequired,

      // from mapStateToProps
      // Plugins
      pluginConfigurationList: CommonShapes.PluginConfigurationList,
      pluginMetaDataList: CommonShapes.PluginMetaDataList,
      linkPluginDataset: CatalogShapes.LinkPluginDataset,

      // Services UI
      uiPluginConfigurationList: AccessShapes.UIPluginConfList,
      uiPluginDefinitionList: AccessShapes.UIPluginDefinitionList,
      linkUIPluginDataset: AccessShapes.LinkUIPluginDataset,

      // Processing
      processingConfigurationList: ProcessingShapes.ProcessingList,
      processingMetadataList: CommonShapes.PluginMetaDataList,

      // from mapDispatchToProps
      // Plugins
      fetchPluginConfigurationList: PropTypes.func,
      fetchPluginMetaDataList: PropTypes.func,
      fetchLinkPluginDataset: PropTypes.func,
      updateLinkPluginDataset: PropTypes.func,

      // Services UI
      fetchUIPluginConfigurationList: PropTypes.func,
      fetchUIPluginDefinitionList: PropTypes.func,
      fetchLinkUIPluginDataset: PropTypes.func,
      updateLinkUIPluginDataset: PropTypes.func,

      // Processing
      fetchProcessingConfigurationList: PropTypes.func,
      fetchProcessingMetadataList: PropTypes.func,
      fetchLinkProcessingDataset: PropTypes.func,
      updateLinkProcessingDataset: PropTypes.func,

      availableDependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    }

    state = {
      isLoading: true,
      initialDatasetLinksByType: {},
      processingDependencies: allMatchHateoasDisplayLogic(processingActions.getDependency(RequestVerbEnum.GET), this.props.availableDependencies),
    }

    UNSAFE_componentWillMount() {
      const tasks = [
        // Plugins
        this.props.fetchPluginConfigurationList(),
        this.props.fetchPluginMetaDataList(),
        this.props.fetchLinkPluginDataset(this.props.params.datasetIpId),

        // Services UI
        this.props.fetchUIPluginDefinitionList(),
        this.props.fetchUIPluginConfigurationList(),
        this.props.fetchLinkUIPluginDataset(this.props.params.datasetIpId),
      ]
      if (this.state.processingDependencies) {
        tasks.push(this.props.fetchProcessingConfigurationList())
        tasks.push(this.props.fetchProcessingMetadataList())
        tasks.push(this.props.fetchLinkProcessingDataset(this.props.params.datasetIpId))
      }
      Promise.all(tasks)
        .then((results) => {
          const {
            pluginConfigurationList, pluginMetaDataList, linkPluginDataset,
            uiPluginConfigurationList, uiPluginDefinitionList, linkUIPluginDataset,
            processingConfigurationList, processingMetadataList,
          } = this.props

          // Build a global object
          let initialDatasetLinksByType = {
            [DATASET_LINK_TYPE.PLUGIN]: { pluginConfs: pluginConfigurationList, metadatas: pluginMetaDataList, links: linkPluginDataset },
            [DATASET_LINK_TYPE.UI_SERVICES]: { pluginConfs: uiPluginConfigurationList, metadatas: uiPluginDefinitionList, links: linkUIPluginDataset },
          }

          // We add Processing to the global object only if rs-microservice is up in this project
          if (this.state.processingDependencies && processingConfigurationList) {
            // Rework of processingConfigurationList to match other conf shape
            const newProcessingConfigurationList = map(processingConfigurationList, (processingConfiguration) => {
              const newProcessingConfiguration = {
                content: {
                  ...processingConfiguration.content.pluginConfiguration,
                  label: find(processingConfiguration.content.pluginConfiguration.parameters, (parameter) => (
                    parameter.name === 'processName'
                  )).value,
                },
              }
              return newProcessingConfiguration
            })

            // Create link object for processing to match other shapes
            const linkProcessingPluginDataset = {
              content: {
                datasetId: this.props.params.datasetIpId,
                services: map(results[8].payload, (onePayload) => onePayload.content),
              },
            }

            // Add processing to the global object
            initialDatasetLinksByType = {
              ...initialDatasetLinksByType,
              [DATASET_LINK_TYPE.PROCESSING]: { pluginConfs: newProcessingConfigurationList, metadatas: processingMetadataList, links: linkProcessingPluginDataset },
            }
          }

          this.setState({
            isLoading: false,
            initialDatasetLinksByType,
          })
        })
    }

    redirectToListDataset = () => {
      const { params: { project } } = this.props
      browserHistory.push(`/admin/${project}/data/collections/dataset/list`)
    }

    getBackUrl = () => {
      const { params: { project, datasetId } } = this.props
      return `/admin/${project}/data/collections/dataset/${datasetId}/links`
    }

    // We update dataset only if there is a change in links
    onSubmit = (componentState) => {
      const { initialDatasetLinksByType } = this.state
      const updateTasks = []
      if (!isEqual(componentState[DATASET_LINK_TYPE.PLUGIN], initialDatasetLinksByType[DATASET_LINK_TYPE.PLUGIN].links.content.services)) {
        updateTasks.push(Promise.resolve(this.props.updateLinkPluginDataset(this.props.params.datasetIpId,
          {
            ...initialDatasetLinksByType[DATASET_LINK_TYPE.PLUGIN].links.content,
            services: componentState[DATASET_LINK_TYPE.PLUGIN],
          },
        )))
      }
      if (!isEqual(componentState[DATASET_LINK_TYPE.UI_SERVICES], initialDatasetLinksByType[DATASET_LINK_TYPE.UI_SERVICES].links.content.services)) {
        updateTasks.push(Promise.resolve(this.props.updateLinkUIPluginDataset(this.props.params.datasetIpId,
          {
            ...initialDatasetLinksByType[DATASET_LINK_TYPE.UI_SERVICES].links.content,
            services: componentState[DATASET_LINK_TYPE.UI_SERVICES],
          },
        )))
      }
      if (this.state.processingDependencies && !isEqual(componentState[DATASET_LINK_TYPE.PROCESSING], initialDatasetLinksByType[DATASET_LINK_TYPE.PROCESSING].links.content.services)) {
        // We need to rework links for processing because back server wants something specific
        const newBusinessIdList = map(componentState[DATASET_LINK_TYPE.PROCESSING], (link) => link.businessId)
        updateTasks.push(Promise.resolve(this.props.updateLinkProcessingDataset(this.props.params.datasetIpId, newBusinessIdList)))
      }
      if (!isEmpty(updateTasks)) {
        Promise.all(updateTasks)
          .then(() => {
            this.redirectToListDataset()
          })
      } else {
        this.redirectToListDataset()
      }
    }

    render() {
      const { params: { project, datasetIpId, datasetId } } = this.props
      const { isLoading, initialDatasetLinksByType } = this.state

      return (
        <I18nProvider messages={messages}>
          <LoadableContentDisplayDecorator
            isLoading={isLoading}
          >
            <DatasetEditPluginUIProcessingComponent
              project={project}
              initialDatasetLinksByType={initialDatasetLinksByType}
              onSubmit={this.onSubmit}
              backUrl={this.getBackUrl()}
              currentDatasetIpId={datasetIpId}
              currentDatasetId={datasetId}
              processingDependencies={this.state.processingDependencies}
            />
          </LoadableContentDisplayDecorator>
        </I18nProvider>
      )
    }
}

export default compose(
  connect(DatasetEditPluginUIProcessingContainer.mapStateToProps, DatasetEditPluginUIProcessingContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(DatasetEditPluginUIProcessingContainer)
