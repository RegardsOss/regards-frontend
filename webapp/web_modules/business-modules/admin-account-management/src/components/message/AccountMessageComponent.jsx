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
import size from 'lodash/size'
import FilterIcon from 'mdi-material-ui/Filter'
import IconButton from 'material-ui/IconButton'
import { AdminInstanceDomain } from '@regardsoss/domain'
import { AdminInstanceShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { HelpMessageComponent } from '@regardsoss/components'
import ACCOUNT_FILTERS from '../../domain/accountFilters'

/**
 * AccountMessageComponent
 * @author Théo Lasserre
 */
class AccountMessageComponent extends React.Component {
  static propTypes = {
    waitingAccounts: PropTypes.objectOf(AdminInstanceShapes.Account),
    updateFilter: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      waitingAccounts, updateFilter,
    } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        accounts: {
          messagesDiv, waitingAccountsDiv, waitingAccountsMessage,
        },
      },
    } = this.context
    return (
      <div style={messagesDiv}>
        <HelpMessageComponent
          message={formatMessage({ id: 'account.list.info.why-cant-remove-account-having-project-user' })}
        />
        <div style={waitingAccountsDiv}>
          <div style={waitingAccountsMessage}>
            {formatMessage({ id: 'account.list.info.nb.waiting.accounts' }, { value: size(waitingAccounts) || 0 })}
          </div>
          <IconButton
            onClick={() => updateFilter(AdminInstanceDomain.ACCOUNT_STATUS_ENUM.PENDING, ACCOUNT_FILTERS.STATUS)}
            title={formatMessage({ id: 'account.list.info.nb.waiting.accounts.filter' })}
          >
            <FilterIcon />
          </IconButton>
        </div>
      </div>
    )
  }
}
export default AccountMessageComponent
