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
import {
  Card, CardText,
} from 'material-ui/Card'
import { AdminInstanceShapes, AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  TableFilterSortingAndVisibilityContainer,
  HelpMessageComponent, CardHeaderActions,
} from '@regardsoss/components'
import { accountActions, accountSelectors } from '../clients/AccountClient'
import AccountFiltersComponent from './filters/AccountFiltersComponent'
import AccountTableListComponent from './AccountTableListComponent'

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
    } = this.props
    const { isPaneOpened } = this.state
    const {
      intl: { formatMessage }, moduleTheme: {
        accounts: {
          filterButtonStyle, messageStyle,
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
              waitingAccounts={waitingAccounts}
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
