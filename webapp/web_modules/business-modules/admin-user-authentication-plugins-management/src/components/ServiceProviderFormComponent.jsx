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
import { AuthenticationDomain } from '@regardsoss/domain'
import { RenderPluginField } from '@regardsoss/microservice-plugin-configurator'
import { CommonShapes } from '@regardsoss/shape'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { CardActionsComponent, NoContentComponent } from '@regardsoss/components'
import {
  reduxForm, Field, ValidationHelpers, RenderTextField,
} from '@regardsoss/form-utils'
import get from 'lodash/get'
import MoodIcon from 'mdi-material-ui/EmoticonOutline'
import Card from 'material-ui/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardText from 'material-ui/Card/CardText'
import CardTitle from 'material-ui/Card/CardTitle'
import messages from '../i18n'
import styles from '../styles'

export const FORM_MODE = {
  CREATE: 'create',
  EDIT: 'edit',
}

/**
* Component to create/edit a processing plugin configuration
* @author Théo Lasserre
*/
export class ProcessingFormComponent extends React.Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    serviceProvider: CommonShapes.ServiceProvider,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    // from redux form
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  UNSAFE_componentWillMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    const { serviceProvider, initialize } = this.props
    if (serviceProvider) {
      initialize({
        pluginConfiguration: get(serviceProvider, 'content.pluginConfiguration'),
        serviceProviderName: get(serviceProvider, 'content.name', ''),
        serviceProviderUrl: get(serviceProvider, 'content.authUrl', ''),
      })
    }
  }

  renderContent = () => {
    const { mode, serviceProvider } = this.props
    const {
      intl: { formatMessage }, moduleTheme: { serviceprovider },
    } = this.context
    if (mode === FORM_MODE.EDIT && !serviceProvider) {
      return (
        <NoContentComponent
          titleKey="user.authentication.external.plugins.form.create.invalid.id"
          Icon={MoodIcon}
        />
      )
    }
    return (
      [<div key="serviceProviderCommonDiv" style={serviceprovider.serviceProviderCommonDiv}>
        <Field
          name="serviceProviderName"
          component={RenderTextField}
          label={formatMessage({ id: 'user.authentication.external.plugins.form.create.field.name' })}
          fullWidth
          validate={ValidationHelpers.validStringNoSpaceNoSpecial}
        />
        <Field
          name="serviceProviderUrl"
          component={RenderTextField}
          label={formatMessage({ id: 'user.authentication.external.plugins.form.create.field.url' })}
          fullWidth
          validate={ValidationHelpers.required}
        />
      </div>, <div key="serviceProviderPlugin" style={serviceprovider.serviceProviderPlugin}>
        <Field
          name="pluginConfiguration"
          component={RenderPluginField}
          selectLabel={formatMessage({ id: 'user.authentication.external.plugins.form.create.field.pluginConfiguration' })}
          pluginType={AuthenticationDomain.PluginTypeEnum.SERVICE_PROVIDER}
          validate={ValidationHelpers.required}
          microserviceName={STATIC_CONF.MSERVICES.AUTHENTICATION}
          simpleGlobalParameterConf
        />
      </div>]
    )
  }

  render() {
    const {
      onSubmit, handleSubmit, serviceProvider, mode,
      pristine, invalid, backUrl,
    } = this.props

    const { intl: { formatMessage }, moduleTheme } = this.context

    const buttonTitle = formatMessage({ id: `user.authentication.external.plugins.form.submit.${mode}.button` })
    let title = ''
    switch (mode) {
      case FORM_MODE.CREATE:
        title = formatMessage({ id: `user.authentication.external.plugins.form.submit.${mode}.title` })
        break
      case FORM_MODE.EDIT:
        title = formatMessage({ id: `user.authentication.external.plugins.form.submit.${mode}.title` }, { name: get(serviceProvider, 'content.name') })
        break
      default:
        throw new Error('FORM MODE Unknown')
    }

    return (
      <Card>
        <CardTitle
          title={title}
          subtitle={formatMessage({ id: 'user.authentication.external.plugins.form.subtitle' })}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardText style={moduleTheme.root}>
            {this.renderContent()}
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={buttonTitle}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || invalid}
              secondaryButtonLabel={formatMessage({ id: 'user.authentication.external.plugins.form.back.button' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </form>
      </Card>
    )
  }
}

const connectedReduxForm = reduxForm({
  form: 'service-provider-form',
})(ProcessingFormComponent)
export default withModuleStyle(styles)(withI18n(messages)(connectedReduxForm))
