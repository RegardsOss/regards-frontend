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
import { IntlProvider } from 'react-intl'
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import { i18nSelectors } from '@regardsoss/i18n'
import { ModuleThemeProvider } from '@regardsoss/modules'

/**
* A very light version of the @regardoss/plugin/PluginLoader, which does not perform any loading, nor error checking
* or children decoration
* @author Raphaël Mechali
*/
export class PluginDisplayerContainer extends React.Component {

  /** Instance Id counter, avoiding conflicts with mounted services */
  static PLUGIN_INSTANCE_ID = 0

  static mapStateToProps = state => ({ locale: i18nSelectors.getLocale(state) })


  static propTypes = {
    pluginInstance: AccessShapes.UIPluginInstanceContent,
    // eslint-disable-next-line react/no-unused-prop-types
    pluginConf: PropTypes.shape({
      runtimeTarget: AccessShapes.RuntimeTarget,
      configuration: AccessShapes.RuntimeConfiguration,
    }).isRequired,
    // from map state to props
    locale: PropTypes.string.isRequired,
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
      const pluginInstanceId = `entities-common/ui-service-plugin/${PluginDisplayerContainer.PLUGIN_INSTANCE_ID}`
      PluginDisplayerContainer.PLUGIN_INSTANCE_ID += 1

      const { pluginConf, pluginInstance } = newProps
      renderedPlugin = React.createElement(pluginInstance.plugin, {
        pluginInstanceId,
        ...pluginConf,
      })
    }
    this.setState({
      renderedPlugin,
    })
  }

  render() {
    const { pluginInstance, locale } = this.props
    const { renderedPlugin } = this.state
    return (
      <IntlProvider
        locale={locale}
        messages={pluginInstance.messages[locale]}
      >
        <ModuleThemeProvider module={pluginInstance.styles} >
          {renderedPlugin}
        </ModuleThemeProvider>
      </IntlProvider>
    )
  }
}


export default connect(PluginDisplayerContainer.mapStateToProps)(PluginDisplayerContainer)