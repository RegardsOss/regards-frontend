import * as React from "react"
import { List, ListItem } from "material-ui/List"
import Subheader from "material-ui/Subheader"
import { map } from "lodash"
import IconMenu from "material-ui/IconMenu"
import IconButton from "material-ui/IconButton"
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert"
import { grey400 } from "material-ui/styles/colors"

interface UserListProps {
  subheader?: string | JSX.Element
  items?: Array<any>,
  rightButtonIcon?: JSX.Element,
  menuElements?: Array<JSX.Element>,
}

const defaultRightButtonIcon = <MoreVertIcon color={grey400}/>

/**
 * A generic list of users
 * You can pass an array of JSX menuElements.
 * If so, a button will be displayed of the right of each list item, popping up a dropdown menu.
 * You can also specify the icon used for this button through leftButtonIcon
 *
 * @prop {string} subheader The subheader string that will be displayed at the top of the list.
 * @prop {Array<User>} items The collection of users to be displayed in the list
 * @prop {JSX.Element} rightButtonIcon Optionally specifiy the left button icon you want to use. MoreVertIcon is default
 * @prop {Array<JSX.Element>} menuElements The list of JSX elements to populate the menu. If empty, no left button will be displayed
 */
class UserList extends React.Component<UserListProps, any> {
  render (): JSX.Element {
    // Shortcut if no items
    if (this.props.items.length === 0) return null

    // Define the right button displayed in each item of the list
    const rightButton = (
      <IconButton touch={true}>
        {this.props.rightButtonIcon || defaultRightButtonIcon}
      </IconButton>
    )
    const rightIconMenu = (
      <IconMenu
        iconButtonElement={rightButton}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}>
        {this.props.menuElements}
      </IconMenu>
    )

    // Build the list
    const items = map(this.props.items, (item, key) => {
      return <ListItem
        key={key}
        disabled={true}
        rightIconButton={this.props.menuElements ? rightIconMenu : null}
        primaryText={item.name}
      />
    })

    return (
      <List>
        <Subheader>{this.props.subheader}</Subheader>
        {items}
      </List>
    )
  }
}

export default UserList
