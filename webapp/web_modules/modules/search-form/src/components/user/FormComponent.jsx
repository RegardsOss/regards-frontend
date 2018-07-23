/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType } from '@regardsoss/i18n'
import { AccessShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { DynamicModulePane } from '@regardsoss/components'
import { dependencies } from '../../user-dependencies'
import ModuleConfiguration from '../../shapes/ModuleConfiguration'
import FormLayout from './FormLayout'

/**
 * Component to display a configured Search form module
 * @author Sébastien binda
 */
class FormComponent extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration.isRequired,
    plugins: AccessShapes.UIPluginConfArray,
    pluginsProps: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
    }),
    handleSearch: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.pluginStates = {}
  }

  onKeyPress = (e) => {
    const { handleSearch } = this.props
    if (e.charCode === 13) { // seach on enter key pressed
      handleSearch()
    }
  }

  /**
   * Function passed to plugins to give them back theire previous state in order to initialize them
   * with their previous values.
   *
   * @param pluginId
   * @returns {{}}
   */
  getPluginDefaultState = pluginId => this.pluginStates[pluginId] ? this.pluginStates[pluginId] : {}

  /**
   * Function passed to plugins to save their state. So they can retrieve it later
   * @param pluginId
   * @param state
   */
  savePluginState = (pluginId, state) => {
    this.pluginStates[pluginId] = state
  }

  render() {
    const {
      plugins, pluginsProps: initialPluginProps, moduleConf, handleSearch, ...moduleProperties
    } = this.props

    const pluginsProps = {
      ...initialPluginProps,
      getDefaultState: this.getPluginDefaultState,
      savePluginState: this.savePluginState,
    }

    // Workround - Container type changed between version 1 and version 1.1. So, to avoid changing every configuration saved, we force container type with the new value.
    const retroCompatibleLayout = {
      ...moduleConf.layout,
      type: 'FormMainContainer',
    }

    return (
      <DynamicModulePane
        {...moduleProperties}
        moduleConf={moduleConf}
        onKeyPress={this.onKeyPress}
        requiredDependencies={dependencies}
        mainModule={false}
      >
        <FormLayout
          layout={retroCompatibleLayout}
          plugins={plugins}
          pluginsProps={pluginsProps}
          onSearch={handleSearch}
          onClearAll={this.props.handleClearAll}
        />
      </DynamicModulePane>)
  }
}

export default FormComponent
