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
import { ProcessingDomain } from '@regardsoss/domain'
import { RenderPluginField, PluginFormUtils } from '@regardsoss/microservice-plugin-configurator'
import { ProcessingShapes, CommonShapes } from '@regardsoss/shape'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { CardActionsComponent, NoContentComponent } from '@regardsoss/components'
import {
  RenderTextField, reduxForm, Field, ValidationHelpers,
} from '@regardsoss/form-utils'
import get from 'lodash/get'
import MoodIcon from 'mdi-material-ui/EmoticonOutline'
import { browserHistory } from 'react-router'
import {
  Card, CardActions, CardText, CardTitle,
} from 'material-ui/Card'
import messages from '../i18n'
import styles from '../styles'
import { Math } from 'window-or-global'

/**
* Component to create/edit/diplicate a processing plugin configuration
* @author Théo Lasserre
*/
const validateName = (value) => value && !/^[a-zA-Z0-9_-]+$/g.test(value)
  ? 'invalid.name.expression' : undefined

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

  state = {
    
  }

  UNSAFE_componentWillMount(prevProps) {
    this.handleInitialize()
  }

  handleInitialize = () => {
    const { mode, entity, initialize } = this.props
    if (mode === 'edit' && entity) {
      initialize({
        //businessId: get(entity, 'content.pluginConfiguration.businessId'),
        //pluginConfiguration: get(entity, 'content.configuration.pluginConfiguration'), // TODO CHANGE WHEN BACK IS OK
        pluginConfiguration: get(entity, 'content.pluginConfiguration')
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
      // TODO: CHANGE WHEN BACK IS OK
      /*name: get(entity, 'content.name'),
      configuration: {
        ...get(entity, 'content.configuration', {}),
        pluginConfiguration,
      },*/
      pluginConfiguration
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

    // TODO : Set business ID & id -> LE BACK S'EN OCCUPE ! SUPPRIMER CA QUAND BACK OK
    // Generate an unique businessId (used for identification)
    const id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    fields.pluginConfiguration.businessId = id
    fields.pluginConfiguration.id = parseInt(id, 10) /// <--- JUSQUI ICI

    const pluginConf = fields.pluginConfiguration ? fields.pluginConfiguration : null
    const formatedPluginConf = PluginFormUtils.formatPluginConf(pluginConf)

    
    
    /*const processingConf = {                      TODO :  A REMETTRE QUAND LE BACK SERA OK -> LA C'EST JUSTE POUR TEST
      configuration: {
        pluginConfiguration: formatedPluginConf,
      },
    }*/

    console.error(fields)

    const processingConf = {
      content: {
        pluginConfiguration: formatedPluginConf,
      }
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

    let onSubmitAction, backUrl
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
        {<form onSubmit={handleSubmit(onSubmitAction)}>
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
        </form>}
      </Card>
    )
  }
}

const connectedReduxForm = reduxForm({
  form: 'processing-metadata-conf',
})(ProcessingFormComponent)
export default withModuleStyle(styles)(withI18n(messages)(connectedReduxForm))
