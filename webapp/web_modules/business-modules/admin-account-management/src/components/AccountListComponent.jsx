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
import size from 'lodash/size'
import {
  Card, CardText,
} from 'material-ui/Card'
import FilterIcon from 'mdi-material-ui/Filter'
import IconButton from 'material-ui/IconButton'
import { AdminInstanceShapes, AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  TableFilterSortingAndVisibilityContainer,
  HelpMessageComponent, CardHeaderActions,
  FiltersChipsContainer,
} from '@regardsoss/components'
import { filtersActions, filtersSelectors } from '../clients/FiltersClient'
import { accountActions, accountSelectors } from '../clients/AccountClient'
import AccountFiltersComponent from './filters/AccountFiltersComponent'
import AccountTableListComponent from './AccountTableListComponent'
import { FILTERS_I18N } from '../domain/filters'

/**
 * React component to list all REGARDS account.
 */
export class AccountListComponent extends React.Component {
  static propTypes = {
    allAccounts: PropTypes.objectOf(AdminInstanceShapes.Account),
    waitingAccounts: PropTypes.objectOf(AdminInstanceShapes.Account),
    isFetching: PropTypes.bool.isRequired,
    onAccept: PropTypes.func.isRequired,
    onRefuse: PropTypes.func.isRequired,
    onEnable: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    isFetchingActions: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired,
    origins: PropTypes.arrayOf(PropTypes.string),
    projects: AdminShapes.ProjectList.isRequired,
    onFilterWaitingAccount: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    currentRequestParameters: {},
    isPaneOpened: false,
  }

  onRefresh = () => {
    const { onRefresh } = this.props
    const { currentRequestParameters } = this.state
    onRefresh(currentRequestParameters)
  }

  handleFiltersPane = () => {
    const { isPaneOpened } = this.state
    this.setState({
      isPaneOpened: !isPaneOpened,
    })
  }

  updateRefreshParameters = (requestParameters) => {
    this.setState({
      currentRequestParameters: requestParameters,
    })
  }

  render() {
    const {
      isFetchingActions,
      onBack, onEdit, onAccept, onEnable, isFetching, onRefuse,
      waitingAccounts, allAccounts, onDelete, origins, projects,
      onFilterWaitingAccount,
    } = this.props
    const { isPaneOpened } = this.state
    const {
      intl: { formatMessage }, moduleTheme: {
        accounts: {
          filterButtonStyle, messageStyle, filterIconStyle, waitingAccountsMessage,
        },
      },
    } = this.context

    return (
      <Card>
        <CardHeaderActions
          title={formatMessage({ id: 'accounts.title' })}
          subtitle={formatMessage({ id: 'accounts.subtitle' })}
          mainButtonLabel={formatMessage({ id: 'account.list.refresh' })}
          mainButtonType="submit"
          mainButtonClick={this.onRefresh}
          secondaryButtonLabel={formatMessage({ id: 'account.list.action.filter' })}
          secondaryButtonClick={this.handleFiltersPane}
          secondaryButtonStyle={filterButtonStyle}
          thirdButtonLabel={formatMessage({ id: 'account.list.action.cancel' })}
          thirdButtonClick={onBack}
          useAlternateStyle
        />
        <CardText>
          <FiltersChipsContainer
            filtersActions={filtersActions}
            filtersSelectors={filtersSelectors}
            filtersI18n={FILTERS_I18N}
          />
          <div style={waitingAccountsMessage}>
            <IconButton
              onClick={onFilterWaitingAccount}
              title={formatMessage({ id: 'account.list.info.nb.waiting.accounts.filter' })}
              style={filterIconStyle}
            >
              <FilterIcon />
            </IconButton>
            {formatMessage({ id: 'account.list.info.nb.waiting.accounts' }, { value: size(waitingAccounts) || 0 })}
          </div>
          <div style={messageStyle}>
            <HelpMessageComponent
              message={formatMessage({ id: 'account.list.info.why-cant-remove-account-having-project-user' })}
            />
          </div>
          <TableFilterSortingAndVisibilityContainer
            pageActions={accountActions}
            pageSelectors={accountSelectors}
            onAccept={onAccept}
            onRefuse={onRefuse}
            onEnable={onEnable}
            onDelete={onDelete}
            updateRefreshParameters={this.updateRefreshParameters}
          >
            <AccountFiltersComponent
              key={TableFilterSortingAndVisibilityContainer.COMPONENT_TYPE.FILTER}
              isPaneOpened={isPaneOpened}
              onCloseFiltersPane={this.handleFiltersPane}
              origins={origins}
              projects={projects}
              filtersActions={filtersActions}
              filtersSelectors={filtersSelectors}
            />
            <AccountTableListComponent
              key={TableFilterSortingAndVisibilityContainer.COMPONENT_TYPE.COMPONENT}
              allAccounts={allAccounts}
              isFetchingActions={isFetchingActions}
              isFetching={isFetching}
              onEdit={onEdit}
            />
          </TableFilterSortingAndVisibilityContainer>
        </CardText>
      </Card>
    )
  }
}

export default AccountListComponent
