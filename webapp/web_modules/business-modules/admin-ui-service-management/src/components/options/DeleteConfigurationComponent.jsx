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
import DeleteIcon from 'mdi-material-ui/Delete'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { HateoasKeys } from '@regardsoss/display-control'
import { HateoasIconAction, withConfirmDialog } from '@regardsoss/components'

export const ConfirmableHateoasIconAction = withConfirmDialog(HateoasIconAction)

/**
 * Option to edit a configuration in list
 * @author Raphaël Mechali
 */
class DeleteConfigurationComponent extends React.Component {
  static propTypes = {
    uiPluginConfiguration: AccessShapes.UIPluginConf.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * User callback: delete configuration
   */
  onDelete = () => {
    const { onDelete, uiPluginConfiguration } = this.props
    onDelete(uiPluginConfiguration.content.id)
  }

  render() {
    const { uiPluginConfiguration } = this.props
    const { intl: { formatMessage }, moduleTheme: { plugin } } = this.context
    return (
      <ConfirmableHateoasIconAction
        entityLinks={uiPluginConfiguration.links}
        hateoasKey={HateoasKeys.DELETE}
        onClick={this.onDelete}
        title={formatMessage({ id: 'service.listconf.tooltip.delete' })}
        dialogTitle={formatMessage({ id: 'service.listconf.delete.confirm.title' })}
      >
        <DeleteIcon hoverColor={plugin.deleteHover} />
      </ConfirmableHateoasIconAction>
    )
  }
}
export default DeleteConfigurationComponent
