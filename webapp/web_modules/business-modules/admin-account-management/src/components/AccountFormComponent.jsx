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
import trim from 'lodash/trim'
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import {
  reduxForm, RenderTextField, Field, ValidationHelpers,
} from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { AdminInstanceShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'

/**
 * Display edit and create project form
 */
export class AccountFormComponent extends React.Component {
  static propTypes = {
    currentAccount: AdminInstanceShapes.Account.isRequired,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    const { currentAccount } = this.props
    this.props.initialize({
      email: currentAccount.content.email,
      firstName: currentAccount.content.firstName,
      lastName: currentAccount.content.lastName,
    })
  }

  render() {
    const { pristine, submitting } = this.props
    return (
      <form
        className="selenium-accountForm"
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={
              this.context.intl.formatMessage(
                { id: 'account.form.edit.title' },
                {
                  firstName: this.props.currentAccount.content.firstName,
                  lastName: this.props.currentAccount.content.lastName,
                },
              )
}
          />
          <CardText>

            <Field
              name="email"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'account.form.input.email' })}
              validate={ValidationHelpers.email}
              normalize={trim}
            />
            <Field
              name="firstName"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'account.form.input.firstName' })}
            />
            <Field
              name="lastName"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'account.form.input.lastName' })}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'account.form.action.save' })}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'account.form.action.cancel' })}
              secondaryButtonUrl={this.props.backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default reduxForm({
  form: 'account-form',
})(AccountFormComponent)
