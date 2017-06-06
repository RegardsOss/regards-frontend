/**
 * LICENSE_PLACEHOLDER
 **/
import { ListItem } from 'material-ui/List'
import { pluginParameterComponentPropTypes } from '../utils'


/**
 * Renders a plugin parameter which is
 * - dynamic
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
const PluginParameterNumberDynamicView = ({ pluginParameter, ...rest }) => <ListItem>{pluginParameter.name}: {pluginParameter.value}</ListItem>

PluginParameterNumberDynamicView.propTypes = pluginParameterComponentPropTypes

export default PluginParameterNumberDynamicView
