/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import { AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { withHateoasDisplayControl, HateoasKeys } from '@regardsoss/display-control'

// define Hatoas capable icon button (exported for tests)
export const HatoasIconButton = withHateoasDisplayControl(IconButton)

/**
 * Edit project user component option
 * @author Raphaël Mechali
 */
class EditProjectUserComponent extends React.Component {
  static propTypes = {
    entity: AdminShapes.ProjectUser.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User callback: on edit project user, locally wrapped
   */
  onEdit = () => {
    const { entity, onEdit } = this.props
    onEdit(entity.content.id)
  }

  render() {
    const { entity, isLoading } = this.props
    const { intl: { formatMessage } } = this.context

    return (
      <HatoasIconButton
        className="selenium-editButton"
        disabled={isLoading}
        title={formatMessage({ id: 'projectUser.list.table.action.edit.tooltip' })}
        onClick={this.onEdit}
        // HATOAS control
        entityLinks={entity.links}
        hateoasKey={HateoasKeys.UPDATE}
        disableInsteadOfHide
      >
        <EditIcon />
      </HatoasIconButton>
    )
  }
}

export default EditProjectUserComponent