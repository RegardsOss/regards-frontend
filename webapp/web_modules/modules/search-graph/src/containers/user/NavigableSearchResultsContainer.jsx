/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import last from 'lodash/last'
import { UIDomain, CatalogDomain, DamDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { UIClient } from '@regardsoss/client'
import { HorizontalAreasSeparator } from '@regardsoss/components'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { OpenSearchQueryParameter } from '@regardsoss/domain/catalog'
import { SelectionPath } from '../../shapes/SelectionShape'
import ModuleConfiguration from '../../shapes/ModuleConfiguration'
import { resultsContextActions } from '../../clients/ResultsContextClient'
import graphContextSelectors from '../../model/graph/GraphContextSelectors'

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
      selectionPath: graphContextSelectors.getSelectionPath(state),
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
      dispatchUpdateResultsContext: (stateDiff) => dispatch(resultsContextActions.updateResultsContext(id, stateDiff)),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    resultsModuleTitle: PropTypes.string.isRequired, // eslint wont fix: rule issue (used in onPropertiesUpdated)
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    // eslint-disable-next-line react/no-unused-prop-types
    moduleConf: ModuleConfiguration.isRequired, // eslint wont fix: rule issue (used in onPropertiesUpdated)
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    selectionPath: SelectionPath.isRequired, // eslint wont fix: rule issue (used in onPropertiesUpdated)
    // from map dispatch to props
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchExpandResults: PropTypes.func.isRequired, // eslint wont fix: rule issue (used in onPropertiesUpdated)
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchCollapseGraph: PropTypes.func.isRequired, // eslint wont fix: rule issue (used in onPropertiesUpdated)
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchUpdateResultsContext: PropTypes.func.isRequired, // eslint wont fix: rule issue (used in onPropertiesUpdated)
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      id, appName, moduleConf, selectionPath, resultsModuleTitle,
      dispatchExpandResults, dispatchCollapseGraph,
      dispatchUpdateResultsContext,
    } = newProps
    // 1 - When any property used in module configuration changes, store new module configuration in state
    if (!isEqual(oldProps.id, id)
      || !isEqual(oldProps.appName, appName)
      || !isEqual(oldProps.moduleConf, moduleConf)
      || !isEqual(oldProps.resultsModuleTitle, resultsModuleTitle)) {
      this.setState({
        // results module configuration
        resultsConfiguration: {
          applicationId: appName,
          id,
          type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
          active: true,
          // set default title (used only when there is no root tag)
          description: resultsModuleTitle,
          conf: moduleConf.searchResult,
        },
      })
    }

    // 2 - When selected dataset changes, update context tag
    // retrieve last selected element
    let previousSelectedDatasetElt = last(oldProps.selectionPath || [])
    previousSelectedDatasetElt = previousSelectedDatasetElt && previousSelectedDatasetElt.entityType === DamDomain.ENTITY_TYPES_ENUM.DATASET
      ? previousSelectedDatasetElt : null
    let newSelectedDatasetElt = last(selectionPath)
    newSelectedDatasetElt = newSelectedDatasetElt && newSelectedDatasetElt.entityType === DamDomain.ENTITY_TYPES_ENUM.DATASET
      ? newSelectedDatasetElt : null
    if (!isEqual(previousSelectedDatasetElt, newSelectedDatasetElt)) {
      if (newSelectedDatasetElt) {
        // apply dataset as current filter (only when there is a dataset)
        dispatchUpdateResultsContext({
          selectedTab: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS, // show main results
          tabs: {
            [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: { // set dataset tag as single context text in main results
              criteria: {
                tagsFiltering: [{
                  type: newSelectedDatasetElt.entityType,
                  searchKey: newSelectedDatasetElt.id,
                  entity: { content: newSelectedDatasetElt },
                  requestParameters: {
                    // restrict using q tag param
                    [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]:
                      new CatalogDomain.OpenSearchQueryParameter(
                        CatalogDomain.OpenSearchQuery.SAPN.tags,
                        OpenSearchQueryParameter.toStrictStringEqual(newSelectedDatasetElt.id)).toQueryString(),
                  },
                }],
              },
            },
          },
        })
        // attempt collapsing graph and showing results
        dispatchExpandResults()
        dispatchCollapseGraph()
      }
    }
  }

  render() {
    const { project, appName } = this.props
    const { resultsConfiguration } = this.state
    return (
      <>
        <HorizontalAreasSeparator />
        <LazyModuleComponent
          project={project}
          appName={appName}
          module={resultsConfiguration}
        />
      </>
    )
  }
}
export default connect(
  NavigableSearchResultsContainer.mapStateToProps,
  NavigableSearchResultsContainer.mapDispatchToProps)(NavigableSearchResultsContainer)
