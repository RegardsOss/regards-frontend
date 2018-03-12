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

  /**
   * Returns initial context tags fro driven search results component
   * @param {*} tag search graph current tag
   */
  static getInitialContextTags(tag) {
    if (!tag) {
      return []
    }
    return [{
      type: tag.type,
      label: tag.type === TagTypes.WORD ? tag.data : tag.data.content.label,
      searchKey: tag.type === TagTypes.WORD ? tag.data : tag.data.content.ipId,
    }]
  }

  componentWillMount = () => this.onPropertiesChanged({}, this.props)

  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

  onPropertiesChanged = ({ searchTag }, { searchTag: newSearchTag, appName, moduleConf }) => {
    // compute tag related data
    const initialContextTags = NavigableSearchResultsContainer.getInitialContextTags(newSearchTag)
    // store new results module configuration in state
    const resultsConfiguration = {
      type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
      active: true,
      applicationId: appName,
      conf: {
        ...moduleConf.searchResult, // results re use a part of this module configuration
        // configure query dataset context if any
        initialContextTags,
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
