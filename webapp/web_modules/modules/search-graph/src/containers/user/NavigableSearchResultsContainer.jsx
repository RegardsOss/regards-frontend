/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import isEqual from 'lodash/isEqual'
import { UIDomain, CatalogDomain } from '@regardsoss/domain'
import { AccessShapes, CatalogShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { UIClient } from '@regardsoss/client'
import { i18nContextType, i18nSelectors } from '@regardsoss/i18n'
import { HorizontalAreasSeparator } from '@regardsoss/components'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { resultsContextActions } from '../../clients/ResultsContextClient'
import graphContextSelectors from '../../model/graph/GraphContextSelectors'
import ModuleConfiguration from '../../model/ModuleConfiguration'

/** Module pane state actions default instance */
const moduleExpandedStateActions = new UIClient.ModuleExpandedStateActions()

/**
 * Navigable search results container: connect results to current search tag in graph (dataset or tag)
 * @author Raphaël Mechali
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
      locale: i18nSelectors.getLocale(state),
      searchTag: graphContextSelectors.getSearchTag(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, { id }) {
    const searchGraphPaneKey = UIClient.ModuleExpandedStateActions.getPresentationModuleKey(modulesManager.AllDynamicModuleTypes.SEARCH_GRAPH, id)
    const searchResultsPaneKey = UIClient.ModuleExpandedStateActions.getPresentationModuleKey(modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS, id)
    return {
      dispatchExpandResults: () => dispatch(moduleExpandedStateActions.setNormal(searchResultsPaneKey)),
      dispatchCollapseGraph: () => dispatch(moduleExpandedStateActions.setMinimized(searchGraphPaneKey)),
      dispatchUpdateResultsContext: stateDiff => dispatch(resultsContextActions.updateResultsContext(id, stateDiff)),
    }
  }

  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration.isRequired,
    // from mapStateToProps
    searchTag: CatalogShapes.Tag,
    locale: PropTypes.string, // used only in onPropertiesUpdated to update the module title
    // from map dispatch to props
    dispatchExpandResults: PropTypes.func.isRequired,
    dispatchCollapseGraph: PropTypes.func.isRequired,
    dispatchUpdateResultsContext: PropTypes.func.isRequired,
  }

  static DEFAULT_PROPS = {
    locale: UIDomain.LOCALES_ENUM.en,
  }

  static contextTypes = {
    ...i18nContextType,
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
    const {
      id, appName, moduleConf, searchTag, locale,
      dispatchExpandResults, dispatchCollapseGraph,
      dispatchUpdateResultsContext,
    } = newProps
    const { intl: { formatMessage } } = this.context

    // When any property used in module configuration changes, store new module configuration in state
    if (!isEqual(oldProps.id, id)
    || !isEqual(oldProps.appName, appName)
    || !isEqual(oldProps.moduleConf, moduleConf)
    || !isEqual(oldProps.searchTag, searchTag)
    || !isEqual(oldProps.locale, locale)) {
      this.setState({
        // results module configuration
        resultsConfiguration: {
          applicationId: appName,
          id,
          type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
          active: true,
          // set default title (used only when there is no root tag)
          description: formatMessage({ id: 'search.graph.results.title.without.tag' }),
          conf: moduleConf.searchResult,
        },
      }, () => {
        // after updating state:
        if (!isEqual(oldProps.searchTag, searchTag)) {
          // 1 - set context tags in driven results context
          // 1.a - build the new tag, when there is one
          let newResultsTag = null
          if (searchTag) {
            const label = searchTag.type === CatalogDomain.TAG_TYPES_ENUM.WORD ? searchTag.data : searchTag.data.content.label
            const searchKey = searchTag.type === CatalogDomain.TAG_TYPES_ENUM.WORD ? searchTag.data : searchTag.data.content.id
            newResultsTag = {
              type: searchTag.type,
              label,
              searchKey,
              requestParameters: {
                // restrict using q tag param
                [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]:
                  new CatalogDomain.OpenSearchQueryParameter(
                    CatalogDomain.OpenSearchQuery.TAGS_PARAM_NAME, searchKey).toQueryString(),
              },
            }
          }
          // 1.b - update context tags list (as it controlled by this container only, we replace it)
          dispatchUpdateResultsContext({
            criteria: {
              contextTags: newResultsTag ? [newResultsTag] : [],
              tags: [], // reset user tags list when changing context
            },
          })
          // 2 - When tag exists (ie it was not cleared), attempt graph collapsing and results opening
          if (searchTag) {
            dispatchExpandResults()
            dispatchCollapseGraph()
          }
        }
      })
    }
  }

  render() {
    const { project, appName } = this.props
    const { resultsConfiguration } = this.state
    return (
      <React.Fragment>
        <HorizontalAreasSeparator />
        <LazyModuleComponent
          project={project}
          appName={appName}
          module={resultsConfiguration}
        />
      </React.Fragment>
    )
  }
}
export default connect(
  NavigableSearchResultsContainer.mapStateToProps,
  NavigableSearchResultsContainer.mapDispatchToProps)(NavigableSearchResultsContainer)
