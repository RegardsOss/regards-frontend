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
import { AdminInstanceDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { StringValueRender } from '@regardsoss/components'

/**
 * Renders user status
 * @author Théo Lasserre
 */
class StatusRenderComponent extends React.Component {
  static propTypes = {
    value: PropTypes.oneOf(AdminInstanceDomain.ACCOUNT_STATUS).isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { value } = this.props
    const { intl: { formatMessage } } = this.context
    return <StringValueRender value={formatMessage({ id: `account.list.table.status.${value}` })} />
  }
}
export default StatusRenderComponent
