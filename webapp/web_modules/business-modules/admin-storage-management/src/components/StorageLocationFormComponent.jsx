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
import MoodIcon from 'material-ui/svg-icons/social/mood'
import { browserHistory } from 'react-router'
import {
  Card, CardActions, CardText, CardTitle,
} from 'material-ui/Card'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { CardActionsComponent, NoContentComponent } from '@regardsoss/components'
import {
  RenderTextField, reduxForm, ValidationHelpers, Field,
} from '@regardsoss/form-utils'
import { StorageDomain } from '@regardsoss/domain'
import { RenderPluginField, PluginFormUtils } from '@regardsoss/microservice-plugin-configurator'
import { StorageShapes } from '@regardsoss/shape'
import messages from '../i18n'
import styles from '../styles'

/**
* Component to create/edit/diplicate a storage location plugin configuration
* @author Sébastien Binda
*/
const validateName = value => value && !/^[a-zA-Z0-9_-]+$/g.test(value)
  ? 'invalid.name.expression' : undefined

class StorageLocationFormComponent extends React.Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    entity: StorageShapes.StorageMonitoring,
    backUrl: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    // from redux form
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  componentDidMount(prevProps) {
    this.handleInitialize()
  }

  handleInitialize = () => {
    const { mode, entity, initialize } = this.props
    if (mode === 'edit' && entity) {
      initialize({
        name: entity.content.name,
        allocatedSizeInKo: entity.content.configuration ? entity.content.configuration.allocatedSizeInKo : null,
        pluginConfiguration: entity.content.configuration ? entity.content.configuration.pluginConfiguration : null,
      })
    }
  }

  onBack = () => {
    const { backUrl } = this.props
    browserHistory.push(backUrl)
  }

  /**
   * Update a storageLocationConf entity from the given updated PluginConfiguration.
   */
  updateStorageLocationConf = (fields) => {
    const { onUpdate, entity } = this.props
    const storageLocationConfToUpdate = {
      name: entity.content.name,
      configuration: {
        name: entity.content.name,
        configuration: {
          ...entity.content.configuration,
          allocatedSizeInKo: fields.allocatedSizeInKo,
          pluginConfiguration: fields.pluginConfiguration ? PluginFormUtils.formatPluginConf(fields.pluginConfiguration) : null,
        },
      },
    }
    onUpdate(entity.content.name, storageLocationConfToUpdate).then((actionResults) => {
      if (!actionResults.error) {
        this.onBack()
      }
    })
  }

  /**
   * Create a storageLocationConf entity from the given updated PluginConfiguration.
   */
  createStorageLocationConf = (fields) => {
    const { onCreate } = this.props
    const pluginConf = fields.pluginConfiguration ? fields.pluginConfiguration : null
    const formatedPluginConf = PluginFormUtils.formatPluginConf(pluginConf)
    const storageLocationConf = {
      name: fields.name,
      configuration: {
        allocatedSizeInKo: fields.allocatedSizeInKo,
        pluginConfiguration: formatedPluginConf,
      },
    }
    onCreate(storageLocationConf).then((actionResults) => {
      if (!actionResults.error) {
        this.onBack()
      }
    })
  }

  renderContent = () => {
    const { mode, entity } = this.props
    const { intl: { formatMessage } } = this.context
    const pluginType = StorageDomain.PluginTypeEnum.STORAGE
    if (mode !== 'create' && !entity) {
      return (
        <NoContentComponent
          titleKey="storage.location.form.invalid.id"
          Icon={MoodIcon}
        />
      )
    }
    return (
      <div>
        <Field
          name="name"
          fullWidth
          component={RenderTextField}
          type="text"
          value=""
          label={formatMessage({ id: 'storage.location.form.name.label' })}
          validate={validateName}
          disabled={mode !== 'create'}
        />
        <Field
          name="allocatedSizeInKo"
          fullWidth
          component={RenderTextField}
          type="number"
          validate={ValidationHelpers.required}
          label={formatMessage({ id: 'storage.location.form.allocated-size.label' })}
        />
        <Field
          key="storagePlugin"
          name="pluginConfiguration"
          component={RenderPluginField}
          title={formatMessage({ id: 'storage.location.form.plugin.label' })}
          selectLabel={formatMessage({ id: 'storage.location.form.plugin.label' })}
          pluginType={pluginType}
          microserviceName={STATIC_CONF.MSERVICES.STORAGE}
          hideDynamicParameterConf
          hideGlobalParameterConf
        />
      </div>
    )
  }

  render() {
    const {
      backUrl, handleSubmit, entity, mode,
    } = this.props

    let onSubmitAction
    if (mode === 'create') {
      onSubmitAction = this.createStorageLocationConf
    } else {
      onSubmitAction = entity.content.configuration && entity.content.configuration.id ? this.updateStorageLocationConf : this.createStorageLocationConf
    }

    const { intl: { formatMessage }, moduleTheme } = this.context

    const title = mode === 'edit'
      ? formatMessage({ id: 'storage.location.form.edit.title' }, { name: entity.content.name })
      : formatMessage({ id: 'storage.location.form.create.title' })
    const buttonTitle = mode === 'edit'
      ? formatMessage({ id: 'storage.location.form.submit.edit.button' })
      : formatMessage({ id: 'storage.location.form.submit.button' })
    return (
      <Card>
        <CardTitle
          title={title}
          subtitle={formatMessage({ id: 'storage.location.form.subtitle' })}
        />
        <form onSubmit={handleSubmit(onSubmitAction)}>
          <CardText style={moduleTheme.root}>
            {this.renderContent()}
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={buttonTitle}
              mainButtonType="submit"
              secondaryButtonLabel={formatMessage({ id: 'storage.location.form.back.button' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </form>
      </Card>
    )
  }
}

const connectedReduxForm = reduxForm({
  form: 'storage-form',
})(StorageLocationFormComponent)
// [a-zA-Z0-9_\-]+
export default withModuleStyle(styles)(withI18n(messages)(connectedReduxForm))
