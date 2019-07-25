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
 import IconButton from 'material-ui/IconButton'
 **/
import IconButton from 'material-ui/IconButton'
import DeleteOnAllIcon from 'material-ui/svg-icons/action/delete-forever'
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { withHateoasDisplayControl } from '@regardsoss/display-control'
import { TableSelectionModes } from '@regardsoss/components'

/** HATEOAS-able button, exported for tests */
export const HateoasIconAction = withHateoasDisplayControl(IconButton)

/**
 * Table option to delete AIP files on every local storage
 * @author Raphaël Mechali
 */
class DeleteAIPOnAllStoragesOption extends React.Component {
  static propTypes = {
    // Entity. Note: when used in options column, this is provided by the table cell API
    entity: StorageShapes.AIPWithStorages.isRequired,
    // callback: on delete (selectionMode, [AIPs]) => ()
    onDelete: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** HateOAS Link to delete on All storages  */
  static DELETE_ON_ALL_LINK = 'deleteByQuery'

  /**
   * On button clicked callback
   */
  onClick = () => {
    const { entity, onDelete } = this.props
    onDelete(TableSelectionModes.includeSelected, [entity])
  }

  render() {
    const { entity } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <HateoasIconAction
        entityLinks={entity.links}
        hateoasKey={DeleteAIPOnAllStoragesOption.DELETE_ON_ALL_LINK}
        title={formatMessage({ id: 'oais.aips.list.delete.files.on.all.storages.title' })}
        onClick={this.onClick}
        alwaysDisplayforInstanceUser={false}
        disableInsteadOfHide
      >
        <DeleteOnAllIcon className="selenium-deleteButton" />
      </HateoasIconAction>
    )
  }
}
export default DeleteAIPOnAllStoragesOption
