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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { I18nProvider } from '@regardsoss/i18n'
import { AdminInstanceShapes } from '@regardsoss/shape'
import { accountActions, accountSelectors } from '../clients/AccountClient'
import AccountFormComponent from '../components/AccountFormComponent'
import messages from '../i18n'

export class AccountFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      account_id: PropTypes.string,
    }),
    // from mapStateToProps
    account: AdminInstanceShapes.Account,
    isFetching: PropTypes.bool,
    // from mapDispatchToProps
    fetchAccount: PropTypes.func,
    updateAccount: PropTypes.func,
  }

  static getBackUrl() {
    return ('/admin/accounts/management/list')
  }

  componentDidMount() {
    this.props.fetchAccount(this.props.params.account_id)
  }

  handleUpdate = (values) => {
    const updatedAccount = {
      ...this.props.account.content,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
    }
    Promise.resolve(this.props.updateAccount(this.props.account.content.id, updatedAccount))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = AccountFormContainer.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  render() {
    const { account, isFetching } = this.props

    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isFetching}
          isEmpty={!account}
        >
          <AccountFormComponent
            onSubmit={this.handleUpdate}
            backUrl={AccountFormContainer.getBackUrl()}
            currentAccount={this.props.account}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  account: ownProps.params.account_id ? accountSelectors.getById(state, ownProps.params.account_id) : null,
  isFetching: accountSelectors.isFetching(state),
})

const mapDispatchToProps = (dispatch) => ({
  updateAccount: (id, values) => dispatch(accountActions.updateEntity(id, values)),
  fetchAccount: (accountId) => dispatch(accountActions.fetchEntity(accountId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountFormContainer)
