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
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'mdi-material-ui/Delete'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Option to remove a selected collection level
 * @author Raphaël Mechali
 */
class RemoveLevelOption extends React.Component {
  static propTypes = {
    // from table cell API, mentionned here only to be excluded from children properties
    rowIndex: PropTypes.number,
    // callback: (rowIndex:number) => ()
    onDelete: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User callback: delete option was clicked
   */
  onDeleteClicked = () => {
    const { rowIndex, onDelete } = this.props
    onDelete(rowIndex)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        title={formatMessage({ id: 'search.graph.selected.levels.column.options.remove.tooltip' })}
        onClick={this.onDeleteClicked}
      >
        <DeleteIcon />
      </IconButton>)
  }
}
export default RemoveLevelOption
