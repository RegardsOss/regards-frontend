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
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CommonDomain } from '@regardsoss/domain'
import IconButton from 'material-ui/IconButton'
import AscIcon from 'mdi-material-ui/SortAscending'
import DescIcon from 'mdi-material-ui/SortDescending'
import NewSortingShape from './NewSortingShape'

/**
 * Renders sort order in the table
 * @author Léo Mieulet
 */
class SortOrderRender extends React.Component {
  static propTypes = {
    entity: PropTypes.oneOfType([UIShapes.SortingCriterion, NewSortingShape]).isRequired,
    onChangeSortOrder: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  isAscending = () => {
    const { entity: { sortOrder } } = this.props
    return sortOrder === CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER
  }

  onToggleSortOrder = () => {
    const { entity } = this.props
    const newOrder = this.isAscending() ? CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER : CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER
    this.props.onChangeSortOrder(entity, newOrder)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        onClick={this.onToggleSortOrder}
        title={formatMessage({
          id: this.isAscending()
            ? 'search.results.configure.sorting.asc.title'
            : 'search.results.configure.sorting.desc.title',
        })}
      >
        {this.isAscending()
          ? <AscIcon />
          : <DescIcon />}
      </IconButton>
    )
  }
}
export default SortOrderRender
