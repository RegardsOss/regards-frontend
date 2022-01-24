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

import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Shows no data message in table (mainly used when infinite table are placed in forms)
 * @author Raphaël Mechali
 */
class TableNoDataMessage extends React.Component {
  static propTypes = {
    // key of the no data message to internationalize
    messageKey: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { messageKey } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context
    return (
      <div style={moduleTheme.noDataMessage}>
        {formatMessage({ id: messageKey })}
      </div>
    )
  }
}
export default TableNoDataMessage
