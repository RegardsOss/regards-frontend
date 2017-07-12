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
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { List, ListItem } from 'material-ui/List'
import filter from 'lodash/filter'
import map from 'lodash/map'
import some from 'lodash/some'
import pull from 'lodash/pull'
import cloneDeep from 'lodash/cloneDeep'
import Checkbox from 'material-ui/Checkbox'
import { AccessShapes } from '@regardsoss/shape'
import DatasetStepperContainer from '../containers/DatasetStepperContainer'

/**
 * React component to list datasets.
 */
export class DatasetEditUIServicesComponent extends React.Component {

  static propTypes = {
    backUrl: PropTypes.string.isRequired,
    uiPluginConfigurationList: AccessShapes.UIPluginConfList,
    uiPluginDefinitionList: AccessShapes.UIPluginDefinitionList,
    linkUIPluginDataset: AccessShapes.LinkUIPluginDataset,
    handleSubmit: PropTypes.func.isRequired,
    currentDatasetIpId: PropTypes.string.isRequired,
    currentDatasetId: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      currentLinkUIPluginDataset: cloneDeep(props.linkUIPluginDataset.content),
    }
  }

  getConfigurationListItems = (uiPluginDefinition) => {
    const { uiPluginConfigurationList } = this.props
    // Retrieve the list of configuration for the current UIPlugiNDefinition
    const uiPluginCurrentConfigurationList = filter(uiPluginConfigurationList, (uiPluginConf, id) => (
      uiPluginConf.content.pluginId === uiPluginDefinition.content.id
    ))
    return map(uiPluginCurrentConfigurationList, (uiPluginConfiguration, id) => (
      <ListItem
        key={id}
        primaryText={uiPluginConfiguration.content.conf.label}
        leftCheckbox={
          <Checkbox
            onCheck={() => { this.handleCheck(uiPluginConfiguration) }}
            checked={this.isPluginConfigurationActivated(uiPluginConfiguration)}
          />
        }
      />
    ))
  }

  /**
   * Handle the click on the checkbox to toggle the association between the dataset and the UIPlugin
   * @param uiPluginConfiguration
   */
  handleCheck = (uiPluginConfiguration) => {
    const uiPluginConfigurationActiveList = this.state.uiPluginConfigurationActiveList
    if (this.isPluginConfigurationActivated(uiPluginConfiguration)) {
      pull(uiPluginConfigurationActiveList, uiPluginConfiguration.content)
    } else {
      uiPluginConfigurationActiveList.push(uiPluginConfiguration.content)
    }
    this.setState({
      uiPluginConfigurationActiveList,
    })
  }

  handleSubmit = () => {
    this.props.handleSubmit(this.state.currentLinkUIPluginDataset)
  }
  /**
   * Return true if the dataset is associated with the UIPluginConfiguration
   * @param uiPluginConfiguration
   * @returns {*}
   */
  isPluginConfigurationActivated = uiPluginConfiguration => some(this.state.currentLinkUIPluginDataset, uiPluginConfiguration.content.id)

  render() {
    const { backUrl, uiPluginDefinitionList } = this.props
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'dataset.form.uiservices.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'dataset.form.uiservices.subtitle' })}
        />
        <DatasetStepperContainer
          stepIndex={4}
          currentDatasetIpId={this.props.currentDatasetIpId}
          currentDatasetId={this.props.currentDatasetId}
          isEditing
        />
        <CardText>
          <List>
            {map(uiPluginDefinitionList, (uiPluginDefinition, id) => (
              <ListItem
                key={id}
                primaryText={uiPluginDefinition.content.name}
                initiallyOpen
                primaryTogglesNestedList
                nestedItems={
                    this.getConfigurationListItems(uiPluginDefinition)
                  }
              />
              ),
            )}
          </List>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.uiservices.action.next' })}
            mainButtonTouchTap={this.handleSubmit}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.uiservices.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default DatasetEditUIServicesComponent

