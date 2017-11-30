/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import keys from 'lodash/keys'
import omit from 'lodash/omit'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import { i18nContextType } from '@regardsoss/i18n'


/**
* Table delete option: deletes then fetches data
* @author Raphaël Mechali
*/
class TableDeleteOption extends React.Component {
  static propTypes = {
    // from table cell API, mentionned here only to be excluded from children properties
    rowIndex: PropTypes.number,
    // Entity. Note: when used in options column, this is provided by the table cell API
    // eslint-disable-next-line react/forbid-prop-types
    entity: PropTypes.object.isRequired,
    fetchPage: PropTypes.func.isRequired, // fetch method: (pageIndex, pageSize) => Promise
    onDelete: PropTypes.func.isRequired, // delete method (entity, onDone) => ()
    queryPageSize: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User called delete, propagate to caller
   */
  onDelete = () => {
    const { entity, onDelete } = this.props
    onDelete(entity, this.onDeleteDone)
  }

  /**
   * Delete has been performed, finish table refreshing
   */
  onDeleteDone = () => {
    const { rowIndex, fetchPage, queryPageSize } = this.props
    const pageIndex = Math.floor(rowIndex / queryPageSize)
    fetchPage(pageIndex, queryPageSize)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        title={formatMessage({ id: 'table.delete.option.tooltip' })}
        onTouchTap={this.onDelete}
        {...omit(this.props, keys(TableDeleteOption.propTypes))}
      >
        <DeleteIcon />
      </IconButton>
    )
  }
}

export default TableDeleteOption
