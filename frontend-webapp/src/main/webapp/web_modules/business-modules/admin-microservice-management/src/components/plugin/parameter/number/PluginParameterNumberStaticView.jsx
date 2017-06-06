/**
 * LICENSE_PLACEHOLDER
 **/
import { ListItem } from 'material-ui/List'
import { pluginParameterComponentPropTypes } from '../utils'

/**
 * Renders a plugin parameter which is
 * - static
 * - in view mode
 * - of types
 * 'java.lang.Byte'
 * 'java.lang.Integer'
 * 'java.lang.Long'
 * 'java.lang.Float'
 * 'java.lang.Double'
 * 'java.lang.Short'
 *
 * @author Xavier-Alexandre Brochard
 */
const PluginParameterNumberStaticView = ({ pluginParameter, ...rest }) => <ListItem>{pluginParameter.name}: {pluginParameter.value}</ListItem>

PluginParameterNumberStaticView.propTypes = pluginParameterComponentPropTypes

export default PluginParameterNumberStaticView
