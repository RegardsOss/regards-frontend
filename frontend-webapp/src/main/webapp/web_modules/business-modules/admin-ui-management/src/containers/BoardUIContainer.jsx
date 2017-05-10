/**
 * LICENSE_PLACEHOLDER
 **/
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import BoardUIComponent from '../components/BoardUIComponent'

/**
 * Module container to display the list of applications.
 * @author Sébastien binda
 */
export class BoardUIContainer extends React.Component {

  static propTypes = {
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    return (
      <I18nProvider messageDir="business-modules/admin-ui-management/src/i18n">
        <BoardUIComponent project={this.props.params.project} />
      </I18nProvider>
    )
  }
}

export default BoardUIContainer
