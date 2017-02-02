/**
 * LICENSE_PLACEHOLDER
 **/
import { PluginParameter, PluginParameterType } from '@regardsoss/model'
import PluginParameterString from './PluginParameterString'
import PluginParameterNumber from './PluginParameterNumber'
import PluginParameterBoolean from './PluginParameterBoolean'
import PluginParameterPlugin from './PluginParameterPlugin'

/**
 * Adapter for generic use of {@link PluginParameterString}, {@link PluginParameterNumber}, {@link PluginParameterBoolean} ...
 *
 * @author Xavier-Alexandre Brochard
 */
export class GenericPluginParameter extends React.Component {

  static propTypes = {
    pluginParameter: PluginParameter,
    pluginParameterType: PluginParameterType,
    mode: React.PropTypes.oneOf(['view', 'edit']),
    change: React.PropTypes.func, // Callback provided by redux-form in order to manually change a field value
  }

  static defaultProps = {
    mode: 'view',
  }

  constructor(props) {
    super(props)
    this.state = {
      mode: 'view',
    }
  }

  render() {
    const { pluginParameter: { name, value }, pluginParameterType, mode, change } = this.props

    switch (pluginParameterType && pluginParameterType.paramType) {
      case 'PRIMITIVE':
        switch (pluginParameterType.type) {
          case 'java.lang.String':
          case 'java.lang.Character':
            return <PluginParameterString name={name} value={value.toString()} mode={mode}/>
          case 'java.lang.Byte':
          case 'java.lang.Integer':
          case 'java.lang.Long':
          case 'java.lang.Float':
          case 'java.lang.Double':
          case 'java.lang.Short':
            return <PluginParameterNumber name={name} value={value.toString()} mode={mode}/>
          case 'java.lang.Boolean':
            return <PluginParameterBoolean name={name} value={value.toString()} mode={mode}/>
          default:
            return <PluginParameterString name={name} value={value.toString()} mode={mode}/>
        }
      case 'PLUGIN':
        return (
          <PluginParameterPlugin
            pluginParameterType={pluginParameterType}
            microserviceName={'rs-dam'}
            name={name}
            value={value.toString()}
            mode={mode}
            change={change}
          />
        )
      default:
        return <PluginParameterString name={name} value={value.toString()} mode={mode}/>
    }
  }
}

export default GenericPluginParameter
