/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { TagTypes } from '@regardsoss/domain/catalog'
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
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      searchTag: graphContextSelectors.getSearchTag(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      dispatchExpandResults: () => console.error('Implement me'), // TODO
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
    // from map dispatch to props
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchExpandResults: PropTypes.func.isRequired,
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

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { searchTag } = oldProps
    const {
      searchTag: newSearchTag, appName, moduleConf, dispatchExpandResults,
    } = newProps

    // compute tag related data
    const initialContextTags = NavigableSearchResultsContainer.getInitialContextTags(newSearchTag)
    // store new results module configuration in state
    const resultsConfiguration = {
      type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
      active: true,
      applicationId: appName,
      // should force opening the results module (on tag selection)
      conf: {
        ...moduleConf.searchResult, // results re use a part of this module configuration
        // configure query dataset context if any
        initialContextTags,
      },
    }

    this.setState({ resultsConfiguration }, () => {
      // after updating state, expand results when the user selects a new tag
      if (searchTag !== newSearchTag && newSearchTag) {
        dispatchExpandResults()
      }
    })
  }

  render() {
    const { project, appName } = this.props
    const { resultsConfiguration } = this.state
    const { intl: { formatMessage } } = this.context

    const configurationWithI18N = {
      ...resultsConfiguration,
      // module description: configure only when there is no initial context tag (root label should be tag otherwise)
      description: resultsConfiguration.initialContextTags.length ? null : formatMessage({ id: 'search.graph.results.title.without.tag' }),
    }
    return (
      <div>
        <HorizontalAreasSeparator />
        <LazyModuleComponent
          project={project}
          appName={appName}
          module={configurationWithI18N}
        />
      </div>
    )
  }
}
export default connect(
  NavigableSearchResultsContainer.mapStateToProps,
  NavigableSearchResultsContainer.mapDispatchToProps)(NavigableSearchResultsContainer)
