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
import get from 'lodash/get'
import map from 'lodash/map'
import { connect } from '@regardsoss/redux'
import { UIDomain, CatalogDomain } from '@regardsoss/domain'
import { UIClient } from '@regardsoss/client'
import { AccessShapes } from '@regardsoss/shape'
import { modulesManager } from '@regardsoss/modules'
import { modulesHelper } from '@regardsoss/modules-api'
import DatasetSelectionTypes from '../../domain/DatasetSelectionTypes'
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
  }

  /**
   * Get the default query for this form at initialization
   * @param {{type: string, selectedDatasets: [string], selectedModels: [number]}} dataset restrictions from module configuration
   * @return {string} built restrictive dataset context query or empty string
   */
  static buildRestrictiveQuery({ type, selectedDatasets, selectedModels }) {
    // 1 - convert selected datasets or models
    const restrictionParameters = []
    switch (type) {
      case DatasetSelectionTypes.DATASET_TYPE:
        // Build include tags parameters, let the parameter join dataset IDs on 'OR'
        restrictionParameters.push(new CatalogDomain.OpenSearchQueryParameter(CatalogDomain.OpenSearchQuery.TAGS_PARAM_NAME,
          selectedDatasets.filter(id => !!id)))
        break
      case DatasetSelectionTypes.DATASET_MODEL_TYPE:
        // Build dataset tags parameters model, convert IDs to string and let the parameter join dataset IDs on 'OR'
        restrictionParameters.push(new CatalogDomain.OpenSearchQueryParameter(CatalogDomain.OpenSearchQuery.DATASET_MODEL_IDS_PARAM,
          selectedModels.filter(id => !!id).map(id => `${id}`)))
        break
      default:
        // No restriction on datasets
    }
    return new CatalogDomain.OpenSearchQuery(null, restrictionParameters).toQueryString()
  }

  /**
   * Builds the fulle search query for context query and plugins state as parameter
   * @param {*} contextQuery context query, based on module configuration
   * @param {*} pluginsState plugins state as key: {state, query: string}
   */
  static buildFullQuery(contextQuery, pluginsState) {
    return new CatalogDomain.OpenSearchQuery(contextQuery,
      map(pluginsState, ({ query }) => new CatalogDomain.StaticQueryParameter(query))).toQueryString()
  }

  /**
   * Lifecycle method: component will mount. Initialize context query and state
   */
  componentWillMount = () => {
    const contextQuery = ModuleContainer.buildRestrictiveQuery(get(this.props.moduleConf, 'datasets', {}))
    this.setState({
      contextQuery, // stable as module properties cannot change without unmounting the component
      currentSearchQuery: contextQuery,
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
      dispatchCollapseForm, dispatchExpandResults, dispatchInitializeWithOpenedResults,
    } = this.props
    const { contextQuery } = this.state
    // 1 - Build query from plugins state and current query and set it in state
    const currentSearchQuery = ModuleContainer.buildFullQuery(contextQuery, pluginsState)
    this.setState({ currentSearchQuery })
    // 2 - Swap form hidden and results opened
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
      moduleConf: { datasets, preview, searchResult },
    } = this.props
    const { contextQuery, currentSearchQuery } = this.state
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
          preview={preview}
          id={id}
          appName={appName}
          project={project}
          searchResultsConfiguration={searchResult}
          searchQuery={currentSearchQuery}
          restrictedDatasetsIds={datasets.type === DatasetSelectionTypes.DATASET_TYPE ? datasets.selectedDatasets : null}
        />
      </React.Fragment>
    )
  }
}

export default connect(null, ModuleContainer.mapDispatchToProps)(ModuleContainer)
