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
import { connect } from '@regardsoss/redux'
import { UIClient } from '@regardsoss/client'
import { TagTypes } from '@regardsoss/domain/catalog'
import { AccessShapes, CatalogShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { HorizontalAreasSeparator } from '@regardsoss/components'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import graphContextSelectors from '../../model/graph/GraphContextSelectors'
import ModuleConfiguration from '../../model/ModuleConfiguration'

/** Module pane state actions default instance */
const moduleExpandedStateActions = new UIClient.ModuleExpandedStateActions()

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
      dispatchExpandResults: () => dispatch(moduleExpandedStateActions.setNormal(modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS)),
      dispatchCollapseGraph: () => dispatch(moduleExpandedStateActions.setMinimized(modulesManager.AllDynamicModuleTypes.SEARCH_GRAPH)),
    }
  }

  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration.isRequired,
    // from mapStateToProps
    searchTag: CatalogShapes.Tag,
    // from map dispatch to props
    dispatchExpandResults: PropTypes.func.isRequired,
    dispatchCollapseGraph: PropTypes.func.isRequired,
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
      searchTag: newSearchTag, appName, moduleConf,
      dispatchExpandResults, dispatchCollapseGraph,
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
      // after updating state, expand results and close graph when the user selects a new tag
      if (searchTag !== newSearchTag && newSearchTag) {
        dispatchExpandResults()
        dispatchCollapseGraph()
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
      description: resultsConfiguration.conf.initialContextTags.length ? null : formatMessage({ id: 'search.graph.results.title.without.tag' }),
    }
    return (
      <React.Fragment>
        <HorizontalAreasSeparator />
        <LazyModuleComponent
          project={project}
          appName={appName}
          module={configurationWithI18N}
        />
      </React.Fragment>
    )
  }
}
export default connect(
  NavigableSearchResultsContainer.mapStateToProps,
  NavigableSearchResultsContainer.mapDispatchToProps)(NavigableSearchResultsContainer)
