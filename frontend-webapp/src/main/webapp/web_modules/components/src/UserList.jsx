import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import { map } from 'lodash'
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
  const rightIconMenu = (
    <IconMenu
      iconButtonElement={rightButton}
      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
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
    />),
  )

  return (
    <List>
      <Subheader>{props.subheader}</Subheader>
      {items}
    </List>
  )
}
UserList.propTypes = {
  subheader: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]).isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)),
  rightButtonIcon: React.PropTypes.element,
  menuElements: React.PropTypes.arrayOf(React.PropTypes.element),
}
export default UserList
