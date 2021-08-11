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
import DeleteAccountIcon from 'mdi-material-ui/Delete'

/**
 * AccountDeleteComponent
 * @author Théo Lasserre
 */
class AccountDeleteComponent extends React.Component {
  static propTypes = {
    entity: AdminInstanceShapes.Account,
    onOpenDeleteDialog: PropTypes.func.isRequired,
    isFetchingActions: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * @return {boolean} true if administrator can refuse this account
   */
  canRefuseAccount = (account) => AdminInstanceDomain.ACCOUNT_STATUS_ENUM.PENDING === account.content.status

  render() {
    const { entity, onOpenDeleteDialog, isFetchingActions } = this.props
    const { intl: { formatMessage }, muiTheme: { palette } } = this.context
    return (
      <HateoasIconAction
        className="selenium-deleteButton"
        title={formatMessage({ id: 'account.list.table.action.delete.tooltip' })}
        onClick={() => onOpenDeleteDialog(entity)}
        disabled={isFetchingActions}
        entityLinks={entity.links}
        hateoasKey={HateoasKeys.DELETE}
        alwaysDisplayforInstanceUser={false}
      >
        <DeleteAccountIcon hoverColor={palette.accent1Color} />
      </HateoasIconAction>
    )
  }
}
export default AccountDeleteComponent