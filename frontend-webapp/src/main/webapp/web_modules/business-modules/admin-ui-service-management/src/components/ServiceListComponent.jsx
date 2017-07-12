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
import AppBar from 'material-ui/AppBar'
import { Card, CardActions, CardTitle } from 'material-ui/Card'
import IconList from 'material-ui/svg-icons/action/list'
import Back from 'material-ui/svg-icons/navigation/arrow-back'
import map from 'lodash/map'
import { i18nContextType } from '@regardsoss/i18n'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { AccessShapes } from '@regardsoss/shape'
import IconButton from 'material-ui/IconButton'
import moduleStyles from '../styles/styles'
import { uiPluginConfigurationActions } from '../clients/UIPluginConfigurationClient'

const styles = moduleStyles().plugins
const ResourceIconAction = withResourceDisplayControl(IconButton)

/**
 * Displays the list of PluginDefinition having the type service
 *
 * @author Léo Mieulet
 */
class ServiceListComponent extends React.Component {

  static propTypes = {
    uiPluginDefinitionList: AccessShapes.UIPluginDefinitionList,
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
    const { handleOpen } = this.props
    return (
      <div className={styles.tile.classes} key={uiPluginDefinition.content.id}>
        <Card style={styles.tile.styles}>
          <CardTitle
            title={uiPluginDefinition.content.name}
          />
          <CardActions>
            <ResourceIconAction
              resourceDependencies={uiPluginConfigurationActions.getDependency(RequestVerbEnum.GET_LIST)}
              tooltip={this.context.intl.formatMessage({ id: 'service.list.open.tooltip' })}
              onTouchTap={() => handleOpen(uiPluginDefinition.content.id)}
            >
              <IconList />
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
          iconElementLeft={<IconButton onTouchTap={handleBack}><Back /></IconButton>}
        />
        <div style={styles.root}>
          <div style={styles.grid}>
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
