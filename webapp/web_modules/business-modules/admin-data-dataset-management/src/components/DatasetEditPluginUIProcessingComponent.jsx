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
import {
  Card, CardTitle, CardActions, CardText, List, ListItem,
  FlatButton, Checkbox, Tabs, Tab,
} from 'material-ui'
import FactoryIcon from 'mdi-material-ui/Factory'
import { processingDependencies } from '@regardsoss/admin-processing-management'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import {
  CatalogShapes, CommonShapes, AccessShapes, ProcessingShapes,
} from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { CardActionsComponent, ShowableAtRender, NoContentComponent } from '@regardsoss/components'
import DatasetStepperContainer from '../containers/DatasetStepperContainer'

export const DATASET_LINK_TYPE = {
  PLUGIN: 'plugin',
  UI_SERVICES: 'uiservices',
  PROCESSING: 'processing',
}

const FlatButtonWithResourceDisplayControl = withResourceDisplayControl(FlatButton)

/**
 * React component to edit plugins, pluginsUI and processing
 * @author Théo Lasserre
 */
class DatasetEditPluginUIProcessingComponent extends React.Component {
    static propTypes = {
      project: PropTypes.string.isRequired,
      initialDatasetLinksByType: PropTypes.shape({
        [DATASET_LINK_TYPE.PLUGIN]: PropTypes.shape({
          pluginConfs: CommonShapes.PluginConfigurationList,
          metadatas: CommonShapes.PluginMetaDataList,
          links: CatalogShapes.LinkPluginDataset,
        }),
        [DATASET_LINK_TYPE.UI_SERVICES]: PropTypes.shape({
          pluginConfs: AccessShapes.UIPluginConfList,
          metadatas: AccessShapes.UIPluginDefinitionList,
          links: AccessShapes.LinkUIPluginDataset,
        }),
        [DATASET_LINK_TYPE.PROCESSING]: PropTypes.shape({
          pluginConfs: ProcessingShapes.ProcessingList,
          metadatas: CommonShapes.PluginMetaDataList,
          //links: ProcessingShapes.LinkProcessingDataset,
        }),
      }),
      backUrl: PropTypes.string.isRequired,
      onSubmit: PropTypes.func.isRequired,
      currentDatasetIpId: PropTypes.string.isRequired,
      currentDatasetId: PropTypes.string.isRequired,
    }

    static contextTypes = {
      ...themeContextType,
      ...i18nContextType,
    }

    /**
     * We initialize state with links between Plugin, UIPlugins and datasets
     */
    state = {
      [DATASET_LINK_TYPE.PLUGIN]: [...this.props.initialDatasetLinksByType[DATASET_LINK_TYPE.PLUGIN].links.content.services],
      [DATASET_LINK_TYPE.UI_SERVICES]: [...this.props.initialDatasetLinksByType[DATASET_LINK_TYPE.UI_SERVICES].links.content.services],
      [DATASET_LINK_TYPE.PROCESSING]: [...this.props.initialDatasetLinksByType[DATASET_LINK_TYPE.PROCESSING].links.content.services],
      tabValue: 0,
    }

    checkOnePluginConfByMetadataExist = (pluginConfs, metadatas, datasetLinkId) => {
      let ret = false
      if (!isEmpty(pluginConfs) && !isEmpty(metadatas)) {
        for (const metadata in metadatas) {
          for (const pluginConf in pluginConfs) {
            if (pluginConfs[pluginConf].content.pluginDefinition[datasetLinkId] === metadatas[metadata].content[datasetLinkId]) {
              ret = true
              break
            }
          }
          if (ret) {
            break
          }
        }
      }
      return ret
    }

    createConfiguration = (datasetLinkType) => {
      const { project } = this.props
      // First we submit change on this form
      this.handleSubmit()
      // Then we redirect user to the correct form creation
      switch (datasetLinkType) {
        case DATASET_LINK_TYPE.PLUGIN:
          browserHistory.push(`/admin/${project}/ui/plugin/create`)
          break
        case DATASET_LINK_TYPE.UI_SERVICES:
          browserHistory.push(`/admin/${project}/dataaccess/services/create`)
          break
        case DATASET_LINK_TYPE.PROCESSING:
          browserHistory.push(`/admin/${project}/commands/processing/create`)
          break
      }
    }

    // TODO : A TERMINER -> pourquoi dependencies marche pas ?
    createNoContentComponent = (datasetLinkType) => {
      const { intl: { formatMessage } } = this.context
      let dependencies
      switch (datasetLinkType) {
        /*case DATASET_LINK_TYPE.PLUGIN:
                dependencies = datasetDependencies.addPluginConfigurationDependencies
                break;
            case DATASET_LINK_TYPE.UI_SERVICES :
                dependencies = datasetDependencies.addUIPluginConfigurationDependencies
                break;*/
        case DATASET_LINK_TYPE.PROCESSING:
          dependencies = processingDependencies.addProcessingDependencies
          break
      }

      const emptyContentAction = (
        <FlatButtonWithResourceDisplayControl
          resourceDependencies={dependencies}
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
     * Render a List of checkable pluginConfs thanks to a model element
     * @param {*} modelElement
     * @param {*} modelElementType Used for list items keys
     */
    renderList = (initialDatasetLinks, datasetLinkType) => {
      const { pluginConfs, metadatas } = initialDatasetLinks
      const currentLinks = this.state[datasetLinkType]
      const datasetLinkId = DATASET_LINK_TYPE.UI_SERVICES === datasetLinkType ? 'id' : 'pluginId'
      const datasetPluginName = DATASET_LINK_TYPE.UI_SERVICES === datasetLinkType ? 'name' : 'pluginId'

      // We check if at least one pluginConf will be displayed for Plugins, UIPlugins or Processing.
      // If not we display a NoContentCard and user can create a conf for Plugins, UIPlugins or Processing.
      if (this.checkOnePluginConfByMetadataExist(pluginConfs, metadatas, datasetLinkId)) {
        // We wants a list for each type of element (each metadata of element)
        return map(metadatas, (metadata, id) => {
          // Retrieve the list of pluginConfs for the current metadata
          const pluginConfsByMetadata = filter(pluginConfs, (pluginConf) => (
            // Plugins Metadata use pluginId & PluginsUI Metadata use Id
            pluginConf.content.pluginDefinition[datasetLinkId] === metadata.content[datasetLinkId]
          ))
          return (
            <ShowableAtRender
              show={pluginConfsByMetadata.length > 0}
              key={metadata.content[datasetLinkId]}
            >
              <ListItem
                key={id}
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
                                              checked={this.isActivated(currentLinks, pluginConf)}
                                              disabled={this.isActivatedForAllDatasets(pluginConf)}
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
     * Handle the click on the checkbox to toglle the association between the dataset and the Plugin, the UIPlugin or the Processing
     * @param {*} pluginConf Plugin, UIPlugin or Processing
     * @param {*} modelElement In order to get MODEL_TYPE
     */
    handleCheck = (linkList, datasetLinkType, pluginConf) => {
      this.setState({
        [datasetLinkType]: this.isActivated(linkList, pluginConf)
        // remove Plugin from list
          ? linkList.filter((link) => pluginConf.content.id !== link.id)
        // add Plugin in list
          : [...linkList, { id: pluginConf.content.id }],
      })
    }

    /**
     * Check if pluginConf is in state activated list
     * @param {*} link
     * @param {*} modelType
     */
    isActivated = (linkList, pluginConf) => this.isActivatedForAllDatasets(pluginConf)
            || some(linkList, (link) => link.id === pluginConf.content.id)

    isActivatedForAllDatasets = (pluginConf) => { get(pluginConf.content, 'linkedToAllEntities', false) }

    /**
     * We update links for Plugins and UIPlugins in editionModel
     */
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
      let index = 0 // Use in Tabs to autoselect first tab
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
                  value={index++}
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
