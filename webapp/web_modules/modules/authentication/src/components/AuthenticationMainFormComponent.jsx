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
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { CommonShapes } from '@regardsoss/shape'
import AuthenticationFormComponent from './AuthenticationFormComponent'
import MainAuthenticationServiceFormComponent from './MainAuthenticationServiceFormComponent'

const SELECTED_FORM_TYPE = {
  DEFAULT: 'DEFAULT',
  SELECTED_SERVICE: 'SELECTED_SERVICE',
}

/**
 * Main form component used to switch between 'classic' regards authentication form & specific service provider authentication form
 * @author Théo Lasserre
 */
class AuthenticationMainFormComponent extends React.Component {
  static propTypes = {
    // form title
    title: PropTypes.string.isRequired,
    // on login submit
    onLogin: PropTypes.func.isRequired,
    // login request loading
    loading: PropTypes.bool.isRequired,
    // initial mail value
    initialMail: PropTypes.string,
    // Form general error
    errorMessage: PropTypes.string,
    // show create account link?
    showAskProjectAccess: PropTypes.bool.isRequired,
    // show cancel button?
    showCancel: PropTypes.bool.isRequired,
    // on cancel button callback, or none if behavior not available
    onCancelAction: PropTypes.func,
    // other authentication forms links
    onGotoCreateAccount: PropTypes.func.isRequired,
    onGotoResetPassword: PropTypes.func.isRequired,
    onGotoUnlockAccount: PropTypes.func.isRequired,
    // service provider list
    serviceProviderList: CommonShapes.ServiceProviderList.isRequired,
    // selected main service provider to be used in priority by users
    selectedMainServiceId: PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    selectedFormType: SELECTED_FORM_TYPE.DEFAULT,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { selectedMainServiceId } = newProps
    if (!isEqual(oldProps.selectedMainServiceId, selectedMainServiceId) && !isEmpty(selectedMainServiceId)) {
      this.setState({
        selectedFormType: SELECTED_FORM_TYPE.SELECTED_SERVICE,
      })
    }
  }

  /**
   * Enable to switch to default form
   */
  setDefaultForm = () => {
    this.setState({
      selectedFormType: SELECTED_FORM_TYPE.DEFAULT,
    })
  }

  /**
   * Enable to switch to main service provider form
   */
  setSelectedServiceForm = () => {
    this.setState({
      selectedFormType: SELECTED_FORM_TYPE.SELECTED_SERVICE,
    })
  }

  /**
   * Render authentication form depending on selected form type
   */
  renderForm = () => {
    const {
      title, onLogin, loading, initialMail, errorMessage, showAskProjectAccess, showCancel,
      onCancelAction, onGotoCreateAccount, onGotoResetPassword, onGotoUnlockAccount, serviceProviderList,
      selectedMainServiceId,
    } = this.props
    const { selectedFormType } = this.state
    switch (selectedFormType) {
      case SELECTED_FORM_TYPE.DEFAULT:
        return (
          <AuthenticationFormComponent
            title={title}
            onLogin={onLogin}
            loading={loading}
            initialMail={initialMail}
            errorMessage={errorMessage}
            showAskProjectAccess={showAskProjectAccess}
            showCancel={showCancel}
            onCancelAction={onCancelAction}
            onGotoCreateAccount={onGotoCreateAccount}
            onGotoResetPassword={onGotoResetPassword}
            onGotoUnlockAccount={onGotoUnlockAccount}
            serviceProviderList={serviceProviderList}
            selectedMainServiceId={selectedMainServiceId}
            setSelectedServiceForm={this.setSelectedServiceForm}
          />
        )
      case SELECTED_FORM_TYPE.SELECTED_SERVICE:
        return (
          <MainAuthenticationServiceFormComponent
            title={title}
            selectedMainServiceId={selectedMainServiceId}
            setDefaultForm={this.setDefaultForm}
            serviceProviderList={serviceProviderList}
            showCancel={showCancel}
            onCancelAction={onCancelAction}
          />
        )
      default:
    }
    return null
  }

  render() {
    return (
      this.renderForm()
    )
  }
}
export default AuthenticationMainFormComponent
