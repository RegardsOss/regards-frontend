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
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import trim from 'lodash/trim'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'
import { AccessShapes } from '@regardsoss/shape'
import {
  RenderTextField, RenderCheckbox, Field, ValidationHelpers, reduxForm,
} from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import FieldsBuilderComponent from './FieldsBuilderComponent'

const labelValidators = [ValidationHelpers.required, ValidationHelpers.string, ValidationHelpers.lengthLessThan(32)]

/**
 * React component to list connections.
 *
 * @author Léo Mieulet
 */
export class ServiceConfigurationFormComponent extends React.Component {
  static propTypes = {
    uiPluginConfiguration: AccessShapes.UIPluginConf,
    plugin: AccessShapes.UIPluginInstanceContent,
    isCreating: PropTypes.bool.isRequired,
    isDuplicating: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
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
      title = this.context.intl.formatMessage({ id: 'service.form.create.title' })
    } else if (this.props.isDuplicating) {
      title = this.context.intl.formatMessage({ id: 'service.form.duplicate.title' }, { name: this.props.uiPluginConfiguration.content.conf.label })
    } else {
      title = this.context.intl.formatMessage({ id: 'service.form.edit.title' }, { name: this.props.uiPluginConfiguration.content.conf.label })
    }
    return title
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    let initialValues = {}
    if (!this.props.isCreating) {
      const { uiPluginConfiguration } = this.props
      initialValues = {
        linkedToAllEntities: uiPluginConfiguration.content.linkedToAllEntities,
        isActive: uiPluginConfiguration.content.active,
        label: uiPluginConfiguration.content.label,
        dynamic: uiPluginConfiguration.content.conf.dynamic,
        static: uiPluginConfiguration.content.conf.static,
      }
    } else {
      initialValues = {
        isActive: true,
        linkedToAllEntities: false,
      }
    }
    this.props.initialize(initialValues)
  }

  render() {
    const {
      plugin, submitting, invalid, backUrl, pristine,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { service } } = this.context
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={this.getTitle()}
            subtitle={formatMessage({ id: 'service.form.subtitle' })}
          />
          <CardText>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'service.form.label' })}
              validate={labelValidators}
              normalize={trim}
            />
            {
              isEmpty(plugin.info.conf.static) ? null : (
                <div>
                  <Subheader style={service.form.subheaderStyles}>
                    {formatMessage({ id: 'service.form.static.configuration.title' })}
                  </Subheader>
                  {
                    map(plugin.info.conf.static, (input, id) => (
                      <FieldsBuilderComponent
                        key={`static.${id}`}
                        name={id}
                        parameter={input}
                        staticParameter
                      />
                    ))
}
                  <br />
                  <br />
                </div>
              )
}
            {
              isEmpty(plugin.info.conf.static) ? null : (
                <div>
                  <Subheader style={service.form.subheaderStyles}>
                    {formatMessage({ id: 'service.form.dynamic.configuration.title' })}
                  </Subheader>
                  {map(plugin.info.conf.dynamic, (input, id) => (
                    <FieldsBuilderComponent
                      key={`dynamic.${id}`}
                      name={id}
                      parameter={input}
                      staticParameter={false}
                    />
                  ))}
                </div>
              )
}
            <Field
              name="isActive"
              fullWidth
              component={RenderCheckbox}
              label={formatMessage({ id: 'service.form.isActive' })}
            />
            <Field
              name="linkedToAllEntities"
              fullWidth
              component={RenderCheckbox}
              label={formatMessage({ id: 'service.form.linkedToAllEntities' })}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'service.form.action.save' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid || pristine}
              secondaryButtonLabel={formatMessage({ id: 'service.form.action.back' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default reduxForm({
  form: 'service-form',
})(ServiceConfigurationFormComponent)
