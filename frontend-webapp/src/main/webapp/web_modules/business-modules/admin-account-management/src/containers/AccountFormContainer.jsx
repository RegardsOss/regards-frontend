/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AdminShapes } from '@regardsoss/shape'
import AccountActions from '../model/AccountActions'
import AccountFormComponent from '../components/AccountFormComponent'
import AccountSelectors from '../model/AccountSelectors'
import messages from '../i18n'

export class AccountFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      account_id: PropTypes.string,
    }),
    // from mapStateToProps
    account: AdminShapes.Account,
    isFetching: PropTypes.bool,
    // from mapDispatchToProps
    fetchAccount: PropTypes.func,
    updateAccount: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchAccount(this.props.params.account_id)
  }

  getBackUrl = () => ('/admin/account/list')

  handleUpdate = (values) => {
    const updatedAccount = Object.assign({}, this.props.account.content, {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
    })
    Promise.resolve(this.props.updateAccount(this.props.account.content.id, updatedAccount))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
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
            backUrl={this.getBackUrl()}
            currentAccount={this.props.account}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  account: ownProps.params.account_id ? AccountSelectors.getById(state, ownProps.params.account_id) : null,
  isFetching: AccountSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  updateAccount: (id, values) => dispatch(AccountActions.updateEntity(id, values)),
  fetchAccount: accountId => dispatch(AccountActions.fetchEntity(accountId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountFormContainer)
