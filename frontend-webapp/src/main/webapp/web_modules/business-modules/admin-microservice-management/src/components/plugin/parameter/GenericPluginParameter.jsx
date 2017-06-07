/**
 * LICENSE_PLACEHOLDER
 **/
import PluginParameterString from './PluginParameterString'
import PluginParameterNumber from './PluginParameterNumber'
import PluginParameterBoolean from './PluginParameterBoolean'
import PluginParameterPlugin from './PluginParameterPlugin'
import PluginParameterDynamic from './PluginParameterDynamic'
import { pluginParameterComponentPropTypes } from './utils'

/**
 * Adapter for generic use of {@link PluginParameter[Category]} components
 *
 * @author Xavier-Alexandre Brochard
 */
export class GenericPluginParameter extends React.Component {

  static propTypes = pluginParameterComponentPropTypes

  render() {
    const { pluginParameter: { dynamic }, pluginParameterType } = this.props

    switch (pluginParameterType && pluginParameterType.paramType) {
      case 'PRIMITIVE':
        switch (pluginParameterType.type) {
          case 'java.lang.String':
          case 'java.lang.Character':
            return dynamic ? <PluginParameterDynamic {...this.props} /> : <PluginParameterString {...this.props} />
          case 'java.lang.Byte':
          case 'java.lang.Integer':
          case 'java.lang.Long':
          case 'java.lang.Float':
          case 'java.lang.Double':
          case 'java.lang.Short':
            return dynamic ? <PluginParameterDynamic {...this.props} /> : <PluginParameterNumber {...this.props} />
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
