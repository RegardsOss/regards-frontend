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
import isNil from 'lodash/isNil'
import { i18nContextType } from '@regardsoss/i18n'
import TableHeaderText from './TableHeaderText'

/**
 * Results count message.
 *
 * @author Raphaël Mechali
 */
class TableHeaderResultsCountMessage extends React.Component {
  static propTypes = {
    loadedResultsCount: PropTypes.number, // when not provided, shows only total
    count: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { loadedResultsCount, count, isFetching } = this.props
    const { intl: { formatMessage } } = this.context
    if (isFetching && !count) {
      // hide while fetching and result information is unknown
      return null
    }
    let message
    switch (count) {
      case 0:
        message = formatMessage({ id: 'table.results.no.data' })
        break
      case 1:
        message = formatMessage({ id: 'table.results.one.element' })
        break
      default:
        message = formatMessage({
          id: isNil(loadedResultsCount) ? 'table.results.count' : 'table.results.count.with.loaded',
        }, { count, loadedResultsCount })
    }
    return <TableHeaderText text={message} />
  }
}
export default TableHeaderResultsCountMessage
