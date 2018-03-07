/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import MoodIcon from 'material-ui/svg-icons/social/mood'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { CardActionsComponent, NoContentComponent } from '@regardsoss/components'
import { StorageDomain } from '@regardsoss/domain'
import { PluginListContainer, PluginFormContainer } from '@regardsoss/microservice-plugin-configurator'
import { StorageShapes } from '@regardsoss/shape'
import messages from '../i18n'
import styles from '../styles'

/**
* Component to create/edit/diplicate a storage location plugin configuration
* @author Sébastien Binda
*/
class PrioritizedDataStorageFormComponent extends React.Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    type: PropTypes.oneOf(StorageDomain.DataStorageTypeEnumValues).isRequired,
    entity: StorageShapes.PrioritizedDataStorage,
    backUrl: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedPlugin: get(this.getPluginConfiguration(props), 'content', null),
    }
  }

  getPluginConfiguration = (props) => {
    const dataStorageConfiguration = get(props ? props.entity : this.props.entity, 'content.dataStorageConfiguration', null)
    return dataStorageConfiguration ? { content: dataStorageConfiguration } : null
  }

  selectPluginType = (plugin) => {
    if (!isEqual(this.state.selectedPlugin, plugin)) {
      this.setState({ selectedPlugin: plugin })
    }
  }

  /**
   * Update a PrioritizedDataStorage entity from the given updated PluginConfiguration.
   */
  updatePrioritizedDataStorage = (newPluginConfiguration, microservice, pluginId, pluginConfId) => {
    const { onUpdate, entity } = this.props
    const prioritizedDataStorageToUpdate = Object.assign({}, entity.content)
    prioritizedDataStorageToUpdate.dataStorageConfiguration = newPluginConfiguration
    return onUpdate(entity.content.id, prioritizedDataStorageToUpdate)
  }

  /**
   * Create a PrioritizedDataStorage entity from the given updated PluginConfiguration.
   */
  createPrioritizedDataStorage = (newPluginConfiguration, microservice, pluginId) => {
    const { onCreate } = this.props
    const prioritizedDataStorageToUpdate = {
      dataStorageConfiguration: newPluginConfiguration,
    }
    return onCreate(prioritizedDataStorageToUpdate)
  }

  renderContent = (pluginConfiguration, selectedPluginId) => {
    const { type, mode, backUrl } = this.props
    const { intl: { formatMessage } } = this.context
    const pluginType = type === StorageDomain.DataStorageTypeEnum.ONLINE ?
      StorageDomain.PluginTypeEnum.ONLINE_STORAGE :
      StorageDomain.PluginTypeEnum.NEARLINE_STORAGE
    if (mode !== 'create' && !pluginConfiguration) {
      return (
        <NoContentComponent
          title={formatMessage({ id: 'storage.data-storage.plugins.form.invalid.id' })}
          Icon={MoodIcon}
        />
      )
    }
    return (
      <div>
        <PluginListContainer
          title={formatMessage({ id: 'storage.data-storage.plugins.form.type.select.title' })}
          selectLabel={formatMessage({ id: 'storage.data-storage.plugins.form.type.select.label' })}
          microserviceName={STATIC_CONF.MSERVICES.STORAGE}
          pluginType={pluginType}
          selectedPluginId={selectedPluginId}
          disabled={!!pluginConfiguration}
          handleSelect={this.selectPluginType}
          errorText=""
        />
        {selectedPluginId ?
          <PluginFormContainer
            key={`plugin-conf-${selectedPluginId}`}
            microserviceName={STATIC_CONF.MSERVICES.STORAGE}
            pluginId={selectedPluginId}
            pluginConfiguration={pluginConfiguration}
            formMode={mode}
            backUrl={backUrl}
            cardStyle={false}
            simpleGlobalParameterConf
            hideDynamicParameterConf
            onUpdatePluginConfiguration={this.updatePrioritizedDataStorage}
            onCreatePluginConfiguration={this.createPrioritizedDataStorage}
          /> : null
        }
      </div>
    )
  }

  render() {
    const { backUrl, mode } = this.props
    const pluginConfiguration = this.getPluginConfiguration()
    const { selectedPlugin } = this.state
    const selectedPluginId = get(selectedPlugin, 'pluginId', null)
    const { intl: { formatMessage }, moduleTheme } = this.context

    const title = mode === 'edit' ?
      formatMessage({ id: 'storage.data-storage.plugins.form.edit.title' }, { name: get(pluginConfiguration, 'content.label', '<>') }) :
      formatMessage({ id: 'storage.data-storage.plugins.form.create.title' })
    const subtitle = mode === 'edit' ?
      formatMessage({ id: 'storage.data-storage.plugins.form.edit.subtitle' }) :
      formatMessage({ id: 'storage.data-storage.plugins.form.create.subtitle' })
    return (
      <Card>
        <CardTitle
          title={title}
          subtitle={subtitle}
        />
        <CardText style={moduleTheme.root}>
          {this.renderContent(pluginConfiguration, selectedPluginId)}
        </CardText>
        {selectedPluginId ? null :
          (
            <CardActions>
              <CardActionsComponent
                mainButtonLabel={formatMessage({ id: 'storage.data-storage.plugins.list.back.button' })}
                mainButtonUrl={backUrl}
              />
            </CardActions>
          )
        }
      </Card>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(PrioritizedDataStorageFormComponent))

