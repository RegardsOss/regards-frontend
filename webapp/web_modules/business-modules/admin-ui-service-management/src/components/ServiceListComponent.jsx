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
import AppBar from 'material-ui/AppBar'
import { Card, CardActions, CardTitle } from 'material-ui/Card'
import IconList from 'mdi-material-ui/FormatListBulleted'
import IconAdd from 'mdi-material-ui/PlusCircle'
import Back from 'mdi-material-ui/ArrowLeft'
import IconButton from 'material-ui/IconButton'
import { i18nContextType } from '@regardsoss/i18n'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { AccessShapes } from '@regardsoss/shape'
import moduleStyles from '../styles/styles'
import { uiPluginConfigurationActions } from '../clients/UIPluginConfigurationClient'

const styles = moduleStyles()
const ResourceIconAction = withResourceDisplayControl(IconButton)

/**
 * Displays the list of PluginDefinition having the type service
 *
 * @author Léo Mieulet
 */
class ServiceListComponent extends React.Component {
  static propTypes = {
    uiPluginDefinitionList: AccessShapes.UIPluginDefinitionList,
    handleCreate: PropTypes.func.isRequired,
    handleOpen: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Returns a tile displaying the passed plugin.
   *
   * @param plugin
   */
  renderPlugin = (uiPluginDefinition) => {
    const { handleOpen, handleCreate } = this.props
    return (
      <div className={styles.plugins.tile.classes} key={uiPluginDefinition.content.id}>
        <Card style={styles.plugins.tile.styles}>
          <CardTitle
            title={uiPluginDefinition.content.name}
          />
          <CardActions style={styles.service.list.optionsStyles}>
            <ResourceIconAction
              resourceDependencies={uiPluginConfigurationActions.getDependency(RequestVerbEnum.GET_LIST)}
              tooltip={this.context.intl.formatMessage({ id: 'service.list.open.tooltip' })}
              onClick={() => handleOpen(uiPluginDefinition.content.id)}
            >
              <IconList />
            </ResourceIconAction>
            <ResourceIconAction
              resourceDependencies={uiPluginConfigurationActions.getDependency(RequestVerbEnum.POST)}
              tooltip={this.context.intl.formatMessage({ id: 'service.list.create.tooltip' })}
              onClick={() => handleCreate(uiPluginDefinition.content.id)}
            >
              <IconAdd />
            </ResourceIconAction>
          </CardActions>
        </Card>
      </div>
    )
  }


  render() {
    const { uiPluginDefinitionList, handleBack } = this.props
    return (
      <div>
        <AppBar
          title={this.context.intl.formatMessage({ id: 'service.list.title' })}
          iconElementLeft={<IconButton onClick={handleBack}><Back /></IconButton>}
        />
        <div style={styles.plugins.root}>
          <div style={styles.plugins.grid}>
            {map(uiPluginDefinitionList, uiPluginDefinition => (
              this.renderPlugin(uiPluginDefinition)
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default ServiceListComponent
