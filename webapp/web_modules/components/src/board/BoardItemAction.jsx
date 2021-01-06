/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import BoardActionShape from './BoardActionShape'

/**
 * Action displayed in boadItem
 *
 * @author Sébastien Binda
 */
class BoardItemAction extends React.Component {
  static propTypes = {
    action: BoardActionShape.isRequired,
    openConfirmDialog: PropTypes.func,
  }

  UNSAFE_componentWillMount() {
    if (this.props.action.initialize) {
      this.props.action.initialize()
    }
  }

  /**
   * User callback, open confirm dialog
   */
  onOpenConfirmDialog = () => {
    const { action, openConfirmDialog } = this.props
    openConfirmDialog(action)
  }

  render() {
    const { action } = this.props
    if (action.customRender) {
      return action.customRender
    }
    return (
      <IconButton
        tooltip={action.tooltipMsg}
        onClick={action.confirmMessage ? this.onOpenConfirmDialog : action.touchTapAction}
        className={action.className}
      >
        {action.icon}
      </IconButton>)
  }
}

export default BoardItemAction
