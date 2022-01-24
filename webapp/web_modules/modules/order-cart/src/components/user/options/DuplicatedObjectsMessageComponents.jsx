/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import MessageIcon from 'mdi-material-ui/HelpCircle'
import { themeContextType } from '@regardsoss/theme'

/**
 * Option to show duplicated objects explanation message
 * @author Raphaël Mechali
 */
class DuplicatedObjectsMessageComponents extends React.Component {
  static propTypes = {
    totalObjectsCount: PropTypes.number.isRequired,
    effectiveObjectsCount: PropTypes.number.isRequired,
    // callback to show message: (totalCount, effectiveCount) => ()
    onShowDuplicatedMessage: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Callback: user clicked message button
   */
  onShowMessage = () => {
    const { totalObjectsCount, effectiveObjectsCount, onShowDuplicatedMessage } = this.props
    onShowDuplicatedMessage(totalObjectsCount, effectiveObjectsCount)
  }

  render() {
    const { totalObjectsCount, effectiveObjectsCount } = this.props
    const {
      moduleTheme: { user: { duplicateMessage: { iconStyle, iconButtonStyle } } },
    } = this.context

    if (totalObjectsCount === effectiveObjectsCount) {
      // This component is hidden when there is no difference
      return null
    }
    return (
      <div>
        <IconButton
          style={iconButtonStyle}
          iconStyle={iconStyle}
          onClick={this.onShowMessage}
        >
          <MessageIcon />
        </IconButton>
      </div>
    )
  }
}
export default DuplicatedObjectsMessageComponents
