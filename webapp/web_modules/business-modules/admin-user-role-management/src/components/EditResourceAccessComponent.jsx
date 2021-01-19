/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import SettingsIcon from 'mdi-material-ui/VideoInputComponent'
import { AdminShapes } from '@regardsoss/shape'
import { HateoasIconAction } from '@regardsoss/components'

/**
 * Delete role component for role list
 * @author Raphaël Mechali
 */
class EditResourceAccessComponent extends React.Component {
  static propTypes = {
    role: AdminShapes.Role.isRequired,
    onEditResourceAccess: PropTypes.func.isRequired, // callback like roleName => ()
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * User callback: on edit role
   */
  onEditResourceAccess = () => {
    const { role, onEditResourceAccess } = this.props
    onEditResourceAccess(role.content.name)
  }

  render() {
    const { role } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context
    return (
      <HateoasIconAction
        entityLinks={role.links}
        hateoasKey="manage-resource-access"
        onClick={this.onEditResourceAccess}
        title={formatMessage({ id: 'role.edit.resource.action.title' })}
      >
        <SettingsIcon hoverColor={moduleTheme.hoverButtonView} />
      </HateoasIconAction>)
  }
}
export default EditResourceAccessComponent
