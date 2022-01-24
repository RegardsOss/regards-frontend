/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import noop from 'lodash/noop'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import MoveIcon from 'mdi-material-ui/Redo'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { DropDownButton } from '@regardsoss/components'
import SortLabelRender from './SortLabelRender'
import { getSortConfigId } from './SortUtils'
import NewSortingShape from './NewSortingShape'

/** wraps an icon button with its icon, to be used as drop down menu */
const IconButtonNoChild = (props) => (
  <IconButton {...props}>
    <MoveIcon />
  </IconButton>)

/**
 * Option to move a sort option within current sorting params
 * @author Léo Mieulet
 */
class MoveSortOption extends React.Component {
  static propTypes = {
    rowIndex: PropTypes.number.isRequired,
    currentSortings: PropTypes.arrayOf(PropTypes.oneOfType([UIShapes.SortingCriterion, NewSortingShape])).isRequired,
    // sortable attribute to retrieve labels
    sortableAttributes: UIShapes.SortableAttributes.isRequired,
    onMove: PropTypes.func.isRequired, // on move callback (oldIndex: number, newIndex: number) => ()
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * On position selected callback: propagate event to parent controller
   * @param {number} index new position index
   */
  onMove = (index) => {
    const { rowIndex, onMove } = this.props
    onMove(rowIndex, index)
  }

  /**
   * @return {[React.Element]} list of rendered available options
   */
  getAvailableMoveOptions = () => {
    const { currentSortings, rowIndex, sortableAttributes } = this.props
    const { intl: { locale, formatMessage } } = this.context

    return currentSortings.reduce((acc, sort, index) => {
      // 1 - compute label
      let label
      if (index === 0) {
        label = formatMessage({ id: 'search.results.configure.sorting.move.column.at.first.position' })
      } else {
        const thatSorting = currentSortings[index <= rowIndex ? index - 1 : index]
        const columnLabel = SortLabelRender.getLabel(getSortConfigId(thatSorting), sortableAttributes, { locale, formatMessage })
        label = formatMessage({ id: 'search.results.configure.sorting.move.column.after' }, { columnLabel })
      }
      // 2 - add menu item in options list
      return [
        ...acc,
        <MenuItem
          key={getSortConfigId(sort)}
          primaryText={label}
          value={index} // final index in list
          disabled={rowIndex === index}
        />,
      ]
    }, [])
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const options = this.getAvailableMoveOptions()
    return (
      <DropDownButton
        ButtonConstructor={IconButtonNoChild}
        getLabel={noop}
        title={formatMessage({ id: 'search.results.configure.sorting.move.tooltip' })}
        disabled={options.length <= 1}
        onChange={this.onMove}
        value={null}
      >
        {
          options
        }
      </DropDownButton>
    )
  }
}
export default MoveSortOption
