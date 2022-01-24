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
import { connect } from '@regardsoss/redux'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { authenticationDialogSelectors, authenticationDialogActions } from '../clients/AuthenticationDialogUIClient'
import messages from '../i18n'

/**
 * Authentication container for user application
 */
class AuthenticationContainer extends React.Component {
  static propTypes = {
    scope: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    // Set by mapStateToProps
    authDialogOpened: PropTypes.bool.isRequired,
    // Set by mapDispatchToProps
    toggleAuthenticationDialog: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  onCloseDialog = () => {
    this.props.toggleAuthenticationDialog(false)
  }

  render() {
    const {
      scope, authDialogOpened, children,
    } = this.props
    const { intl: { formatMessage } } = this.context
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    const module = { // eslint wont fix: login title can only be resolved using context (accurate only in render)
      type: modulesManager.AllDynamicModuleTypes.AUTHENTICATION,
      active: true,
      conf: {
        showLoginWindow: authDialogOpened,
        showCancel: true,
        showAskProjectAccess: true,
        loginTitle: formatMessage({ id: 'authentication.dialog.title' }, { project: scope }),
        onCancelAction: this.onCloseDialog,
      },
    }
    return (
      <div>
        <LazyModuleComponent
          module={module}
          appName="user"
          project={scope}
        />
        {children}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  authDialogOpened: authenticationDialogSelectors.isAuthDialogOpen(state),
})

const mapDispatchToProps = (dispatch) => ({
  toggleAuthenticationDialog: (show) => dispatch(authenticationDialogActions.toggleDialogDisplay(show)),
})

export default withI18n(messages)(connect(mapStateToProps, mapDispatchToProps)(AuthenticationContainer))
