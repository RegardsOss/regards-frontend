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
    searchQuery: React.PropTypes.string, // search query if a dataset is selected
    // Module configuration
    moduleConf: ModuleConfiguration.isRequired,
  }

  static defaultProps = {}

  render() {
    const { project, appName, searchQuery, moduleConf: { ...resultsConfiguration } } = this.props
    const module = {
      name: 'search-results',
      active: true,
      applicationId: this.props.appName,
      conf: {
        ...resultsConfiguration,
        searchQuery,
        hideDatasets: true,
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
