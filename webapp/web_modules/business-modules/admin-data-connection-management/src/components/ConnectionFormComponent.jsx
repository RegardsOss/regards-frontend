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
import forEach from 'lodash/forEach'
import trim from 'lodash/trim'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import {
  reduxForm, RenderTextField, RenderSelectField, Field, ValidationHelpers,
} from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'

/**
 * React component to list connections.
 */
export class ConnectionFormComponent extends React.Component {
  static propTypes = {
    currentConnection: DataManagementShapes.Connection,
    pluginMetaDataList: CommonShapes.PluginMetaDataList,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    isCreating: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
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

  getTitle = () => {
    let title
    if (this.props.isCreating) {
      title = this.context.intl.formatMessage({ id: 'connection.create.title' })
    } else {
      title = this.context.intl.formatMessage({ id: 'connection.edit.title' }, { name: this.props.currentConnection.content.label })
    }
    return title
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    let initialValues = {}
    if (this.props.isEditing) {
      const {
        currentConnection: {
          content: {
            label, version, priorityOrder, pluginId,
            parameters,
          },
        },
      } = this.props
      initialValues = {
        label,
        version,
        priorityOrder,
        pluginId,
      }
      forEach(parameters, (parameter) => {
        switch (parameter.name) {
          case 'user':
            initialValues.user = parameter.value
            break
          case 'password':
            initialValues.password = parameter.value
            break
          case 'dbHost':
            initialValues.dbHost = parameter.value
            break
          case 'dbPort':
            initialValues.dbPort = parameter.value
            break
          case 'dbName':
            initialValues.dbName = parameter.value
            break
          default:
            break
        }
      })
    } else {
      initialValues = {
        minPoolSize: 3,
        maxPoolSize: 10,
        driver: 'org.postgresql.Driver',
      }
    }
    this.props.initialize(initialValues)
  }

  render() {
    const {
      pluginMetaDataList, pristine, submitting, invalid, backUrl,
    } = this.props
    const title = this.getTitle()
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
            subtitle={this.context.intl.formatMessage({ id: 'connection.form.subtitle' })}
          />
          <CardText>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'connection.form.label' })}
              validate={ValidationHelpers.required}
            />
            <Field
              name="pluginId"
              fullWidth
              component={RenderSelectField}
              label={this.context.intl.formatMessage({ id: 'connection.form.pluginId' })}
              disabled={this.props.isEditing}
              validate={ValidationHelpers.required}
            >
              {map(pluginMetaDataList, ({ content: { pluginId, version } }, id) => (
                <MenuItem
                  value={pluginId}
                  primaryText={`${pluginId} (${version})`}
                  key={id}
                />
              ))}
            </Field>
            <Field
              name="user"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'connection.form.user' })}
              validate={ValidationHelpers.required}
              normalize={trim}
            />
            <Field
              name="password"
              fullWidth
              component={RenderTextField}
              type="password"
              label={this.context.intl.formatMessage({ id: 'connection.form.password' })}
              validate={ValidationHelpers.required}
              normalize={trim}
            />
            <Field
              name="dbHost"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'connection.form.dbHost' })}
              validate={ValidationHelpers.required}
              normalize={trim}
            />
            <Field
              name="dbPort"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'connection.form.dbPort' })}
              validate={ValidationHelpers.validRequiredNumber}
              normalize={trim}
            />
            <Field
              name="dbName"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'connection.form.dbName' })}
              validate={ValidationHelpers.required}
              normalize={trim}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'connection.form.action.save' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid || pristine}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'connection.form.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default reduxForm({
  form: 'connection-form',
})(ConnectionFormComponent)
