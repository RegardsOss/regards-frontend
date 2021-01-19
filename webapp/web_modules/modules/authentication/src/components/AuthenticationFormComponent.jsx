/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import trim from 'lodash/trim'
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import { formValueSelector } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import UnlockAccountIcon from 'mdi-material-ui/Lock'
import ResetPasswordIcon from 'mdi-material-ui/FileRestore'
import ProjectAccessIcon from 'mdi-material-ui/ClipboardAccount'
import { connect } from '@regardsoss/redux'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { PictureLinkComponent, FormErrorMessage } from '@regardsoss/components'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import {
  RenderTextField, Field, reduxForm, ValidationHelpers,
} from '@regardsoss/form-utils'

const mailFieldId = 'username'

/**
 * React components for login form
 */
export class AuthenticationFormComponent extends React.Component {
  static propTypes = {

    // initial mail value
    initialMail: PropTypes.string,
    // form title
    title: PropTypes.string.isRequired,
    // login request loading
    loading: PropTypes.bool.isRequired,
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
    // on login submit
    onLogin: PropTypes.func.isRequired,
    // Form general error
    errorMessage: PropTypes.string,
    // from reduxFormSelector
    currentMailValue: PropTypes.string,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  UNSAFE_componentWillMount() {
    const initialValues = {}
    initialValues[mailFieldId] = this.props.initialMail
    this.props.initialize(initialValues)
  }

  /** User callback: go to create account */
  onGotoCreateAccount = () => {
    const { onGotoCreateAccount, currentMailValue } = this.props
    onGotoCreateAccount(currentMailValue)
  }

  /** User callback: go to reset password */
  onGotoResetPassword = () => {
    const { onGotoResetPassword, currentMailValue } = this.props
    onGotoResetPassword(currentMailValue)
  }

  /** User callback: go to unlock account */
  onGotoUnlockAccount =() => {
    const { onGotoUnlockAccount, currentMailValue } = this.props
    onGotoUnlockAccount(currentMailValue)
  }

  render() {
    const {
      errorMessage, initialMail, loading, showAskProjectAccess,
      showCancel, onCancelAction, handleSubmit, onLogin,
    } = this.props
    const { moduleTheme } = this.context
    let cancelButtonElt
    if (showCancel) {
      cancelButtonElt = (
        <RaisedButton
          label={this.context.intl.formatMessage({ id: 'authentication.cancel' })}
          primary
          onClick={onCancelAction}
        />
      )
    }
    return (
      <div style={moduleTheme.layout}>
        <form
          className="selenium-authenticationForm"
          onSubmit={handleSubmit(onLogin)}
        >
          <Card>
            <CardTitle
              title={this.props.title}
              subtitle={this.context.intl.formatMessage({ id: 'authentication.message' })}
            />
            <CardText>
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
              <Field
                name={mailFieldId}
                value={initialMail}
                fullWidth
                component={RenderTextField}
                type="text"
                label={this.context.intl.formatMessage({ id: 'authentication.username' })}
                /**
                 * NOTE : User login is not necesserally an email.
                 * In case of authentication plugins like LDAP.
                */
                validate={ValidationHelpers.required}
                normalize={trim}
                disabled={this.props.submitting || this.props.loading}
              />
              <Field
                name="password"
                fullWidth
                component={RenderTextField}
                type="password"
                label={this.context.intl.formatMessage({ id: 'authentication.password' })}
                validate={ValidationHelpers.required}
                normalize={trim}
                disabled={this.props.submitting || this.props.loading}
              />
            </CardText>
            <CardActions style={moduleTheme.action}>
              <LoadableContentDisplayDecorator
                isLoading={loading}
              >
                <RaisedButton
                  disabled={this.props.submitting || this.props.invalid || this.props.loading}
                  label={this.context.intl.formatMessage({ id: 'authentication.button' })}
                  primary
                  type="submit"
                />
                {cancelButtonElt}
              </LoadableContentDisplayDecorator>

            </CardActions>
            <div style={moduleTheme.linksBar}>
              <PictureLinkComponent
                className="selenium-projectAccessButton"
                disabled={!showAskProjectAccess}
                IconComponent={ProjectAccessIcon}
                text={this.context.intl.formatMessage({ id: 'authentication.goto.ask.access' })}
                onAction={this.onGotoCreateAccount}
              />
              <PictureLinkComponent
                className="selenium-resetPasswordButton"
                IconComponent={ResetPasswordIcon}
                text={this.context.intl.formatMessage({ id: 'authentication.goto.reset.password' })}
                onAction={this.onGotoResetPassword}
              />
              <PictureLinkComponent
                className="selenium-unlockAccountButton"
                IconComponent={UnlockAccountIcon}
                text={this.context.intl.formatMessage({ id: 'authentication.goto.unlock.account' })}
                onAction={this.onGotoUnlockAccount}
              />
            </div>
          </Card>
        </form>
      </div>
    )
  }
}

// prepare redux form
const formId = 'authentication-form'
const connectedReduxForm = reduxForm({
  form: formId,
})(AuthenticationFormComponent)

// connect with selector to select the last mail value
const selector = formValueSelector(formId)
export default connect((state) => ({
  currentMailValue: selector(state, mailFieldId),
}))(connectedReduxForm)
