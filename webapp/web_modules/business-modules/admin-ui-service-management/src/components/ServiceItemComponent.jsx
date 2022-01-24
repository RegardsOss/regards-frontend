/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Card, CardActions, CardTitle } from 'material-ui/Card'
import IconList from 'mdi-material-ui/FormatListBulleted'
import IconAdd from 'mdi-material-ui/PlusCircle'
import { AccessShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ResourceIconAction } from '@regardsoss/components'
import { uiPluginConfigurationActions } from '../clients/UIPluginConfigurationClient'

/**
 * A service item component
 * @author Raphaël Mechali
 */
class ServiceItemComponent extends React.Component {
  static propTypes = {
    uiPluginDefinition: AccessShapes.UIPluginDefinition.isRequired,
    onOpen: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** User callback: open configurations list */
  onOpen = () => {
    const { uiPluginDefinition, onOpen } = this.props
    onOpen(uiPluginDefinition.content.id)
  }

  /** User callback: create new configuration */
  onCreate = () => {
    const { uiPluginDefinition, onCreate } = this.props
    onCreate(uiPluginDefinition.content.id)
  }

  render() {
    const {
      uiPluginDefinition: { content: { id, name } },
    } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context
    return (
      <div className={moduleTheme.plugins.tile.classes} key={id}>
        <Card style={moduleTheme.plugins.tile.styles}>
          <CardTitle
            title={name}
          />
          <CardActions style={moduleTheme.service.list.optionsStyles}>
            <ResourceIconAction
              resourceDependencies={uiPluginConfigurationActions.getDependency(RequestVerbEnum.GET_LIST)}
              tooltip={formatMessage({ id: 'service.list.open.tooltip' })}
              onClick={this.onOpen}
            >
              <IconList />
            </ResourceIconAction>
            <ResourceIconAction
              resourceDependencies={uiPluginConfigurationActions.getDependency(RequestVerbEnum.POST)}
              tooltip={formatMessage({ id: 'service.list.create.tooltip' })}
              onClick={this.onCreate}
            >
              <IconAdd />
            </ResourceIconAction>
          </CardActions>
        </Card>
      </div>
    )
  }
}
export default ServiceItemComponent
