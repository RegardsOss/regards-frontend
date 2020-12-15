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
import map from 'lodash/map'
import filter from 'lodash/filter'
import get from 'lodash/get'
import some from 'lodash/some'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import {
  Card, CardTitle, CardActions, CardText, List, ListItem,
  FlatButton, Checkbox, Tabs, Tab,
} from 'material-ui'
import FactoryIcon from 'mdi-material-ui/Factory'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { CardActionsComponent, ShowableAtRender, NoContentComponent } from '@regardsoss/components'
import DatasetStepperContainer from '../containers/DatasetStepperContainer'

export const DATASET_LINK_TYPE = {
  PLUGIN: 'plugin',
  UI_SERVICES: 'uiservices',
  PROCESSING: 'processing',
}

/**
 * React component to edit plugins, pluginsUI and processing
 * @author Théo Lasserre
 */
export class DatasetEditPluginUIProcessingComponent extends React.Component {
    static propTypes = {
      project: PropTypes.string.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      initialDatasetLinksByType: PropTypes.object.isRequired,
      backUrl: PropTypes.string.isRequired,
      onSubmit: PropTypes.func.isRequired,
      currentDatasetIpId: PropTypes.string.isRequired,
      currentDatasetId: PropTypes.string.isRequired,
      processingDependencies: PropTypes.bool.isRequired,
    }

    static contextTypes = {
      ...themeContextType,
      ...i18nContextType,
    }

    static getPluginId = (datasetLinkType) => {
      switch (datasetLinkType) {
        case DATASET_LINK_TYPE.UI_SERVICES:
          return 'id'
        case DATASET_LINK_TYPE.PROCESSING:
        case DATASET_LINK_TYPE.PLUGIN:
          return 'pluginId'
        default:
          return 'pluginId'
      }
    }

    static getDatasetLinkId = (datasetLinkType) => {
      switch (datasetLinkType) {
        case DATASET_LINK_TYPE.UI_SERVICES:
          return 'id'
        case DATASET_LINK_TYPE.PROCESSING:
          return 'businessId'
        case DATASET_LINK_TYPE.PLUGIN:
          return 'id'
        default:
          return 'id'
      }
    }

    static getDatasetLinkPluginName = (datasetLinkType) => {
      switch (datasetLinkType) {
        case DATASET_LINK_TYPE.UI_SERVICES:
          return 'name'
        case DATASET_LINK_TYPE.PROCESSING:
        case DATASET_LINK_TYPE.PLUGIN:
          return 'pluginId'
        default:
          return 'pluginId'
      }
    }

    static getPluginDefinition = (pluginConf, datasetLinkType, datasetLinkId) => {
      switch (datasetLinkType) {
        case DATASET_LINK_TYPE.UI_SERVICES:
          return pluginConf.content.pluginDefinition[datasetLinkId]
        case DATASET_LINK_TYPE.PROCESSING:
        case DATASET_LINK_TYPE.PLUGIN:
          return pluginConf.content[datasetLinkId]
        default:
          return pluginConf.content[datasetLinkId]
      }
    }

    static isActivatedForAllDatasets = (pluginConf, datasetLinkType) => {
      switch (datasetLinkType) {
        case DATASET_LINK_TYPE.UI_SERVICES:
          return get(pluginConf, 'content.linkedToAllEntities', false)
        case DATASET_LINK_TYPE.PROCESSING:
          return get(pluginConf, 'content.isLinkedToAllDatasets', false)
        case DATASET_LINK_TYPE.PLUGIN: {
          const parameterFound = find(pluginConf.content.parameters, (parameter) => parameter.name === 'applyToAllDatasets')
          return parameterFound ? parameterFound.value : false
        }
        default:
          return false
      }
    }

    /**
     * We initialize state with links between Plugin, UIPlugins, Processing and datasets
     */
    state = {
      [DATASET_LINK_TYPE.PLUGIN]: [...this.props.initialDatasetLinksByType[DATASET_LINK_TYPE.PLUGIN].links.content.services],
      [DATASET_LINK_TYPE.UI_SERVICES]: [...this.props.initialDatasetLinksByType[DATASET_LINK_TYPE.UI_SERVICES].links.content.services],
      [DATASET_LINK_TYPE.PROCESSING]: this.props.processingDependencies ? [...this.props.initialDatasetLinksByType[DATASET_LINK_TYPE.PROCESSING].links.content.services] : [],
      tabValue: DATASET_LINK_TYPE.PLUGIN,
    }

    /**
     * We need to check if at least one conf exist for one metadata.
     * Used in renderList to display confs or a NoContentComponent
     * @param {*} pluginConfs
     * @param {*} metadatas
     * @param {*} datasetLinkId
     * @param {*} datasetLinkType
     */
    checkOnePluginConfByMetadataExist = (pluginConfs, metadatas, datasetLinkId, datasetLinkType) => {
      let ret = false
      if (!isEmpty(pluginConfs) && !isEmpty(metadatas)) {
        ret = some(metadatas, (metadata) => some(pluginConfs, (pluginConf) => DatasetEditPluginUIProcessingComponent.getPluginDefinition(pluginConf, datasetLinkType, datasetLinkId) === metadata.content[datasetLinkId]))
      }
      return ret
    }

    /**
     * Browser redirections to create a conf (Plugin, UIPlugin or Processing)
     * @param {*} datasetLinkType
     */
    createConfiguration = (datasetLinkType) => {
      const { project } = this.props
      // First we submit change on this form
      this.handleSubmit()
      // Then we redirect user to the correct form creation
      switch (datasetLinkType) {
        case DATASET_LINK_TYPE.PLUGIN:
          browserHistory.push(`/admin/${project}/dataaccess/services/create`)
          break
        case DATASET_LINK_TYPE.UI_SERVICES:
          browserHistory.push(`/admin/${project}/ui/plugin/create`)
          break
        case DATASET_LINK_TYPE.PROCESSING:
          browserHistory.push(`/admin/${project}/commands/processing/create`)
          break
        default:
          break
      }
    }

    createNoContentComponent = (datasetLinkType) => {
      const { intl: { formatMessage } } = this.context

      const emptyContentAction = (
        <FlatButton
          label={formatMessage({ id: `dataset.form.no.${datasetLinkType}.found.create` })}
          onClick={() => this.createConfiguration(datasetLinkType)}
          primary
        />
      )

      return (
        <NoContentComponent
          titleKey={`dataset.form.no.${datasetLinkType}.found`}
          messageKey={`dataset.form.no.${datasetLinkType}.found.message`}
          Icon={FactoryIcon}
          action={emptyContentAction}
        />
      )
    }

    /**
     * Render a List of checkable pluginConfs
     * @param {*} initialDatasetLinks
     * @param {*} datasetLinkType
     */
    renderList = (initialDatasetLinks, datasetLinkType) => {
      const { pluginConfs, metadatas } = initialDatasetLinks
      const currentLinks = this.state[datasetLinkType]
      const datasetLinkId = DatasetEditPluginUIProcessingComponent.getPluginId(datasetLinkType)
      const datasetPluginName = DatasetEditPluginUIProcessingComponent.getDatasetLinkPluginName(datasetLinkType)

      // We check if at least one pluginConf will be displayed for Plugins, UIPlugins or Processing.
      // If not we display a NoContentCard and user can create a conf for Plugins, UIPlugins or Processing.
      if (this.checkOnePluginConfByMetadataExist(pluginConfs, metadatas, datasetLinkId, datasetLinkType)) {
        // We wants a list for each metadata
        return map(metadatas, (metadata) => {
          // Retrieve the list of pluginConfs for the current metadata
          const pluginConfsByMetadata = filter(pluginConfs, (pluginConf) => (
            // Plugins and Processing Metadata use pluginId & PluginsUI Metadata use Id
            DatasetEditPluginUIProcessingComponent.getPluginDefinition(pluginConf, datasetLinkType, datasetLinkId) === metadata.content[datasetLinkId]
          ))

          return (
            <ShowableAtRender
              show={pluginConfsByMetadata.length > 0}
              key={metadata.content[datasetLinkId]}
            >
              <ListItem
                key={metadata}
                primaryText={metadata.content[datasetPluginName]}
                secondaryText={metadata.content.version}
                disabled
                open
                autoGenerateNestedIndicator={false}
                nestedItems={
                  map(pluginConfsByMetadata, (pluginConf, id) => (
                    <ShowableAtRender
                      show={pluginConf.content.active}
                      key={`${datasetLinkType}-configuration-${id}`}
                    >
                      <ListItem
                        key={id}
                        primaryText={pluginConf.content.label}
                        leftCheckbox={
                          <Checkbox
                            onCheck={() => this.handleCheck(currentLinks, datasetLinkType, pluginConf)}
                            checked={this.isActivated(currentLinks, pluginConf, datasetLinkType)}
                            disabled={DatasetEditPluginUIProcessingComponent.isActivatedForAllDatasets(pluginConf, datasetLinkType)}
                          />
                              }
                      />
                    </ShowableAtRender>
                  ))
              }
              />
            </ShowableAtRender>
          )
        })
      }
      return this.createNoContentComponent(datasetLinkType)
    }

    /**
     * Handle the click on the checkbox to toggle the association between the dataset and the Plugin, the UIPlugin or the Processing
     * @param {*} linkList
     * @param {*} datasetLinkType
     * @param {*} pluginConf Plugin, UIPlugin or Processing
     */
    handleCheck = (linkList, datasetLinkType, pluginConf) => {
      const datasetLinkId = DatasetEditPluginUIProcessingComponent.getDatasetLinkId(datasetLinkType)
      const pluginBusinessId = get(pluginConf, `content.${datasetLinkId}`, null)
      this.setState({
        [datasetLinkType]: this.isActivated(linkList, pluginConf, datasetLinkType)
        // remove Plugin from list
          ? linkList.filter((link) => pluginBusinessId !== link[datasetLinkId])
        // add Plugin in list
          : [...linkList, { [datasetLinkId]: pluginBusinessId }],
      })
    }

    /**
     * Check if pluginConf is in state activated list
     * @param {*} linkList
     * @param {*} pluginConf
     * @param {*} datasetLinkType
     */
    isActivated = (linkList, pluginConf, datasetLinkType) => {
      const datasetLinkId = DatasetEditPluginUIProcessingComponent.getDatasetLinkId(datasetLinkType)
      const pluginBusinessId = get(pluginConf, `content.${datasetLinkId}`, null)
      const activated = pluginConf ? DatasetEditPluginUIProcessingComponent.isActivatedForAllDatasets(pluginConf, datasetLinkType)
      || some(linkList, (link) => link[datasetLinkId] === pluginBusinessId) : false
      return activated
    }

    handleSubmit = () => {
      this.props.onSubmit(this.state)
    }

    handleChangeTab = (newTabValue) => {
      this.setState({
        tabValue: newTabValue,
      })
    }

    render() {
      const {
        initialDatasetLinksByType, currentDatasetIpId, currentDatasetId, backUrl,
      } = this.props
      const { intl: { formatMessage }, moduleTheme: { cardTextTabStyle } } = this.context
      const { tabValue } = this.state

      return (
        <Card>
          <CardTitle
            title={formatMessage({ id: 'dataset.form.pluginsUIProcessing.title' })}
            subtitle={formatMessage({ id: 'dataset.form.pluginsUIProcessing.subtitle' })}
          />
          <DatasetStepperContainer
            stepIndex={4}
            currentDatasetIpId={currentDatasetIpId}
            currentDatasetId={currentDatasetId}
            isEditing
          />
          <CardText style={cardTextTabStyle}>
            <Tabs
              value={tabValue}
              onChange={this.handleChangeTab}
              centered="true"
            >
              {map(initialDatasetLinksByType, (initialDatasetLinks, datasetLinkType) => (
                <Tab
                  key={datasetLinkType}
                  label={formatMessage({ id: `dataset.form.${datasetLinkType}.services` })}
                  value={datasetLinkType}
                >
                  <List key={datasetLinkType}>
                    {this.renderList(initialDatasetLinks, datasetLinkType)}
                  </List>
                </Tab>
              ))}
            </Tabs>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.pluginsUIProcessing.action.next' })}
              mainButtonClick={this.handleSubmit}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.pluginsUIProcessing.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      )
    }
}

export default DatasetEditPluginUIProcessingComponent
