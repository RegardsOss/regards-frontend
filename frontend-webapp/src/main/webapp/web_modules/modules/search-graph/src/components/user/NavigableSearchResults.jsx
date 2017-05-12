/**
* LICENSE_PLACEHOLDER
**/
import reduce from 'lodash/reduce'
import { CatalogEntity } from '@regardsoss/model'
import { LazyModuleComponent } from '@regardsoss/modules'
import ModuleConfiguration from '../../model/ModuleConfiguration'

/**
* Navigable search results: renders the results page (using search results module) synchronized with graph navigation
*/
class NavigableSearchResults extends React.Component {

  static propTypes = {
    appName: PropTypes.string,
    project: PropTypes.string,
    searchQuery: PropTypes.string, // search query if a dataset is selected
    singleDatasetIpId: PropTypes.string,
    selectionPath: PropTypes.arrayOf(CatalogEntity),
    // Module configuration
    moduleConf: ModuleConfiguration.isRequired,
  }

  static defaultProps = {}

  render() {
    const { project, appName, searchQuery, selectionPath, singleDatasetIpId, moduleConf: { ...resultsConfiguration } } = this.props

    const breadcrumbLabel = reduce(selectionPath, (result, path) => {
      if (result !== '') {
        return `${result} / ${path.label}`
      }
      return path.label
    }, '')
    const module = {
      type: 'search-results',
      active: true,
      applicationId: this.props.appName,
      conf: {
        ...resultsConfiguration,
        searchQuery,
        singleDatasetIpId,
        breadcrumbInitialContextLabel: breadcrumbLabel,
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
