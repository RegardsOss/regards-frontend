/**
 * LICENSE_PLACEHOLDER
 **/
import PluginParameterStringStaticView from './string/PluginParameterStringStaticView'
import PluginParameterStringStaticField from './string/PluginParameterStringStaticField'
import PluginParameterStringDynamicView from './string/PluginParameterStringDynamicView'
import PluginParameterStringDynamicField from './string/PluginParameterStringDynamicField'
import PluginParameterNumberStaticView from './number/PluginParameterNumberStaticView'
import PluginParameterNumberStaticField from './number/PluginParameterNumberStaticField'
import PluginParameterNumberDynamicView from './number/PluginParameterNumberDynamicView'
import PluginParameterNumberDynamicField from './number/PluginParameterNumberDynamicField'
import PluginParameterBoolean from './PluginParameterBoolean'
import PluginParameterPlugin from './PluginParameterPlugin'
import { pluginParameterComponentPropTypes } from './utils'

/**
 * Adapter for generic use of {@link PluginParameter[Type][Dynamic][Mode]} components
 *
 * @author Xavier-Alexandre Brochard
 */
export class GenericPluginParameter extends React.Component {

  static propTypes = pluginParameterComponentPropTypes

  static defaultProps = {
    mode: 'view',
  }

  render() {
    const { pluginParameter: { dynamic }, pluginParameterType, mode } = this.props

    switch (pluginParameterType && pluginParameterType.paramType) {
      case 'PRIMITIVE':
        switch (pluginParameterType.type) {
          case 'java.lang.String':
          case 'java.lang.Character':
            switch (mode) {
              case 'edit':
              case 'create':
              case 'copy':
                return dynamic ? <PluginParameterStringDynamicField {...this.props} /> : <PluginParameterStringStaticField {...this.props} />
              case 'view':
              default:
                return dynamic ? <PluginParameterStringDynamicView {...this.props} /> : <PluginParameterStringStaticView {...this.props} />
            }
          case 'java.lang.Byte':
          case 'java.lang.Integer':
          case 'java.lang.Long':
          case 'java.lang.Float':
          case 'java.lang.Double':
          case 'java.lang.Short':
            switch (mode) {
              case 'edit':
              case 'create':
              case 'copy':
                return dynamic ? <PluginParameterNumberDynamicField {...this.props} /> : <PluginParameterNumberStaticField {...this.props} />
              case 'view':
              default:
                return dynamic ? <PluginParameterNumberDynamicView {...this.props} /> : <PluginParameterNumberStaticView {...this.props} />
            }
          case 'java.lang.Boolean':
            return <PluginParameterBoolean {...this.props} />
          default:
            return <PluginParameterStringStaticView {...this.props} />
        }
      case 'PLUGIN':
        return <PluginParameterPlugin {...this.props} />
      default:
        return <PluginParameterStringStaticView {...this.props} />
    }
  }
}

export default GenericPluginParameter
