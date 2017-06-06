/**
 * LICENSE_PLACEHOLDER
 **/
import { ListItem } from 'material-ui/List'
import { pluginParameterComponentPropTypes } from '../utils'

/**
 * Renders plugin parameter which is
 * - static
 * - in display mode (not editable)
 * - of types
 * java.lang.String
 * java.lang.Character
 *
 * @author Xavier-Alexandre Brochard
 */
const PluginParameterStringStaticView = ({ pluginParameter, ...rest }) => <ListItem>{pluginParameter.name}: {pluginParameter.value.toString()}</ListItem>

PluginParameterStringStaticView.propTypes = pluginParameterComponentPropTypes

export default PluginParameterStringStaticView
