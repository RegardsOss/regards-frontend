/**
 * LICENSE_PLACEHOLDER
 **/
import { I18nProvider } from '@regardsoss/i18n'
import AccessRightManagementBoardComponent from '../components/AccessRightManagementBoardComponent'

/**
 * Display user management functionalities
 */
export class BoardContainer extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
  }
  render() {
    const { params: { project } } = this.props
    return (
      <I18nProvider messageDir="business-modules/admin-accessright-management/src/i18n">
        <AccessRightManagementBoardComponent projectName={project} />
      </I18nProvider>
    )
  }
}

export default BoardContainer
