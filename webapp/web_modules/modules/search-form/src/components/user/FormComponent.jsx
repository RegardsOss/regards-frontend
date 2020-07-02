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
      initialQuery: PropTypes.string.isRequired,
    }),
    onSearch: PropTypes.func.isRequired,
    onClearAll: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onKeyPress = (e) => {
    const { onSearch } = this.props
    if (e.charCode === 13) { // seach on enter key pressed
      onSearch()
    }
  }

  render() {
    const {
      plugins, pluginsProps, moduleConf, onClearAll, onSearch, ...moduleProperties
    } = this.props

    return (
      <DynamicModulePane
        {...moduleProperties}
        moduleConf={moduleConf}
        onKeyPress={this.onKeyPress}
        requiredDependencies={dependencies}
        mainModule={false}
      >
        <FormLayout
          layout={moduleConf.layout}
          plugins={plugins}
          pluginsProps={pluginsProps}
          onSearch={onSearch}
          onClearAll={onClearAll}
        />
      </DynamicModulePane>)
  }
}

export default FormComponent
