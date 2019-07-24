/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { FormErrorMessage } from '@regardsoss/components'
import {
  RenderTextField, Field, reduxForm, ValidationHelpers,
} from '@regardsoss/form-utils'

/**
 * Session management component : if session is locked, shows unlock screen, renders children otherwise
 */
export class SessionLockedFormComponent extends React.Component {
  static propTypes = {
    // on submit unlock
    onUnlock: PropTypes.func.isRequired,
    // Form general error
    hasUnlockingError: PropTypes.bool,
    // from reduxForm
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Render function
   * @returns {React.Component} components
   */
  render() {
    const { hasUnlockingError, handleSubmit, onUnlock } = this.props
    const { intl } = this.context
    const { moduleTheme } = this.context
    return (
      <div style={moduleTheme.layout}>
        <form onSubmit={handleSubmit(onUnlock)}>
          <Card>
            <CardTitle
              title={this.context.intl.formatMessage({ id: 'session.locked.title' })}
              subtitle={this.context.intl.formatMessage({ id: 'session.locked.subtitle' })}
            />
            <CardText>
              <FormErrorMessage>{hasUnlockingError ? intl.formatMessage({ id: 'session.locked.error' }) : ''}</FormErrorMessage>
              <Field
                name="password"
                fullWidth
                component={RenderTextField}
                type="password"
                label={this.context.intl.formatMessage({ id: 'session.locked.password' })}
                validate={ValidationHelpers.required}
                normalize={trim}
              />
            </CardText>
            <CardActions style={moduleTheme.action}>
              <RaisedButton
                disabled={this.props.pristine || this.props.submitting || this.props.invalid}
                label={this.context.intl.formatMessage({ id: 'session.locked.button' })}
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
// prepare redux form
export default reduxForm({ form: 'session-locked-form' })(SessionLockedFormComponent)
