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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { UIDomain } from '@regardsoss/domain'
import { AccessShapes, UIShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { AccessProjectClient } from '@regardsoss/client'
import { modulesManager, LazyModuleComponent } from '@regardsoss/modules'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { DescriptionHelper } from '@regardsoss/entities-common'
import { resultsContextActions } from '../../../../clients/ResultsContextClient'
import { CriterionBuilder } from '../../../../definitions/CriterionBuilder'

// get default layout client selectors - required to check that containers are or not dynamic
const layoutSelectors = AccessProjectClient.getLayoutSelectors()
// get default modules client selectors - required to check that a description module exist and is not dynamic
const modulesSelectors = AccessProjectClient.getModuleSelectors()

/**
 * Resolves description container and shows it for current results context when available
 * @author Raphaël Mechali
 */
export class DescriptionContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { moduleId }) {
    return {
      // bind available dependencies to evaluate user access rights to entities models
      availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
      // bind modules list
      modules: modulesSelectors.getList(state),
      // bind dynamic container ID (we need the module to be any container BUT THAT ONE)
      dynamicContainerId: layoutSelectors.getDynamicContainerId(state),
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
      updateResultsContext: (moduleId, stateDiff) => dispatch(resultsContextActions.updateResultsContext(moduleId, stateDiff)),
    }
  }

  static propTypes = {
    moduleId: PropTypes.number.isRequired,
    project: PropTypes.string.isRequired,
    appName: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    resultsContext: UIShapes.ResultsContext.isRequired, // used only in onPropertiesUpdated
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    availableDependencies: PropTypes.arrayOf(PropTypes.string), // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    modules: AccessShapes.ModuleList, // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    dynamicContainerId: PropTypes.string, // used only in onPropertiesUpdated
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
  }

  /** Initial state */
  state = {
    descriptionModule: null, // found description module
    descriptionModuleProperties: null, // merged module properties with runtime properties, usable at render
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
   * Properties change detected: update description module runtime properties
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // when user rights changed, layout changed or modules list changed, recompute if the
    // description is available
    const {
      appName, availableDependencies, dynamicContainerId,
      modules, resultsContext,
    } = newProps

    // 1 - Update linked description module
    let { descriptionModule } = this.state
    if (!isEqual(oldProps.availableDependencies, availableDependencies)
      || !isEqual(oldProps.dynamicContainerId, dynamicContainerId)
      || !isEqual(oldProps.modules, modules)) {
      descriptionModule = get(DescriptionHelper.getFirstDescriptionModule(
        availableDependencies, dynamicContainerId, modules), 'content', null)
    }

    // 2 - Update linked description module properties
    const descriptionState = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]
    const oldDescriptionState = get(oldProps.resultsContext, `tabs.${UIDomain.RESULTS_TABS_ENUM.DESCRIPTION}`, {})

    // 3 - When module or path changed, update state to store them and pre computed module properties
    if (!isEqual(this.state.descriptionModule, descriptionModule)
      || !isEqual(oldDescriptionState, descriptionState)) {
      this.setState({
        descriptionModule,
        descriptionModuleProperties: descriptionModule ? {
          id: descriptionModule.id,
          type: modulesManager.AllDynamicModuleTypes.DESCRIPTION,
          active: true,
          applicationId: appName,
          conf: {
            ...descriptionModule.conf,
            // add runtime render data
            runtime: {
              // report state
              descriptionPath: descriptionState.descriptionPath,
              selectedIndex: descriptionState.selectedIndex,
              // provide callbacks
              setDescriptionPath: this.setDescriptionPath,
              onSearchWord: this.onSearchWord,
              onSearchEntity: this.onSearchEntity,
            },
          },
        } : null,
      })
    }
  }

  /**
   * On set description path from description: updates description path in results context
   * @param {[*]} newPath as an array of CatalogShapes.Entity
   * @param {number} selectedIndex selected index in path
   */
  setDescriptionPath = (newPath, selectedIndex) => {
    const { moduleId, updateResultsContext } = this.props
    updateResultsContext(moduleId, {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
          // mute any previous value of unresolvedRootEntityId
          unresolvedRootEntityId: null,
          descriptionPath: newPath,
          selectedIndex,
        },
      },
    })
  }

  /**
   * On search word tag from description callback: searches word in tags tab
   * @param {string} word tag
   */
  onSearchWord = (word) => this.onOpenTagResults(CriterionBuilder.buildWordTagCriterion(word))

  /**
   * On search entity tag from description callback: searches entity in tags tab
   * @param {*} entity matching CatalogShapes.entity
   */
  onSearchEntity = (entity) => this.onOpenTagResults(CriterionBuilder.buildEntityTagCriterion(entity))

  /**
   * Open tag results callback
   * @param initialTag initial tag to show for tag results
   */
  onOpenTagResults = (initialTag) => {
    const { moduleId, updateResultsContext } = this.props
    updateResultsContext(moduleId, {
      selectedTab: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
          criteria: {
            configurationRestrictions: [],
            contextTags: [initialTag],
            searchCriteria: [],
            appliedFacets: [],
            geometry: [],
            entitiesSelection: [],
            tagsFiltering: [],
            requestFacets: [],
          },
        },
      },
    })
  }

  render() {
    const { project, appName } = this.props
    const { descriptionModuleProperties } = this.state
    if (!descriptionModuleProperties) {
      return null
    }
    return (
      <LazyModuleComponent
        project={project}
        appName={appName}
        module={descriptionModuleProperties}
      />
    )
  }
}
export default connect(
  DescriptionContainer.mapStateToProps,
  DescriptionContainer.mapDispatchToProps)(DescriptionContainer)
