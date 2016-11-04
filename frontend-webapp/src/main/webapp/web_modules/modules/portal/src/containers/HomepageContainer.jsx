
import { I18nProvider } from '@regardsoss/i18n'
import ComposedInjector from '@regardsoss/injector'
import HomepageComponent from '../components/HomepageComponent'

/**
 */
export class HomepageContainer extends React.Component {

  render() {
    const { params, newsList, projects } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-management/src/i18n">
        <ComposedInjector >
          <HomepageComponent
            theme={null}
            intl={null}
            params={params}
            newsList={newsList}
            projects={projects}
          />
        </ComposedInjector>
      </I18nProvider>
    )
  }
}
HomepageContainer.propTypes = {
  params: React.PropTypes.objectOf(React.PropTypes.string),
  newsList: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)),
  projects: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)),
}
/*
 interface HomepageProps {
 // From Router
 params: any
 newsList: any
 projects: any
 }*/
export default HomepageContainer
