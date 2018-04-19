/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
import get from 'lodash/get'
import trim from 'lodash/trim'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, Field, ErrorTypes, reduxForm, ValidationHelpers } from '@regardsoss/form-utils'

/**
 * Reset password request form component
 */
export class ChangePasswordFormComponent extends React.Component {
  static propTypes = {
    passwordRules: PropTypes.string.isRequired, // fetched password rules description
    // calls update password action or shows token expired message
    onChangePassword: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchPasswordValidity: PropTypes.func.isRequired,
    // from reduxForm
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
  }

  static contextTypes = { ...themeContextType, ...i18nContextType }

  /**
   * Render function
   * @returns {React.Component} components
   */
  render() {
    const {
      passwordRules, onChangePassword, pristine, submitting, invalid, handleSubmit,
    } = this.props
    const { moduleTheme, intl: { formatMessage } } = this.context

    return (
      <div style={moduleTheme.layout}>
        <form
          onSubmit={handleSubmit(onChangePassword)}
        >
          <Card>
            <CardTitle
              title={formatMessage({ id: 'reset.password.update.request.title' })}
              subtitle={formatMessage({ id: 'reset.password.update.request.message' }, { passwordRules })}
            />
            <CardText>
              <Field
                name="newPassword"
                fullWidth
                component={RenderTextField}
                type="password"
                label={formatMessage({ id: 'reset.password.update.new.password' })}
                validate={ValidationHelpers.required}
                normalize={trim}
              />
              <Field
                name="confirmPassword"
                fullWidth
                component={RenderTextField}
                type="password"
                label={formatMessage({ id: 'reset.password.update.confirm.password' })}
                validate={ValidationHelpers.required}
                normalize={trim}
              />
            </CardText>
            <CardActions style={moduleTheme.action}>
              <RaisedButton
                disabled={submitting || invalid || pristine}
                label={formatMessage({ id: 'reset.password.update.send' })}
                primary
                type="submit"
              />
            </CardActions>
          </Card>
        </form>
      </div>
    )
  }
}


function validate(values) {
  const errors = {}
  if (values.confirmPassword && values.newPassword && values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = ErrorTypes.DIFFERENT_PASSWORDS
  }
  return errors
}

/**
 * Asynchronous password validation (the server computes validity)
 * @param {*} values form values
 * @param {*} dispatch  dispatch
 * @param {*} props  properties
 */
function asyncValidate({ newPassword }, dispatch, props) {
  // ugly async connection should be done by the container bu we can't
  const { fetchPasswordValidity } = props
  return fetchPasswordValidity(newPassword).then((result) => {
    const validity = get(result, 'payload.validity', false)
    const errors = {}
    if (!validity) { // invalid password
      errors.newPassword = ErrorTypes.INVALID_PASSWORD
    }
    return errors
  })
}

export const formId = 'reset-password-update'
export default reduxForm({
  form: formId,
  validate,
  asyncValidate,
  asyncBlurFields: ['newPassword'],
})(ChangePasswordFormComponent)
