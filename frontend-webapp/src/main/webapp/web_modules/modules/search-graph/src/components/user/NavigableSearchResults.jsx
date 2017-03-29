/**
* LICENSE_PLACEHOLDER
**/
import { LazyModuleComponent } from '@regardsoss/modules'
import ModuleConfiguration from '../../model/ModuleConfiguration'

/**
* Navigable search results: renders the results page (using search results module) synchronized with graph navigation
*/
class NavigableSearchResults extends React.Component {

  static propTypes = {
    appName: React.PropTypes.string,
    project: React.PropTypes.string,
    // Module configuration
    moduleConf: ModuleConfiguration.isRequired,
  }

  static defaultProps = {}

  render() {
    const { project, appName, moduleConf: { ...resultsConfiguration } } = this.props
    const module = {
      name: 'search-results',
      active: true,
      applicationId: this.props.appName,
      conf: {
        // TODO: search query for selected dataset
        // searchQuery: TODO (based on last selected dataset),
        // TODO also some custom navigation?
        ...resultsConfiguration,
      },
    }

    return (
      <LazyModuleComponent
        project={project}
        appName={appName}
        module={module}
      />
    )
  }
}
export default NavigableSearchResults
