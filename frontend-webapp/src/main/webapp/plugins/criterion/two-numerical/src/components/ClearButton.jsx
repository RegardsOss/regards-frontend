/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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
    onTouchTap={onTouchTap}
  >
    <Clear />
  </IconButton>
)

ClearButton.propTypes = {
  onTouchTap: React.PropTypes.func,
  displayed: React.PropTypes.bool,
}

export default ClearButton
