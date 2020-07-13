/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import EditIcon from 'mdi-material-ui/Pencil'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { withHateoasDisplayControl, HateoasKeys } from '@regardsoss/display-control'

export const HateoasIconAction = withHateoasDisplayControl(IconButton)

/**
 * Option to edit a configuration in list
 * @author Raphaël Mechali
 */
class EditConfigurationComponent extends React.Component {
  static propTypes = {
    uiPluginConfiguration: AccessShapes.UIPluginConf.isRequired,
    onEdit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * User callback: edit configuration
   */
  onEdit = () => {
    const { uiPluginConfiguration, onEdit } = this.props
    onEdit(uiPluginConfiguration.content.id)
  }

  render() {
    const { uiPluginConfiguration } = this.props
    const { intl: { formatMessage }, moduleTheme: { plugin } } = this.context
    return (
      <HateoasIconAction
        entityLinks={uiPluginConfiguration.links}
        hateoasKey={HateoasKeys.UPDATE}
        onClick={this.onEdit}
        title={formatMessage({ id: 'service.listconf.tooltip.edit' })}
      >
        <EditIcon hoverColor={plugin.editHover} />
      </HateoasIconAction>
    )
  }
}
export default EditConfigurationComponent
