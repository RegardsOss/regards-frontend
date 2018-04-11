/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import TableHeaderText from './TableHeaderText'

/**
* Results count adaptative message
* @author Raphaël Mechali
*/
class ResultsCountMessage extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { count, isFetching } = this.props
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
        message = formatMessage({ id: 'table.results.count' }, { count })
    }
    return <TableHeaderText text={message} />
  }
}
export default ResultsCountMessage
