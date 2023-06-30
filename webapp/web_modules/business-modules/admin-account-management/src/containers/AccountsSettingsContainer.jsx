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
import keys from 'lodash/keys'
import find from 'lodash/find'
import map from 'lodash/map'
import isEqual from 'lodash/isEqual'
import { browserHistory } from 'react-router'
import { CommonShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import AccountsSettingsComponent from '../components/AccountsSettingsComponent'
import { accountSettingsActions, accountSettingsSelectors, updateSettingActions } from '../clients/AccountSettingsClient'
import messages from '../i18n'
import styles from '../styles'

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
      settings: accountSettingsSelectors.getList(state),
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
      fetchSettings: () => dispatch(accountSettingsActions.fetchEntityList()),
      updateSettings: (settingName, settingValue) => dispatch(updateSettingActions.updateSetting(settingName, settingValue)),
      flushSettings: () => dispatch(accountSettingsActions.flush()),
    }
  }

  static propTypes = {
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    settings: CommonShapes.SettingsList,
    hasError: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchSettings: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    flushSettings: PropTypes.func.isRequired,
  }

  state = {
    isLoading: true,
    settings: null,
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
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  componentWillUnmount = () => {
    const { flushSettings } = this.props
    flushSettings()
  }

  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      settings,
    } = newProps

    const oldState = this.state || {}
    const newState = { ...oldState }
    if (!isEqual(oldProps.settings, settings)) {
      newState.settings = settings
    }
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
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
    const { updateSettings } = this.props
    const tasks = map(keys(values), (key) => updateSettings(key, values[key]))
    Promise.all(tasks)
      .then((actionResults) => {
        if (!find(actionResults, (actionResult) => actionResult.error)) {
          this.onBack()
        }
      })
  }

  render() {
    const { isLoading, settings } = this.state
    const { hasError } = this.props
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
          <LoadableContentDisplayDecorator
            isLoading={isLoading}
            isContentError={hasError}
          >
            <AccountsSettingsComponent
              settings={settings}
              onBack={this.onBack}
              onSubmit={this.onSubmit}
            />
          </LoadableContentDisplayDecorator>
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}
export default connect(
  AccountsSettingsContainer.mapStateToProps,
  AccountsSettingsContainer.mapDispatchToProps)(AccountsSettingsContainer)
