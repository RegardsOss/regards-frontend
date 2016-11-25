import { I18nProvider } from '@regardsoss/i18n'
import NewsListContainer from '../news/containers/NewsListContainer'
import ProjectListComponent from '../projects/components/ProjectListComponent'
/**
 * Display news and project list on the homepage
 */
export class HomepageContainer extends React.Component {
  /**
   * @returns {React.Component}
   */
  render() {
    return (
      <I18nProvider messageDir="modules/portal/src/i18n">
        <div>
          <NewsListContainer />
          <ProjectListComponent />
        </div>
      </I18nProvider>
    )
  }
}

export default HomepageContainer
