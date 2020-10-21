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
import { pluginReducerHelper } from '@regardsoss/plugins'
import { AccessShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'


/**
* A very light version of the @regardoss/plugin/PluginLoader, which does not perform any loading, nor error checking
* or children decoration
* @author Raphaël Mechali
*/
export class PluginDisplayerContainer extends React.Component {
  /** Messages to use when the module provides none */
  static DEFAULT_MESSAGES = { en: {}, fr: {} }

  /** styles to use when the module provides none */
  static DEFAULT_STYLES = {
    styles: () => ({}),
  }

  /** Instance Id counter, avoiding conflicts with mounted services */
  static PLUGIN_INSTANCE_ID = 0

  static propTypes = {
    pluginInstance: AccessShapes.UIPluginInstanceContent,
    // eslint-disable-next-line react/no-unused-prop-types
    pluginConf: PropTypes.shape({
      runtimeTarget: AccessShapes.RuntimeTarget,
      configuration: AccessShapes.RuntimeConfiguration,
    }).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    pluginProps: PropTypes.shape({
      onClose: PropTypes.function,
    }),
  }

  static defaultProps = {
    pluginProps: {},
  }

  componentWillMount = () => this.onPropertiesChange(this.props)

  componentWillReceiveProps = nextProps => this.onPropertiesChange(nextProps)

  /**
   * Handles properties change: update the rendered plugin
   */
  onPropertiesChange = (newProps) => {
    // prepare the plugin on new properties values
    let renderedPlugin = null
    if (newProps) {
      const { pluginConf, pluginProps, pluginInstance } = newProps

      // 0 - generate new instance ID
      const pluginInstanceId = `service.instance.${PluginDisplayerContainer.PLUGIN_INSTANCE_ID}`
      PluginDisplayerContainer.PLUGIN_INSTANCE_ID += 1


      // 1 - register service reducers
      pluginReducerHelper.initializePluginReducer(pluginInstance, pluginInstanceId)

      // 2 - build render instance
      renderedPlugin = React.createElement(pluginInstance.plugin, {
        pluginInstanceId,
        ...pluginConf,
        ...pluginProps,
      })
    }
    this.setState({
      renderedPlugin,
    })
  }

  render() {
    const { pluginInstance } = this.props
    const { renderedPlugin } = this.state
    return (
      <I18nProvider messages={pluginInstance.messages || PluginDisplayerContainer.DEFAULT_MESSAGES}>
        <ModuleStyleProvider module={pluginInstance.styles || PluginDisplayerContainer.DEFAULT_STYLES}>
          {renderedPlugin}
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}


export default PluginDisplayerContainer
