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
import Delete from 'material-ui/svg-icons/action/delete'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { withHateoasDisplayControl, HateoasKeys } from '@regardsoss/display-control'

const HateoasIconAction = withHateoasDisplayControl(IconButton)

/**
 * * Action to delete documents in table
 * @author Raphaël Mechali
 */
class DeleteDocumentTableAction extends React.Component {
  static propTypes = {
    // table API
    entity: DataManagementShapes.Document,
    rowIndex: PropTypes.number.isRequired,
    // custom props
    pageSize: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User callback: on delete action
   */
  onDelete = () => {
    const {
      entity, rowIndex, pageSize, onDelete,
    } = this.props
    onDelete(entity, rowIndex, pageSize)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity } = this.props

    return (
      <HateoasIconAction
        title={formatMessage({ id: 'document.list.action.delete' })}
        onClick={this.onDelete}
        entityLinks={entity.links}
        hateoasKey={HateoasKeys.DELETE}
        disableInsteadOfHide
      >
        <Delete />
      </HateoasIconAction>
    )
  }
}
export default DeleteDocumentTableAction
