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
 **/
import map from 'lodash/map'
import MenuItem from 'material-ui/MenuItem'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { AdminDomain } from '@regardsoss/domain'
import { AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { CardActionsComponent } from '@regardsoss/components'
import { RenderSelectField, Field, reduxForm } from '@regardsoss/form-utils'
import dependencies from '../dependencies'

/**
 * Project user settings form component
 * @author Raphaël Mechali
 */
export class ProjectUserSettingsFormComponent extends React.Component {
  static propTypes = {
    settings: AdminShapes.ProjectUserSettings,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // from redux form
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    initialize: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Lifecycle method component will mount, used here to initialize form values */
  componentWillMount() {
    const { settings, initialize } = this.props
    initialize({
      mode: settings.mode,
    })
  }

  render() {
    const {
      submitting, pristine, invalid,
      handleSubmit, onBack, onSubmit,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardTitle
            title={formatMessage({ id: 'project.user.settings.title' })}
            subtitle={formatMessage({ id: 'project.user.settings.subtitle' })}
          />
          <CardText>
            {/* Project user validation mode  */}
            <Field
              name="mode"
              fullWidth
              component={RenderSelectField}
              label={formatMessage({ id: 'project.user.settings.mode.field' })}
            >
              { /* provide choice for every modes */
                map(AdminDomain.PROJECT_USER_SETTINGS_MODE_ENUM, (value, key) => (
                  <MenuItem
                    key={key}
                    primaryText={formatMessage({ id: `project.user.settings.mode.${key}` })}
                    value={value}
                  />))
              }
            </Field>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'project.user.settings.action.confirm' })}
              mainButtonType="submit"
              mainHateoasDependencies={dependencies.settingsDependencies}
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'project.user.settings.action.cancel' })}
              secondaryButtonClick={onBack}
            />
          </CardActions>
        </Card>
      </form>)
  }
}

export default reduxForm({
  form: 'projectuser-setttings-form',
})(ProjectUserSettingsFormComponent)
