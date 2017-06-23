/**
 * LICENSE_PLACEHOLDER
 **/
import IconButton from 'material-ui/IconButton'
import Clear from 'material-ui/svg-icons/content/clear'
import React from 'react'
import { FormattedMessage } from 'react-intl'

/**
 * Button used to clear the input values of a plugin. It scales up from hidden to displayed with a smooth animation
 * @author Xavier-Alexandre Brochard
 */
const ClearButton = ({ onTouchTap, displayed, onClick }) => (
  <IconButton
    tooltip={<FormattedMessage id="criterion.clear"/>}
    style={{ transform: `scale(${displayed ? 1 : 0})` }}
  >
    <Clear
      onClick={onClick}
      onTouchTap={onTouchTap}/>
  </IconButton>
)

ClearButton.propTypes = {
  onTouchTap: React.PropTypes.func,
  displayed: React.PropTypes.bool,
}

export default ClearButton
