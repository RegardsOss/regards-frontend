/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import map from 'lodash/map'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { grey400 } from 'material-ui/styles/colors'
/*

interface UserListProps {
  subheader?: string | JSX.Element
  items?: Array<any>,
  rightButtonIcon?: JSX.Element,
  menuElements?: Array<JSX.Element>,
}
*/

const defaultRightButtonIcon = <MoreVertIcon color={grey400} />

/**
 * A generic list of users
 * You can pass an array of JSX menuElements.
 * If so, a button will be displayed of the right of each list item, popping up a dropdown menu.
 * You can also specify the icon used for this button through leftButtonIcon
 *
 * @prop subheader The subheader string that will be displayed at the top of the list.
 * @prop items The collection of users to be displayed in the list
 * @prop rightButtonIcon Optionally specify the left button icon you want to use. MoreVertIcon is default
 * @prop menuElements The list of JSX elements to populate the menu. If empty, no left button will be displayed
 */
function UserList(props) {
  // Shortcut if no items
  if (props.items.length === 0) return null

  // Define the right button displayed in each item of the list
  const rightButton = (
    <IconButton touch>
      {props.rightButtonIcon || defaultRightButtonIcon}
    </IconButton>
  )
  const style = { horizontal: 'left', vertical: 'top' }
  const rightIconMenu = (
    <IconMenu
      iconButtonElement={rightButton}
      anchorOrigin={style}
      targetOrigin={style}
    >
      {props.menuElements}
    </IconMenu>
  )

  // Build the list
  const items = map(props.items, (item, key) =>
    (<ListItem
      key={key}
      disabled
      rightIconButton={props.menuElements ? rightIconMenu : null}
      primaryText={item.name}
    />))

  return (
    <List>
      <Subheader>{props.subheader}</Subheader>
      {items}
    </List>
  )
}
UserList.propTypes = {
  subheader: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  rightButtonIcon: PropTypes.element,
  menuElements: PropTypes.arrayOf(PropTypes.element),
}
export default UserList
