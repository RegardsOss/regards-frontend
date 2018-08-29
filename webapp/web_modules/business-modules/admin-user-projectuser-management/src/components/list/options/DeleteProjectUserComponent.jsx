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
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import { AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { withHateoasDisplayControl, HateoasKeys } from '@regardsoss/display-control'

// define Hatoas capable icon button (exported for tests)
export const HatoasIconButton = withHateoasDisplayControl(IconButton)
/**
 * Delete project user component option
 * @author Raphaël Mechali
 */
class DeleteProjectUserComponent extends React.Component {
  static propTypes = {
    entity: AdminShapes.ProjectUser.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User callback: on delete project user, locally wrapped
   */
  onDelete = () => {
    const { entity, onDelete } = this.props
    onDelete(entity)
  }

  render() {
    const { entity, isLoading } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <HatoasIconButton
        className="selenium-deleteButton"
        disabled={isLoading}
        title={formatMessage({ id: 'projectUser.list.table.action.delete.tooltip' })}
        onClick={this.onDelete}
        // HATOAS control
        entityLinks={entity.links}
        hateoasKey={HateoasKeys.DELETE}
        disableInsteadOfHide
      >
        <DeleteIcon />
      </HatoasIconButton>
    )
  }
}

export default DeleteProjectUserComponent