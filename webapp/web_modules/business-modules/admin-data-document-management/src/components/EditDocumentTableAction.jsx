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
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { withHateoasDisplayControl, HateoasKeys } from '@regardsoss/display-control'

const HateoasIconAction = withHateoasDisplayControl(IconButton)

/**
 * Action to edit documents in table
 * @author Raphaël Mechali
 */
class EditDocumentTableAction extends React.Component {
  static propTypes = {
    // table API
    entity: DataManagementShapes.Document,
    // custom props
    onEdit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User callback: on edit action
   */
  onEdit = () => {
    const { entity, onEdit } = this.props
    onEdit(entity.content.id)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity } = this.props
    return (
      <HateoasIconAction
        title={formatMessage({ id: 'document.list.action.edit' })}
        onClick={this.onEdit}
        entityLinks={entity.links}
        hateoasKey={HateoasKeys.UPDATE}
        disableInsteadOfHide
      >
        <EditIcon />
      </HateoasIconAction>
    )
  }
}
export default EditDocumentTableAction
