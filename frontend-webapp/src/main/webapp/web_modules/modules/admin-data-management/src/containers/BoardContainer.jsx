import { I18nProvider } from '@regardsoss/i18n'
import BoardComponent from '../components/BoardComponent'

export class BoardContainer extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
  }
  render() {
    const { params: { project } } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-management/src/i18n">
        <BoardComponent projectName={project} />
      </I18nProvider>
    )
  }
}

export default BoardContainer
