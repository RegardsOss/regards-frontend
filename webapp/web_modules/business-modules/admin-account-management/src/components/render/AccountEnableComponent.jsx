/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import EnabledAccountIcon from 'mdi-material-ui/AccountConvert'

/**
 * @author Théo Lasserre
 */
class AccountEnableComponent extends React.Component {
  static propTypes = {
    entity: AdminInstanceShapes.Account,
    onEnable: PropTypes.func.isRequired,
    isFetchingActions: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  onEnable = () => {
    const { entity, onEnable } = this.props
    onEnable(entity.content.email)
  }

  /**
   * @return {boolean} true if administrator can enabled this account
   */
  canEnableAccount = (account) => AdminInstanceDomain.ACCOUNT_STATUS_ENUM.INACTIVE === account.content.status

  render() {
    const { entity, isFetchingActions } = this.props
    const { intl: { formatMessage }, muiTheme: { palette } } = this.context
    return (
      <HateoasIconAction
        className="selenium-enableButton"
        title={formatMessage({ id: 'account.list.table.action.enable.tooltip' })}
        onClick={this.onEnable}
        disabled={isFetchingActions || !this.canEnableAccount(entity)}
        entityLinks={entity.links}
        hateoasKey={HateoasKeys.ACTIVE}
        alwaysDisplayforInstanceUser={false}
      >
        <EnabledAccountIcon hoverColor={palette.primary1Color} />
      </HateoasIconAction>
    )
  }
}
export default AccountEnableComponent
