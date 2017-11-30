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
import PluginParameterString from './PluginParameterString'
import PluginParameterNumber from './PluginParameterNumber'
import PluginParameterBoolean from './PluginParameterBoolean'
import PluginParameterPlugin from './PluginParameterPlugin'
import PluginParameterDynamic from './PluginParameterDynamic'
import { pluginParameterComponentPropTypes } from './util'

/**
 * Adapter for generic use of {@link PluginParameter[Category]} components
 *
 * @author Xavier-Alexandre Brochard
 */
export class GenericPluginParameter extends React.Component {
  static propTypes = pluginParameterComponentPropTypes

  render() {
    const { pluginParameter, pluginParameterType } = this.props

    switch (pluginParameterType && pluginParameterType.paramType) {
      case 'PRIMITIVE':
        switch (pluginParameterType.type) {
          case 'java.lang.String':
          case 'java.lang.Character':
            return pluginParameter && pluginParameter.dynamic ? <PluginParameterDynamic {...this.props} /> : <PluginParameterString {...this.props} />
          case 'java.lang.Byte':
          case 'java.lang.Integer':
          case 'java.lang.Long':
          case 'java.lang.Float':
          case 'java.lang.Double':
          case 'java.lang.Short':
            return pluginParameter && pluginParameter.dynamic ? <PluginParameterDynamic {...this.props} /> : <PluginParameterNumber {...this.props} />
          case 'java.lang.Boolean':
            return <PluginParameterBoolean {...this.props} />
          default:
            return <PluginParameterString {...this.props} />
        }
      case 'PLUGIN':
        return <PluginParameterPlugin {...this.props} />
      default:
        return <PluginParameterString {...this.props} />
    }
  }
}

export default GenericPluginParameter
