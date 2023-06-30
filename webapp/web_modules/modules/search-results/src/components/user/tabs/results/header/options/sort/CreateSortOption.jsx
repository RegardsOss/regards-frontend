/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import CreateIcon from 'mdi-material-ui/Plus'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { DropDownButton } from '@regardsoss/components'
import { isNewSortConfig } from './SortUtils'
import NewSortingShape from './NewSortingShape'

/** wraps an icon button with its icon, to be used as drop down menu */
const IconButtonNoChild = (props) => (
  <IconButton {...props}>
    <CreateIcon />
  </IconButton>)

/**
 * Option to create a new sort config within current sortings
 * @author Léo Mieulet
 */
class CreateSortOption extends React.Component {
  static propTypes = {
    rowIndex: PropTypes.number.isRequired,
    onCreate: PropTypes.func.isRequired, // on create callback (newIndex: number) => ()
    // current sort config
    currentSortings: PropTypes.arrayOf(PropTypes.oneOfType([UIShapes.SortingCriterion, NewSortingShape])).isRequired,
    // Max number of sortable attributes
    maxAttributes: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * On position selected callback: propagate event to parent controller
   * @param {number} index new position index
   */
  onCreate = (index) => {
    const { onCreate } = this.props
    onCreate(index)
  }

  /**
   * @returns true when there is already a new created sortConfig
   * Or all available attributes are already defined
   */
  isDisabled = () => {
    const { currentSortings, maxAttributes } = this.props
    return !!find(currentSortings, (currentSorting) => isNewSortConfig(currentSorting))
      || maxAttributes === currentSortings.length
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { rowIndex } = this.props
    return (
      <DropDownButton
        ButtonConstructor={IconButtonNoChild}
        getLabel={noop}
        title={formatMessage({ id: 'search.results.configure.sorting.create.tooltip' })}
        onChange={this.onCreate}
        value={null}
        disabled={this.isDisabled()}
      >
        <MenuItem
          primaryText={formatMessage({ id: 'search.results.configure.sorting.create.before.position' })}
          value={rowIndex}
        />
        <MenuItem
          primaryText={formatMessage({ id: 'search.results.configure.sorting.create.after.position' })}
          value={rowIndex + 1}
        />
      </DropDownButton>
    )
  }
}
export default CreateSortOption
