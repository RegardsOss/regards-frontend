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
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'mdi-material-ui/DeleteForever'
import NewSortingShape from './NewSortingShape'

/**
 * Renders sort delete button in the table
 * @author Léo Mieulet
 */
class SortDeleteRender extends React.Component {
  static propTypes = {
    entity: PropTypes.oneOfType([UIShapes.SortingCriterion, NewSortingShape]).isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onDelete = () => {
    const { onDelete, entity } = this.props
    onDelete(entity)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        onClick={this.onToggleSortOrder}
        title={formatMessage({
          id: 'search.results.configure.sorting.delete.title',
        })}
      >
        <DeleteIcon />
      </IconButton>
    )
  }
}
export default SortDeleteRender
