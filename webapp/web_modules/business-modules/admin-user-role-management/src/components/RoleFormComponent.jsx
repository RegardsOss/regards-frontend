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
import map from 'lodash/map'
import trim from 'lodash/trim'
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { CardActionsComponent } from '@regardsoss/components'
import {
  RenderTextField, Field, RenderSelectField, ValidationHelpers, reduxForm,
} from '@regardsoss/form-utils'
import { AdminShapes } from '@regardsoss/shape'

const nameValidator = [ValidationHelpers.required, ValidationHelpers.validAlphaNumericUnderscore]

/**
 * Display edit and create project form
 */
export class RoleFormComponent extends React.Component {
  static propTypes = {
    currentRole: AdminShapes.Role,
    roleList: AdminShapes.RoleList,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    isCreating: this.props.currentRole === undefined,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentRole } = this.props
      const formValues = {
        name: currentRole.content.name,
      }

      // Not all roles have a parent role
      if (currentRole.content.parentRole) {
        formValues.parentRole = currentRole.content.parentRole.name
      }
      this.props.initialize(formValues)
    } else {
      this.props.initialize({
        parentRole: 'PUBLIC',
      })
    }
  }

  getRoleName = (name = 'empty') => {
    const formated = this.context.intl.formatMessage({ id: `role.name.${name}` })
    if (formated !== `role.name.${name}`) {
      return formated
    }
    return name
  }

  render() {
    const {
      pristine, submitting, invalid, roleList,
    } = this.props
    const title = this.state.isCreating
      ? this.context.intl.formatMessage({ id: 'role.create.title' })
      : this.context.intl.formatMessage({ id: 'role.edit.title' }, { name: this.props.currentRole.content.name })
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
          />
          <CardText>
            <Field
              name="name"
              fullWidth
              component={RenderTextField}
              type="text"
              disabled={!this.state.isCreating}
              label={this.context.intl.formatMessage({ id: 'role.form.name' })}
              validate={nameValidator}
              normalize={trim}
            />
            <Field
              name="parentRole"
              fullWidth
              component={RenderSelectField}
              label={this.context.intl.formatMessage({ id: 'role.form.parentRole' })}
            >
              {map(roleList, (role, id) => (
                <MenuItem
                  value={role.content.name}
                  key={id}
                  primaryText={this.getRoleName(role.content.name)}
                />
              ))}
            </Field>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'role.form.action.submit' })}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'role.form.action.cancel' })}
              secondaryButtonUrl={this.props.backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default reduxForm({
  form: 'role-form',
})(RoleFormComponent)
