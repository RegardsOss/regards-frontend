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
import get from 'lodash/get'
import { browserHistory } from 'react-router'
import { AdminInstanceShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import AccountsSettingsComponent from '../components/AccountsSettingsComponent'
import { accountSettingsActions, accountSettingsSelectors } from '../clients/AccountSettingsClient'
import messages from '../i18n'

/**
 * Accounts settings form container
 * @author Raphaël Mechali
 */
export class AccountsSettingsContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      settings: accountSettingsSelectors.getResult(state),
      hasError: accountSettingsSelectors.hasError(state),
    }
  }

  /**
 * Redux: map dispatch to props function
 * @param {*} dispatch: redux dispatch function
 * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
 * @return {*} list of actions ready to be dispatched in the redux store
 */
  static mapDispatchToProps(dispatch) {
    return {
      fetchSettings: () => dispatch(accountSettingsActions.getSettings()),
      updateSettings: (accountSettings) => dispatch(accountSettingsActions.updateSettings(accountSettings)),
    }
  }

  static propTypes = {
    // from mapStateToProps
    settings: AdminInstanceShapes.AccountSettingsWithContent,
    hasError: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchSettings: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
  }

  state = {
    isLoading: true,
  }

  /**
   * Lifecycle method component did mount, used here to start loading server data
   */
  componentDidMount() {
    const { fetchSettings } = this.props
    fetchSettings()
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  /**
   * On back button clicked callback
   */
  onBack = () => {
    browserHistory.push('/admin/accounts/board')
  }

  /**
   * On submit callback
   * @param {*} values edited settrings values
   */
  onSubmit = (values) => {
    const { updateSettings, settings } = this.props
    updateSettings({
      // merge current settings info and edited value
      ...settings.content,
      ...values,
    }).then((result) => {
      if (!result.error) { // show back when saved sucessfully
        this.onBack()
      }
    })
  }

  render() {
    const { isLoading } = this.state
    const { hasError, settings } = this.props
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
          isContentError={hasError}
          isEmpty={!settings}
        >
          <AccountsSettingsComponent
            settings={get(settings, 'content', null)}
            onBack={this.onBack}
            onSubmit={this.onSubmit}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
export default connect(
  AccountsSettingsContainer.mapStateToProps,
  AccountsSettingsContainer.mapDispatchToProps)(AccountsSettingsContainer)
