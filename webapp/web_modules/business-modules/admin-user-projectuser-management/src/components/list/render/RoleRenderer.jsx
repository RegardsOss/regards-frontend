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
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Display fragment name for an attribute model
 * @author Sébastien Binda
 */
class RoleRenderer extends React.Component {
  static propTypes = {
    entity: AccessShapes.ProjectUser,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render = () => {
    const { entity } = this.props
    const formatted = this.context.intl.formatMessage({ id: `projectUser.list.table.role.label.${entity.content.role.name}` })
    if (formatted !== `projectUser.list.table.role.label.${entity.content.role.name}`) {
      return formatted
    }
    return entity.content.role.name
  }
}
export default RoleRenderer
