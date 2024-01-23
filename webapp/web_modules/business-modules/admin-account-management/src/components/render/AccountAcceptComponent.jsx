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

import { HateoasIconAction } from '@regardsoss/components'
import { AdminInstanceShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { AdminInstanceDomain } from '@regardsoss/domain'
import { HateoasKeys } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import ValidateAccountIcon from 'mdi-material-ui/AccountCheck'

/**
 * @author Théo Lasserre
 */
class AccountAcceptComponent extends React.Component {
  static propTypes = {
    entity: AdminInstanceShapes.Account,
    onAccept: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * @return {boolean} true if administrator can accept this account
   */
  static canAcceptAccount(account) {
    return AdminInstanceDomain.ACCOUNT_STATUS_ENUM.PENDING === account.content.status
  }

  onAccept = () => {
    const { entity, onAccept } = this.props
    onAccept(entity.content.email)
  }

  render() {
    const { entity } = this.props
    const { intl: { formatMessage }, muiTheme: { palette } } = this.context
    return (
      <HateoasIconAction
        title={formatMessage({ id: 'account.list.table.action.accept.tooltip' })}
        onClick={this.onAccept}
        disabled={!AccountAcceptComponent.canAcceptAccount(entity)}
        entityLinks={entity.links}
        hateoasKey={HateoasKeys.ACCEPT}
        alwaysDisplayforInstanceUser={false}
      >
        <ValidateAccountIcon hoverColor={palette.primary1Color} />
      </HateoasIconAction>
    )
  }
}
export default AccountAcceptComponent
