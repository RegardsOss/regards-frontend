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
import DeleteIcon from 'mdi-material-ui/Delete'
import IconButton from 'material-ui/IconButton'
import { CriteriaEditableRow } from '../../../../../shapes/form/CriteriaEditableRow'
import { CriteriaRowsHelper } from '../cells/CriteriaRowsHelper'

/**
 * Table option to insert a group / criterion
 * @author Raphaël Mechali
 */
class DeleteOptionComponent extends React.Component {
  static propTypes = {
    entity: CriteriaEditableRow.isRequired,
    onDeleteCriterion: PropTypes.func.isRequired,
    onDeleteGroup: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User callback: element deleted
   */
  onDelete = () => {
    const { entity, onDeleteCriterion, onDeleteGroup } = this.props
    if (CriteriaRowsHelper.isCriterion(entity)) {
      onDeleteCriterion(entity.groupIndex, entity.criterionIndex)
    } else {
      onDeleteGroup(entity.groupIndex)
    }
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        title={formatMessage({ id: 'search.results.form.configuration.search.pane.options.column.delete.tooltip' })}
        onClick={this.onDelete}
      >
        <DeleteIcon />
      </IconButton>
    )
  }
}
export default DeleteOptionComponent
