/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { TagTypes, OpenSearchQuery } from '@regardsoss/domain/catalog'
import { AccessShapes, CatalogShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
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
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration.isRequired,
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    searchTag: CatalogShapes.Tag,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static getResultsConfigurationForTag(tag) {
    if (!tag) {
      return {}
    }
    let searchTag = null
    let singleDatasetIpId = null
    let description = null
    switch (tag.type) {
      case TagTypes.WORD:
        searchTag = tag.data
        description = tag.data
        break
      case TagTypes.DATASET: // dataset tag: retrieve entity label and IPID, and provide the dataset context to results module
        description = tag.data.content.label
        searchTag = tag.data.content.ipId
        singleDatasetIpId = searchTag
        break
      default: // any other entity: same working mode but no initial dataset
        description = tag.data.content.label
        searchTag = tag.data.content.ipId
    }
    const searchQuery = new OpenSearchQuery(null, [OpenSearchQuery.buildTagParameter(searchTag)]).toQueryString()
    return { searchQuery, description, singleDatasetIpId }
  }

  componentWillMount = () => this.onPropertiesChanged({}, this.props)

  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

  onPropertiesChanged = ({ searchTag }, { searchTag: newSearchTag, appName, moduleConf }) => {
    // compute tag related data
    const { searchQuery, description, singleDatasetIpId } = NavigableSearchResultsContainer.getResultsConfigurationForTag(newSearchTag)
    // store new results module configuration in state
    const resultsConfiguration = {
      type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
      active: true,
      applicationId: appName,
      description,
      conf: {
        ...moduleConf.searchResult, // results re use a part of this module configuration
        // configure query dataset context if any
        singleDatasetIpId,
        searchQuery,
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
