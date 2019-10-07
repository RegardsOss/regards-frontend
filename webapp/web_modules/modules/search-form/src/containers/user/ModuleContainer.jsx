/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import reduce from 'lodash/reduce'
import { connect } from '@regardsoss/redux'
import { UIDomain, CatalogDomain } from '@regardsoss/domain'
import { UIClient } from '@regardsoss/client'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { modulesManager } from '@regardsoss/modules'
import { modulesHelper } from '@regardsoss/modules-api'
import DatasetSelectionTypes from '../../domain/DatasetSelectionTypes'
import { resultsContextActions } from '../../clients/ResultsContextClient'
import ModuleConfiguration from '../../shapes/ModuleConfiguration'
import FormContainer from './FormContainer'
import ResultsContainer from './ResultsContainer'

/** Module pane state actions default instance */
const moduleExpandedStateActions = new UIClient.ModuleExpandedStateActions()

/**
 * Main container to display module form. It mainly handles the search itself by concatenating context query and current plugins query
 * @author Sébastien binda
 */
export class ModuleContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { id, conf }) {
    // build keys for module sub panes (both share the module id)
    const searchFormPaneKey = UIClient.ModuleExpandedStateActions.getPresentationModuleKey(modulesManager.AllDynamicModuleTypes.SEARCH_FORM, id)
    const searchResultsPaneKey = UIClient.ModuleExpandedStateActions.getPresentationModuleKey(modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS, id)
    return {
      dispatchCollapseForm: () => dispatch(moduleExpandedStateActions.setMinimized(searchFormPaneKey)),
      dispatchExpandResults: () => dispatch(moduleExpandedStateActions.setNormal(searchResultsPaneKey)),
      dispatchInitializeWithOpenedResults: () => {
        // 1 - compute expansible state from conf
        const searchFormExpansible = UIDomain.isModulePaneExpansible(get(conf, 'primaryPane'))
        const searchResultsExpansible = UIDomain.isModulePaneExpansible(get(conf, 'searchResults.primaryPane'))
        dispatch(moduleExpandedStateActions.initialize(searchFormPaneKey, searchFormExpansible, !searchFormExpansible))
        dispatch(moduleExpandedStateActions.initialize(searchResultsPaneKey, searchResultsExpansible, true))
      },
      dispatchUpdateSearchContext: newContextDiff => dispatch(resultsContextActions.updateResultsContext(id, newContextDiff)),
    }
  }

  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration.isRequired,
    // Set by mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchExpandResults: PropTypes.func.isRequired,
    dispatchCollapseForm: PropTypes.func.isRequired,
    dispatchInitializeWithOpenedResults: PropTypes.func.isRequired,
    dispatchUpdateSearchContext: PropTypes.func.isRequired,
  }


  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Get the default query and criterion for this form at initialization
   * @param {{type: string, selectedDatasets: [string], selectedModels: [number]}} dataset restrictions from module configuration
   * @return {{query:string, resultsCriteria:{*}} built context query and corresponding results context criteria
   */
  static buildContextQueryAndCriteria({ type, selectedDatasets, selectedModels }) {
    // 1 - Build a open search parameters for context restriction
    const parameters = []
    switch (type) {
      case DatasetSelectionTypes.DATASET_TYPE:
        parameters.push(new CatalogDomain.OpenSearchQueryParameter(
          CatalogDomain.OpenSearchQuery.TAGS_PARAM_NAME,
          selectedDatasets.filter(id => !!id)))
        break
      case DatasetSelectionTypes.DATASET_MODEL_TYPE:
        parameters.push(new CatalogDomain.OpenSearchQueryParameter(
          CatalogDomain.OpenSearchQuery.DATASET_MODEL_IDS_PARAM,
          selectedModels.filter(id => !!id).map(id => `${id}`))) // number to string array
        break
      default: // do nothin
    }
    const query = new CatalogDomain.OpenSearchQuery(null, parameters).toQueryString()
    return {
      query,
      resultsCriteria: query ? [{
        requestParameters: {
          [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]: query,
        },
      }] : [],
    }
  }

  /**
   * Gather all request parameters from plugins into an array of results context criteria
   * @param {*} pluginsState plugins state as key: {state, query: string}
   * @return {*} parameters list (may contain q, geometry, ...)
   */
  static buildResultsCriteria(pluginsState) {
    return reduce(pluginsState, (acc, { requestParameters }) => isNil(requestParameters) || isEmpty(requestParameters)
      ? acc
      : [...acc, { requestParameters }], [])
  }

  /**
   * Lifecycle method: component will mount. Initialize context query and state
   */
  componentWillMount = () => {
    const { dispatchUpdateSearchContext } = this.props
    // 1 - Prepare context query and corresponding results criteria
    const { query, resultsCriteria } = ModuleContainer.buildContextQueryAndCriteria(get(this.props.moduleConf, 'datasets', {}))
    // 2 - Initialize results context to set this context criteria if any (pre-filters results without searching)
    if (resultsCriteria.length) {
      // set this form criteria in otherFilters
      dispatchUpdateSearchContext({
        criteria: { otherFilters: resultsCriteria },
      })
    }

    // ModuleContainer.buildRequestParameters(contextQuery, {}),
    // 2 - Store context elements locally (avoids recomputing them later)
    this.setState({
      contextQuery: query,
      contextResultsCriteria: resultsCriteria,
    })
  }

  /**
   * On search callback: performs query update and shows results
   * @param {*} pluginsState map of plugins key with state
   * @param {boolean} isInitialization is initialization automatic research? (used to initialize the presentation panes states as they may not be
   * mounted yet)
   */
  onSearch = (pluginsState, isInitialization = false) => {
    const {
      dispatchCollapseForm, dispatchExpandResults,
      dispatchInitializeWithOpenedResults, dispatchUpdateSearchContext,
    } = this.props
    const { contextResultsCriteria } = this.state
    // 1 - Publish new criteria list in results tab (otherFilters part), and select results tab
    dispatchUpdateSearchContext({
      selectedTab: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          criteria: {
            otherFilters: [
              ...contextResultsCriteria, // TODO (PM 033 - documents rights): this would move in configuration filters, handled by search results module
              ...ModuleContainer.buildResultsCriteria(pluginsState),
            ],
          },
        },
      },
    })
    // 2 - Expand results and collapse form, when it is possible
    if (isInitialization) {
      dispatchInitializeWithOpenedResults()
    } else {
      dispatchCollapseForm()
      dispatchExpandResults()
    }
  }

  render() {
    const {
      project, appName, id, pluginsState,
      moduleConf: { preview, searchResult },
    } = this.props
    const { contextQuery } = this.state
    const { intl: { formatMessage } } = this.context
    return (
      <React.Fragment>
        {/* 1. Form */}
        <FormContainer
          contextQuery={contextQuery}
          pluginsState={pluginsState}
          onSearch={this.onSearch}
          {...modulesHelper.getReportedUserModuleProps(this.props)}
        />
        {/* 2. Results, when not in preview */ }
        <ResultsContainer
          resultsModuleTitle={formatMessage({ id: 'results.module.title' })}
          preview={preview}
          id={id}
          appName={appName}
          project={project}
          searchResultsConfiguration={searchResult}
        />
      </React.Fragment>
    )
  }
}

export default connect(null, ModuleContainer.mapDispatchToProps)(ModuleContainer)
