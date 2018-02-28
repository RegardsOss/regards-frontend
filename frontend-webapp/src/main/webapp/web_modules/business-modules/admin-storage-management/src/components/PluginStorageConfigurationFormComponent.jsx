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
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { CardActionsComponent } from '@regardsoss/components'
import { StorageDomain } from '@regardsoss/domain'
import { PluginListContainer, PluginFormContainer } from '@regardsoss/microservice-plugin-configurator'
import { CommonShapes } from '@regardsoss/shape'
import messages from '../i18n'
import styles from '../styles'

/**
* Component to create/edit/diplicate a storage location plugin configuration
* @author Sébastien Binda
*/
class PluginStorageConfigurationFormComponent extends React.Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    pluginConfiguration: CommonShapes.PluginConfigurationContent,
    onBack: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedPlugin: props.pluginConfiguration ? props.pluginConfiguration : null,
    }
  }

  selectPluginType = (plugin) => {
    this.setState({ selectedPlugin: plugin })
  }

  render() {
    const {
      onBack, pluginConfiguration, mode,
    } = this.props
    const { selectedPlugin } = this.state
    const selectedPluginId = get(selectedPlugin, 'pluginId', null)
    const { intl: { formatMessage }, moduleTheme } = this.context

    const title = mode === 'edit' ?
      formatMessage({ id: 'storage.data-storage.plugins.form.edit.title' }, { name: get(pluginConfiguration, 'label', null) }) :
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
          <PluginListContainer
            title={formatMessage({ id: 'storage.data-storage.plugins.form.type.select.title' })}
            selectLabel={formatMessage({ id: 'storage.data-storage.plugins.form.type.select.label' })}
            microserviceName={STATIC_CONF.MSERVICES.STORAGE}
            pluginType={StorageDomain.PluginTypeEnum.STORAGE}
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
              pluginConfigurationId={get(pluginConfiguration, 'id', null)}
              formMode={mode}
              title={formatMessage({ id: 'storage.data-storage.plugins.form.parameters.title' })}
            /> : null
          }
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={formatMessage({ id: 'storage.data-storage.plugins.list.back.button' })}
            mainButtonUrl={onBack}
          />
        </CardActions>
      </Card>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(PluginStorageConfigurationFormComponent))

