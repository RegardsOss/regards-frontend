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
import map from 'lodash/map'
import filter from 'lodash/filter'
import cloneDeep from 'lodash/cloneDeep'
import some from 'lodash/some'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { CatalogShapes, CommonShapes } from '@regardsoss/shape'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import DatasetStepperContainer from '../containers/DatasetStepperContainer'

/**
 * React component to list datasets.
 */
export class DatasetEditPluginComponent extends React.Component {
  static propTypes = {
    linkPluginDataset: CatalogShapes.LinkPluginDataset.isRequired,
    pluginConfigurationList: CommonShapes.PluginConfigurationList,
    pluginMetaDataList: CommonShapes.PluginMetaDataList,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    currentDatasetIpId: PropTypes.string.isRequired,
    currentDatasetId: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    currentLinkPluginDataset: cloneDeep(this.props.linkPluginDataset),
  }

  /**
   * On user checked service box callback
   */
  onCheck = (pluginConfiguration, isInputChecked) => {
    const { currentLinkPluginDataset: { content: previousContent } } = this.state
    const currentLinkPluginDataset = {
      content: {
        ...previousContent,
        services: isInputChecked
          // add service
          ? [...previousContent.services, pluginConfiguration.content]
          // remove service
          : previousContent.services.filter((service) => service.id !== pluginConfiguration.content.id),
      },
    }
    this.setState({ currentLinkPluginDataset })
  }

  /**
   * User submit callback
   */
  onSubmit = () => { this.props.onSubmit(this.state.currentLinkPluginDataset) }

  isCheckboxChecked = (pluginConfiguration) => {
    const { currentLinkPluginDataset } = this.state
    return some(currentLinkPluginDataset.content.services, (service) => service.id === pluginConfiguration.content.id)
  }

  renderItemMetaData = (pluginMetaData, pluginConfigurationList) => {
    const pluginConfigurationAssociated = filter(pluginConfigurationList, (pluginConfiguration) => pluginConfiguration.content.pluginId === pluginMetaData.content.pluginId)
    return (
      <ShowableAtRender
        show={pluginConfigurationAssociated.length > 0}
        key={pluginMetaData.content.pluginId}
      >
        <ListItem
          primaryText={pluginMetaData.content.pluginId}
          secondaryText={pluginMetaData.content.version}
          disabled
          open
          autoGenerateNestedIndicator={false}
          nestedItems={
            map(pluginConfigurationAssociated, (pluginConfiguration, id) => (
              <ShowableAtRender
                show={pluginConfiguration.content.active}
                key={`plugin-configuration-${id}`}
              >
                <ListItem
                  primaryText={pluginConfiguration.content.label}
                  secondaryText={pluginConfiguration.content.version}
                  disabled
                  leftCheckbox={
                    <Checkbox
                      checked={this.isCheckboxChecked(pluginConfiguration)}
                      onCheck={(event, isInputChecked) => { this.onCheck(pluginConfiguration, isInputChecked) }}
                    />
                  }
                />
              </ShowableAtRender>
            ))
          }
        />
      </ShowableAtRender>)
  }

  render() {
    const {
      pluginConfigurationList,
      pluginMetaDataList,
      backUrl,
    } = this.props
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'dataset.form.plugin.title' })}
          subtitle={this.context.intl.formatHTMLMessage({ id: 'dataset.form.plugin.subtitle' })}
        />
        <DatasetStepperContainer
          stepIndex={4}
          currentDatasetIpId={this.props.currentDatasetIpId}
          currentDatasetId={this.props.currentDatasetId}
          isEditing
        />
        <CardText>
          <List>
            <Subheader><FormattedMessage id="dataset.form.plugin.services" /></Subheader>
            <Divider />
            {map(pluginMetaDataList, (pluginMetaData, id) => (
              this.renderItemMetaData(pluginMetaData, pluginConfigurationList)
            ))}
          </List>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={
              <FormattedMessage
                id="dataset.form.plugin.action.next"
              />
            }
            mainButtonClick={this.onSubmit}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.plugin.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default DatasetEditPluginComponent
