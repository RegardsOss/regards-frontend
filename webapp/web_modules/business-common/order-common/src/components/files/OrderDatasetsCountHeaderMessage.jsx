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
import { TableHeaderText } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Datasets files count display message for order dataset files list header
 * @author Raphaël Mechali
 */
class OrderDatasetsCountHeaderMessage extends React.Component {
  static propTypes = {
    totalFilesCount: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { totalFilesCount } = this.props
    const { intl: { formatMessage } } = this.context
    // compute message to show (no data / count)
    const message = totalFilesCount
      ? formatMessage({ id: 'files.list.files.header.message' }, { count: totalFilesCount })
      : formatMessage({ id: 'files.list.no.file.header.message' })
    return (
      <TableHeaderText text={message} />
    )
  }
}
export default OrderDatasetsCountHeaderMessage
