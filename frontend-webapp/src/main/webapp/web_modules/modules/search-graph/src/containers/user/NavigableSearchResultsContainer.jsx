/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { TagTypes, OpenSearchQuery } from '@regardsoss/domain/catalog'
import { CatalogShapes } from '@regardsoss/shape'
import { HorizontalAreasSeparator } from '@regardsoss/components'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import graphContextSelectors from '../../model/graph/GraphContextSelectors'
import ModuleConfiguration from '../../model/ModuleConfiguration'

/**
* Navigable search results container: connect results to current search tag in graph (dataset or tag)
*/
export class NavigableSearchResultsContainer extends React.Component {
  static mapStateToProps(state) {
    return {
      searchTag: graphContextSelectors.getSearchTag(state),
    }
  }

  static propTypes = {
    appName: PropTypes.string,
    project: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    moduleConf: ModuleConfiguration.isRequired,
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    searchTag: CatalogShapes.Tag,
  }

  static getResultsConfigurationForTag(tag) {
    if (!tag) {
      return null
    }
    let searchTag = null
    let singleDatasetIpId = null
    let breadcrumbInitialContextLabel = null
    switch (tag.type) {
      case TagTypes.WORD:
        searchTag = tag.data
        breadcrumbInitialContextLabel = tag.data
        break
      case TagTypes.DATASET: // dataset tag: retrieve entity label and IPID, and provide the dataset context to results module
        breadcrumbInitialContextLabel = tag.data.content.label
        searchTag = tag.data.content.ipId
        singleDatasetIpId = searchTag
        break
      default: // any other entity: same working mode but no initial dataset
        breadcrumbInitialContextLabel = tag.data.content.label
        searchTag = tag.data.content.ipId
    }

    const searchQuery = new OpenSearchQuery(null, [OpenSearchQuery.buildTagParameter(searchTag)]).toQueryString()
    return { searchQuery, breadcrumbInitialContextLabel, singleDatasetIpId }
  }

  componentWillMount = () => this.onPropertiesChanged({}, this.props)

  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

  onPropertiesChanged = ({ searchTag }, { searchTag: newSearchTag, appName, moduleConf }) => {
    // store new results module configuration in state
    const resultsConfiguration = {
      type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
      active: true,
      applicationId: appName,
      conf: {
        showDatasets: false,
        ...moduleConf, // results re use a part of this module configuration
        // configure query, label and dataset context if any
        ...NavigableSearchResultsContainer.getResultsConfigurationForTag(newSearchTag),
      },
    }

    this.setState({ resultsConfiguration })
  }

  render() {
    const { project, appName, searchTag } = this.props
    const { resultsConfiguration } = this.state
    return searchTag ? (
      <div>
        <HorizontalAreasSeparator />
        <LazyModuleComponent
          project={project}
          appName={appName}
          module={resultsConfiguration}
        />
      </div>
    ) : null
  }
}
export default connect(NavigableSearchResultsContainer.mapStateToProps)(NavigableSearchResultsContainer)
