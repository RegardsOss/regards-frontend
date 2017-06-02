/**
 * LICENSE_PLACEHOLDER
 **/
import PluginParameterString from './PluginParameterString'
import PluginParameterNumber from './PluginParameterNumber'
import PluginParameterBoolean from './PluginParameterBoolean'
import PluginParameterPlugin from './PluginParameterPlugin'
import { pluginParameterComponentPropTypes } from './utils'

/**
 * Adapter for generic use of {@link PluginParameterString}, {@link PluginParameterNumber}, {@link PluginParameterBoolean} ...
 *
 * @author Xavier-Alexandre Brochard
 */
export class GenericPluginParameter extends React.Component {

  static propTypes = pluginParameterComponentPropTypes

  static defaultProps = {
    mode: 'view',
  }

  render() {
    const { pluginParameterType } = this.props

    switch (pluginParameterType && pluginParameterType.paramType) {
      case 'PRIMITIVE':
        switch (pluginParameterType.type) {
          case 'java.lang.String':
          case 'java.lang.Character':
            return <PluginParameterString {...this.props} />
          case 'java.lang.Byte':
          case 'java.lang.Integer':
          case 'java.lang.Long':
          case 'java.lang.Float':
          case 'java.lang.Double':
          case 'java.lang.Short':
            return <PluginParameterNumber {...this.props} />
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
