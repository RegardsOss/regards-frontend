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
import has from 'lodash/has'
import { CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import {
  RenderTextField, Field, RenderSelectField, reduxForm,
} from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AdminShapes } from '@regardsoss/shape'
import { ShowableAtRender } from '@regardsoss/display-control'
import MenuItem from 'material-ui/MenuItem'

const NotificationSettingsFrequencies = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  CUSTOM: 'CUSTOM',
}

/**
* Profile edition form component
*/
export class ProfileNotificationFormComponent extends React.Component {
  static propTypes = {
    // submit function
    onEdit: PropTypes.func.isRequired,
    notificationSettings: AdminShapes.NotificationSettings,
    // from redux form
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    showCustomFrequency: this.props.notificationSettings.frequency === NotificationSettingsFrequencies.CUSTOM,
  }

  UNSAFE_componentWillMount = () => {
    this.props.initialize({
      ...this.props.notificationSettings,
    })
  }

  onSave = (values) => {
    this.props.onEdit(values)
      .then((actionResult) => {
        // If the result seems good, let's reinitialize the form to show to the user that its changes have been saved
        if (!has(actionResult, 'error')) {
          this.props.initialize(values)
        }
      })
  }

  handleChangeFrequency = (event, index, value, input) => {
    const showCustomFrequency = value === NotificationSettingsFrequencies.CUSTOM
    this.setState({
      showCustomFrequency,
    })
    if (!showCustomFrequency) {
      this.props.change('days', null)
      this.props.change('hours', null)
    }
    input.onChange(value)
  }

  render() {
    const {
      pristine, submitting, invalid, handleSubmit,
    } = this.props
    const { showCustomFrequency } = this.state
    const { moduleTheme: { user: { profile } } } = this.context

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSave)}>
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'edit.profile.notification.form.title' })}
            subtitle={this.context.intl.formatMessage({ id: 'edit.profile.notification.form.message' })}
          />
          <CardText>
            <Field
              name="frequency"
              fullWidth
              component={RenderSelectField}
              label={this.context.intl.formatMessage({ id: 'edit.profile.notification.form.frequencies' })}
              onSelect={this.handleChangeFrequency}
            >
              <MenuItem value={NotificationSettingsFrequencies.DAILY} primaryText={this.context.intl.formatMessage({ id: 'edit.profile.notification.form.frequencies.daily' })} />
              <MenuItem value={NotificationSettingsFrequencies.WEEKLY} primaryText={this.context.intl.formatMessage({ id: 'edit.profile.notification.form.frequencies.weekly' })} />
              <MenuItem value={NotificationSettingsFrequencies.MONTHLY} primaryText={this.context.intl.formatMessage({ id: 'edit.profile.notification.form.frequencies.monthly' })} />
              <MenuItem value={NotificationSettingsFrequencies.CUSTOM} primaryText={this.context.intl.formatMessage({ id: 'edit.profile.notification.form.frequencies.custom' })} />
            </Field>

            <ShowableAtRender show={showCustomFrequency}>
              <Field
                name="days"
                fullWidth
                component={RenderTextField}
                type="text"
                label={this.context.intl.formatMessage({ id: 'edit.profile.notification.form.days' })}
              />
              <Field
                name="hours"
                fullWidth
                component={RenderTextField}
                type="text"
                label={this.context.intl.formatMessage({ id: 'edit.profile.notification.form.hours' })}
              />
            </ShowableAtRender>
          </CardText>
          <CardActions style={profile.actions.styles}>
            <RaisedButton
              disabled={submitting || invalid || pristine}
              label={this.context.intl.formatMessage({ id: 'edit.profile.notification.form.save' })}
              primary
              type="submit"
            />
          </CardActions>
        </form>
      </div>
    )
  }
}

export default reduxForm({ form: 'profile-notif-form' })(ProfileNotificationFormComponent)
