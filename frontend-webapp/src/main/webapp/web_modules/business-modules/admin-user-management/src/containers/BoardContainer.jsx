/**
 * LICENSE_PLACEHOLDER
 **/
import { I18nProvider } from '@regardsoss/i18n'
import UserManagementBoardComponent from '../components/UserManagementBoardComponent'

/**
 * Display user management functionalities
 */
export class BoardContainer extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
  }
  render() {
    const { params: { project } } = this.props
    return (
      <I18nProvider messageDir="business-modules/admin-user-management/src/i18n">
        <UserManagementBoardComponent projectName={project} />
      </I18nProvider>
    )
  }
}

export default BoardContainer
