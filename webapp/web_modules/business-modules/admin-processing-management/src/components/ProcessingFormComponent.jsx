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
import { browserHistory } from 'react-router'
import { ProcessingDomain } from '@regardsoss/domain'
import { RenderPluginField, PluginFormUtils } from '@regardsoss/microservice-plugin-configurator'
import { ProcessingShapes } from '@regardsoss/shape'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { CardActionsComponent, NoContentComponent } from '@regardsoss/components'
import {
  reduxForm, Field, ValidationHelpers,
} from '@regardsoss/form-utils'
import get from 'lodash/get'
import MoodIcon from 'mdi-material-ui/EmoticonOutline'
import Card from 'material-ui/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardText from 'material-ui/Card/CardText'
import CardTitle from 'material-ui/Card/CardTitle'
import messages from '../i18n'
import styles from '../styles'

/**
* Component to create/edit/diplicate a processing plugin configuration
* @author Théo Lasserre
*/
class ProcessingFormComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    entity: ProcessingShapes.Processing,
    onUpdate: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
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

  UNSAFE_componentWillMount(prevProps) {
    this.handleInitialize()
  }

  handleInitialize = () => {
    const { mode, entity, initialize } = this.props
    if (mode === 'edit' && entity) {
      initialize({
        pluginConfiguration: get(entity, 'content.pluginConfiguration'),
      })
    }
  }

  onBack = () => {
    const { project } = this.props
    browserHistory.push(`/admin/${project}/commands/processing/list`)
  }

  /**
   * Update a processingConf entity from the given updated PluginConfiguration.
   */
  updateProcessingConf = (fields) => {
    const { onUpdate, entity } = this.props
    const pluginConfiguration = fields.pluginConfiguration ? {
      ...PluginFormUtils.formatPluginConf(fields.pluginConfiguration),
    } : null
    const processingConfToUpdate = {
      pluginConfiguration,
    }
    onUpdate(get(entity, 'content.pluginConfiguration.businessId'), processingConfToUpdate).then((actionResults) => {
      if (!actionResults.error) {
        this.onBack()
      }
    })
  }

  /**
   * Create a processingConf entity from the given updated PluginConfiguration.
   */
  createProcessingConf = (fields) => {
    const { onCreate } = this.props
    const pluginConf = fields.pluginConfiguration ? fields.pluginConfiguration : null
    const formatedPluginConf = PluginFormUtils.formatPluginConf(pluginConf)

    const processingConf = {
      content: {
        pluginConfiguration: formatedPluginConf,
      },
    }

    onCreate(processingConf).then((actionResults) => {
      if (!actionResults.error) {
        this.onBack()
      }
    })
  }

  renderContent = () => {
    const { mode, entity } = this.props
    const { intl: { formatMessage } } = this.context
    if (mode !== 'create' && !entity) {
      return (
        <NoContentComponent
          titleKey="processing.form.invalid.id"
          Icon={MoodIcon}
        />
      )
    }
    return (
      <Field
        key="processingPlugin"
        name="pluginConfiguration"
        component={RenderPluginField}
        defaultPluginConfLabel={get(entity, 'content.pluginConfiguration.pluginClassName')}
        selectLabel={formatMessage({ id: 'processing.form.plugin.label' })}
        pluginType={ProcessingDomain.PLUGIN_TYPE}
        validate={ValidationHelpers.required}
        microserviceName={STATIC_CONF.MSERVICES.PROCESSING}
        hideDynamicParameterConf
        hideGlobalParameterConf
      />
    )
  }

  render() {
    const {
      project, handleSubmit, entity, mode,
      pristine, invalid,
    } = this.props

    let onSubmitAction; let
      backUrl
    if (mode === 'create') {
      onSubmitAction = this.createProcessingConf
      backUrl = `/admin/${project}/commands/board`
    } else {
      onSubmitAction = this.updateProcessingConf
      backUrl = `/admin/${project}/commands/processing/list`
    }

    const { intl: { formatMessage }, moduleTheme } = this.context
    const title = mode === 'edit'
      ? formatMessage({ id: 'processing.form.edit.title' }, { name: get(entity, 'content.name') })
      : formatMessage({ id: 'processing.form.create.title' })
    const buttonTitle = mode === 'edit'
      ? formatMessage({ id: 'processing.form.submit.edit.button' })
      : formatMessage({ id: 'processing.form.submit.button' })
    return (
      <Card>
        <CardTitle
          title={title}
          subtitle={formatMessage({ id: 'processing.form.subtitle' })}
        />
        <form onSubmit={handleSubmit(onSubmitAction)}>
          <CardText style={moduleTheme.root}>
            {this.renderContent()}
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={buttonTitle}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || invalid}
              secondaryButtonLabel={formatMessage({ id: 'processing.form.back.button' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </form>
      </Card>
    )
  }
}

const connectedReduxForm = reduxForm({
  form: 'processing-metadata-conf',
})(ProcessingFormComponent)
export default withModuleStyle(styles)(withI18n(messages)(connectedReduxForm))
