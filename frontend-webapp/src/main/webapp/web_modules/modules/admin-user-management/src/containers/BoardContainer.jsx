import { I18nProvider } from '@regardsoss/i18n'
import BoardComponent from '../components/BoardComponent'

class BoardContainer extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
  }
  render() {
    const { params: { project } } = this.props
    console.log(project)
    return (
      <I18nProvider messageDir="modules/admin-user-management/src/i18n">
        <BoardComponent projectName={project} />
      </I18nProvider>
    )
  }
}

export default BoardContainer
