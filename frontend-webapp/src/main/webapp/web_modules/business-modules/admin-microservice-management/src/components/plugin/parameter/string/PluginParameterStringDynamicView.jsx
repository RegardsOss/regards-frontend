/**
 * LICENSE_PLACEHOLDER
 **/
import { ListItem } from 'material-ui/List'
import { pluginParameterComponentPropTypes } from '../utils'

/**
 * Renders a plugin parameter which is
 * - dynamic
 * - in edit/copy/create model
 * - of types
 * java.lang.String
 * java.lang.Character
 *
 * @author Xavier-Alexandre Brochard
 */
const PluginParameterStringDynamicView = ({ pluginParameter, ...rest }) => <ListItem>{pluginParameter.name}: {pluginParameter.value.toString()}</ListItem>

PluginParameterStringDynamicView.propTypes = pluginParameterComponentPropTypes

export default PluginParameterStringDynamicView
