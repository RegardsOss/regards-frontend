/**
 * LICENSE_PLACEHOLDER
 **/
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { BoardComponent } from '@regardsoss/components'
import AccessRightManagementBoardItems from './AccessRightManagementBoardItems'
/**
 * Show the availables functionalities for user management.
 */
class AccessRightManagementBoardComponent extends React.Component {
  static propTypes = {
    projectName: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const items = AccessRightManagementBoardItems(this.props.projectName, this.context.intl)
    return (
      <BoardComponent items={items} />
    )
  }
}


export default AccessRightManagementBoardComponent

