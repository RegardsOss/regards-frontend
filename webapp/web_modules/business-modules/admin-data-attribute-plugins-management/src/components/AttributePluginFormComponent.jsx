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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import MoodIcon from 'mdi-material-ui/EmoticonOutline'
import {
  Card, CardActions, CardText, CardTitle,
} from 'material-ui/Card'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { CardActionsComponent, NoContentComponent } from '@regardsoss/components'
import { DamDomain } from '@regardsoss/domain'
import { PluginListContainer, PluginFormContainer } from '@regardsoss/microservice-plugin-configurator'
import { CommonShapes } from '@regardsoss/shape'
import messages from '../i18n'
import styles from '../styles'

/**
* Component to create/edit/diplicate a attribute calculation plugin configuration
* @author Sébastien Binda
*/
export class AttributePluginFormComponent extends React.Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    pluginConfiguration: CommonShapes.PluginConfiguration,
    backUrl: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    selectedPlugin: get(this.props, 'pluginConfiguration.content', null),
  }

  selectPluginType = (plugin) => {
    if (!isEqual(this.state.selectedPlugin, plugin)) {
      this.setState({ selectedPlugin: plugin })
    }
  }

  renderContent = (pluginConfiguration, selectedPluginId) => {
    const {
      mode, backUrl, onUpdate, onCreate,
    } = this.props
    const { intl: { formatMessage } } = this.context

    if (mode !== 'create' && !pluginConfiguration) {
      return (
        <NoContentComponent
          titleKey="model.attribute.calculation.plugins.form.invalid.id"
          Icon={MoodIcon}
        />
      )
    }
    return (
      <div>
        <PluginListContainer
          title={formatMessage({ id: 'model.attribute.calculation.plugins.form.type.select.title' })}
          selectLabel={formatMessage({ id: 'model.attribute.calculation.plugins.form.type.select.label' })}
          microserviceName={STATIC_CONF.MSERVICES.DAM}
          pluginType={DamDomain.PluginTypeEnum.COMPUTED_ATTR}
          selectedPluginId={selectedPluginId}
          disabled={!!pluginConfiguration}
          handleSelect={this.selectPluginType}
          errorText=""
        />
        {selectedPluginId
          ? <PluginFormContainer
              key={`plugin-conf-${selectedPluginId}`}
              microserviceName={STATIC_CONF.MSERVICES.DAM}
              pluginId={selectedPluginId}
              pluginConfiguration={pluginConfiguration}
              formMode={mode}
              backUrl={backUrl}
              cardStyle={false}
              simpleGlobalParameterConf
              hideDynamicParameterConf
              onUpdatePluginConfiguration={onUpdate}
              onCreatePluginConfiguration={onCreate}
          /> : null}
      </div>
    )
  }

  render() {
    const { backUrl, mode, pluginConfiguration } = this.props
    const { selectedPlugin } = this.state
    const selectedPluginId = get(selectedPlugin, 'pluginId', null)
    const { intl: { formatMessage }, moduleTheme } = this.context

    const title = mode === 'edit'
      ? formatMessage({ id: 'model.attribute.calculation.plugins.form.edit.title' }, { name: get(pluginConfiguration, 'content.label', '<>') })
      : formatMessage({ id: 'model.attribute.calculation.plugins.form.create.title' })
    const subtitle = mode === 'edit'
      ? formatMessage({ id: 'model.attribute.calculation.plugins.form.edit.subtitle' })
      : formatMessage({ id: 'model.attribute.calculation.plugins.form.create.subtitle' })
    return (
      <Card>
        <CardTitle
          title={title}
          subtitle={subtitle}
        />
        <CardText style={moduleTheme.root}>
          {this.renderContent(pluginConfiguration, selectedPluginId)}
        </CardText>
        {selectedPluginId ? null
          : (
            <CardActions>
              <CardActionsComponent
                mainButtonLabel={formatMessage({ id: 'model.attribute.calculation.plugins.list.back.button' })}
                mainButtonUrl={backUrl}
              />
            </CardActions>
          )}
      </Card>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(AttributePluginFormComponent))
