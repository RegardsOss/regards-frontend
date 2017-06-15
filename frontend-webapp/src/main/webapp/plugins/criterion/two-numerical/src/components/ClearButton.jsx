/**
 * LICENSE_PLACEHOLDER
 **/
import { map, values } from 'lodash'
import IconButton from 'material-ui/IconButton'
import Clear from 'material-ui/svg-icons/content/clear'
import { FormattedMessage } from 'react-intl'

/**
 * Button used to clear the input values of a plugin. It scales up from hidden to displayed with a smooth animation
 * @author Xavier-Alexandre Brochard
 */
const ClearButton = ({ onTouchTap, displayed }) => (
  <IconButton
    tooltip={<FormattedMessage id="criterion.clear" />}
    style={{ transform: `scale(${displayed ? 1 : 0})` }}
  >
    <Clear onTouchTap={onTouchTap} />
  </IconButton>
)

export default ClearButton
