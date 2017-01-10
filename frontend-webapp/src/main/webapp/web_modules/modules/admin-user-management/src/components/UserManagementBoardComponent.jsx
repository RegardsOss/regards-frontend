/**
 * LICENSE_PLACEHOLDER
 **/
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { BoardComponent } from '@regardsoss/components'
import UserManagementItems from './UserManagementBoardItems'
/**
 * Show the availables functionalities for user management.
 */
class UserManagementBoardComponent extends React.Component {
  static propTypes = {
    projectName: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const items = UserManagementItems(this.props.projectName, this.context.intl)
    return (
      <BoardComponent items={items} />
    )
  }
}


export default UserManagementBoardComponent

