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
import isEmpty from 'lodash/isEmpty'
import { connect } from '@regardsoss/redux'
import { UIDomain } from '@regardsoss/domain'
import { CatalogClient, AccessProjectClient, UIClient } from '@regardsoss/client'
import { AccessShapes, UIShapes } from '@regardsoss/shape'
import { AuthenticationClient, AuthenticationParametersSelectors } from '@regardsoss/authentication-utils'
import { modelAttributesActions } from '../../clients/ModelAttributesClient'
import { descriptionStateActions, descriptionStateSelectors } from '../../clients/DescriptionStateClient'
import { ModuleConfiguration } from '../../shapes/ModuleConfiguration'
import { DescriptionState } from '../../shapes/DescriptionState'
import MainModuleComponent from '../../components/user/MainModuleComponent'
import { DescriptionEntityHelper } from './DescriptionEntityHelper'
import { resultsContextActions } from '../../clients/ResultsContextClient'

/** Builds actions to fetch single entities */
const fetchEntityActions = new CatalogClient.SearchEntityActions('description-entity-resolver', true)

/** Builds actions to entity versions */
const fetchEntityVersionsActions = new CatalogClient.SearchEntityVersionsActions('description-entity-versions-resolver')

/** Common UI settings selectors */
const uiSettingsSelectors = AccessProjectClient.getUISettingsSelectors()

// default selector instance to get currently displayed dynamic module ID
const selectedDynamicModuleIdSelectors = UIClient.getSelectedDynamicModuleSelectors()

/**
 * Module container: instantiated as first module component it:
 * - Hides automatically when it is default instance (shadow module) built automatically by front-end.
 * - Shows when it has complete runtime data (instances created by specific modules hosting this one)
 * - Resolves changes and update local description Redux state when requested description path, from runtime properties, changes
 * @author Raphaël Mechali
 */
export class UserContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      descriptionState: descriptionStateSelectors.getDescriptionState(state),
      settings: uiSettingsSelectors.getSettings(state),
      accessToken: AuthenticationClient.authenticationSelectors.getAccessToken(state),
      projectName: AuthenticationParametersSelectors.getProject(state),
      pageModuleId: selectedDynamicModuleIdSelectors.getDynamicModuleId(state),
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
      setModuleDescriptionPath: (path) => dispatch(descriptionStateActions.setDescriptionPath(path)),
      setSelectedTreeEntry: (entityIndex, treeEntry) => dispatch(descriptionStateActions.setSelectedTreeEntry(entityIndex, treeEntry)),
      fetchEntity: (id) => dispatch(fetchEntityActions.getEntity(id)),
      fetchAllEntityVersions: (id, type) => dispatch(fetchEntityVersionsActions.fetchAllVersions(id, type)),
      fetchModelAttributes: (modelName) => dispatch(modelAttributesActions.fetchEntityList({ modelName })),
      updateResultsContext: (moduleId, stateDiff) => dispatch(resultsContextActions.updateResultsContext(moduleId, stateDiff)),
    }
  }

  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration.isRequired,
    // from map state to props
    descriptionState: DescriptionState.isRequired,
    settings: UIShapes.UISettings.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    accessToken: PropTypes.string, // eslint wont fix: rule broken, used in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    projectName: PropTypes.string.isRequired, // eslint wont fix: rule broken, used in onPropertiesUpdated
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    fetchEntity: PropTypes.func.isRequired, // eslint wont fix: rule broken, used in onDescriptionRequestUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    fetchModelAttributes: PropTypes.func.isRequired, // eslint wont fix: rule broken, used in onDescriptionRequestUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    fetchAllEntityVersions: PropTypes.func.isRequired, // eslint wont fix: rule broken, used in onDescriptionRequestUpdated
    setSelectedTreeEntry: PropTypes.func.isRequired,
    setModuleDescriptionPath: PropTypes.func.isRequired,
    updateResultsContext: PropTypes.func.isRequired,
    pageModuleId: PropTypes.number,
  }

  /**
   * Constructor. Used here to infer shadow module status of this instance and a promiseBulkId (see onDescriptionRequestUpdated)
   * @param {*} props props
   */
  constructor(props) {
    super(props)
    this.shadowModule = !props.moduleConf.runtime
    this.descriptionUpdateGroupId = 0
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
    if (this.shadowModule) {
      return
    }

    const { accessToken, projectName, moduleConf: { runtime: { selectedIndex, descriptionPath } } } = newProps
    const { accessToken: oldAccessToken, projectName: oldProjectName, moduleConf: oldModuleConf } = oldProps
    const oldDescriptionPath = get(oldModuleConf, 'runtime.descriptionPath', [])
    if (!isEqual(accessToken, oldAccessToken)
    || !isEqual(projectName, oldProjectName)) {
      // 1. When project / token change, rebuild all from scratch
      this.onDescriptionRequestUpdated(newProps, true)
    } else if (!isEqual(oldDescriptionPath, descriptionPath)) {
      // 2. Path changed, rebuild new elements and reuse previous ones when unchanged
      this.onDescriptionRequestUpdated(newProps, false)
    }

    const oldSelectedTreeEntry = get(oldProps, `descriptionState.descriptionPath[${selectedIndex}].entityWithTreeEntry.selectedTreeEntry`, {})
    const newSelectedTreeEntry = get(newProps, `descriptionState.descriptionPath[${selectedIndex}].entityWithTreeEntry.selectedTreeEntry`, {})
    if (!isEmpty(newSelectedTreeEntry) && !isEmpty(newProps.descriptionState.descriptionPath) && !isEqual(oldSelectedTreeEntry, newSelectedTreeEntry)) {
      this.onSelectedTreeUpdated(newProps)
    }
  }

  /**
   * Selectred tree change detected: update result context
   * @param newProps next component properties
   */
  onSelectedTreeUpdated = (newProps) => {
    const { moduleConf: { runtime: { selectedIndex } } } = newProps
    const { pageModuleId, updateResultsContext } = this.props
    updateResultsContext(pageModuleId, {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
          descriptionPath: newProps.descriptionState.descriptionPath.map((pathEntity) => ({ entity: pathEntity.entityWithTreeEntry.entity, selectedTreeEntry: pathEntity.entityWithTreeEntry.selectedTreeEntry })),
          selectedIndex,
        },
      },
    })
  }

  /**
   * On description path updated: update resolved models list and updates state
   * @param {*} newDescriptionState component properties to consider,
   * @param {boolean} reloading true when reloading on inner event: in such case, index in path should be preseved and all entities should be updated
   */
  onDescriptionRequestUpdated = ({
    accessToken, projectName, descriptionState, settings,
    moduleConf: { runtime: { selectedIndex, descriptionPath }, ...moduleConfiguration },
    fetchModelAttributes, fetchEntity, fetchAllEntityVersions, setModuleDescriptionPath,
  }, reloading) => {
    // A - Mark loading the elements that need to be reloaded
    const loadingDescriptionPath = descriptionPath.map((entityWithTreeEntry) => {
      const { entity } = entityWithTreeEntry
      const previousDescriptionModel = reloading ? null
        : descriptionState.descriptionPath.find((descriptionEntity) => descriptionEntity.entityWithTreeEntry.entity.content.id === entity.content.id)
      // fallback on initial loading model when reloading or not found
      return previousDescriptionModel || DescriptionEntityHelper.buildLoadingModel(entityWithTreeEntry)
    })
    setModuleDescriptionPath(loadingDescriptionPath)

    // B - For each loading element, start a resolution promise that will update resolved entity
    // Nota: to handle promises concurrency, we ugrade here the promises group ID
    this.descriptionUpdateGroupId += 1
    loadingDescriptionPath.forEach((descriptionEntity) => {
      if (descriptionEntity.loading) {
        // start loading entities that required it through helper promise (should never enter in catch case)
        DescriptionEntityHelper.resolveDescriptionEntity(
          moduleConfiguration, descriptionEntity, settings,
          fetchEntity, fetchAllEntityVersions, fetchModelAttributes,
          accessToken, projectName, this.descriptionUpdateGroupId)
          .then(this.onDescriptionEntityResolved)
      }
    })
  }

  /**
   * Description entity was resolved, replace it in description state (if it is still in the last update group)
   * @param {descriptionEntity: {*}, descriptionUpdateGroupId} resolution data, where description entity is the resolved entity and descriptionUpdateGroupId is
   * the identifier of the promises group
   */
  onDescriptionEntityResolved = ({ descriptionEntity, descriptionUpdateGroupId }) => {
    const { descriptionState, setModuleDescriptionPath } = this.props
    if (this.descriptionUpdateGroupId === descriptionUpdateGroupId) {
      setModuleDescriptionPath(descriptionState.descriptionPath
        .map((pathEntity) => pathEntity.entityWithTreeEntry.entity.content.id === descriptionEntity.entityWithTreeEntry.entity.content.id ? descriptionEntity : pathEntity))
    }
  }

  /**
   * User callback: user clicked on a tree inner link (pointed out by section and child index), propagate its
   * selection when not already selected
   * @param {string} section section identifier from BrowisingSection.BROWSING_SECTIONS_ENUM
   * @param {number} child selected child index (do not provide it when section is selected)
   */
  onSelectInnerLink = (section, child) => {
    const { moduleConf: { runtime: { selectedIndex } }, descriptionState, setSelectedTreeEntry } = this.props
    const { entityWithTreeEntry: { selectedTreeEntry } } = descriptionState.descriptionPath[selectedIndex]
    if (selectedTreeEntry.section !== section || selectedTreeEntry.child !== child) {
      setSelectedTreeEntry(selectedIndex, { section, child })
    }
  }

  /**
   * User callback: user clicked on a tree outer link (entity)
   * @param {*} entity matching CatalogShapes.Entity
   */
  onSelectEntityLink = (entity) => {
    const { moduleConf: { runtime: { descriptionPath, selectedIndex, setDescriptionPath } } } = this.props
    // 1 - algorithm:
    // a - if entity is already in path, just "jump" to that entity
    // b - otherwise, keep elements in path up to the current index and replace end with the new entity
    const foundEntityIndex = descriptionPath.findIndex((pathEntityWithTreeEntry) => pathEntityWithTreeEntry.entity.content.id === entity.content.id)
    if (foundEntityIndex >= 0) {
      // 1.a - Yes: just update the displayed index
      setDescriptionPath(descriptionPath, foundEntityIndex)
    } else {
      // 1.b - No: add it and set index to last element (new one)
      setDescriptionPath([...descriptionPath.slice(0, selectedIndex + 1), {
        entity,
        selectedTreeEntry: {
          section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS,
          child: null,
        },
      }], selectedIndex + 1)
    }
  }

  /**
   * User callback: one breadcrumb element was clicked, update selected entity index
   * @param {number} index selected entity index in description path
   */
  onSelectEntityIndex = (index) => {
    const { moduleConf: { runtime: { selectedIndex, descriptionPath, setDescriptionPath } } } = this.props
    if (index !== selectedIndex) {
      // Notify parent module to update selected entity index in current path
      setDescriptionPath(descriptionPath, index)
    }
  }

  /**
   * Is description allowed for entity as parameter
   * @param {*} entity entity matching CatalogShapes.Entity
   * @return {boolean} true if description is allowed for entity, false otherwise
   */
  isDescriptionAllowed = (entity) => {
    const { moduleConf } = this.props
    const entityType = get(entity, 'content.entityType')
    return get(moduleConf, `${entityType}.showDescription`, false)
  }

  /**
   * Open new file tab with specific mimeType
   * @param {*} label string
   * @param {*} uri string
   */
  onOpenFileInNewTab = (uri) => {
    const { pageModuleId, updateResultsContext } = this.props
    updateResultsContext(pageModuleId, {
      selectedTab: UIDomain.RESULTS_TABS_ENUM.FILE,
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.FILE]: {
          uri,
        },
      },
    })
  }

  render() {
    if (this.shadowModule) {
      return null
    }

    const {
      descriptionState: { descriptionPath, browsingTreeVisible }, settings,
      moduleConf: { allowSearching, runtime: { selectedIndex, onSearchWord, onSearchEntity } },
    } = this.props

    // Exit when no entity exists (should not happen)
    const descriptionEntity = descriptionPath.length ? descriptionPath[selectedIndex] : null
    if (!descriptionEntity || !settings) {
      return null
    }
    return (
      <MainModuleComponent
        settings={settings}
        descriptionEntity={descriptionEntity}
        selectedEntityIndex={selectedIndex}
        descriptionPath={descriptionPath}
        allowSearching={allowSearching}
        browsingTreeVisible={browsingTreeVisible}
        isDescriptionAllowed={this.isDescriptionAllowed}
        onSelectInnerLink={this.onSelectInnerLink}
        onSelectEntityLink={this.onSelectEntityLink}
        onSelectEntityIndex={this.onSelectEntityIndex}
        onSearchWord={onSearchWord}
        onSearchEntity={onSearchEntity}
        onOpenFileInNewTab={this.onOpenFileInNewTab}
      />)
  }
}
export default connect(
  UserContainer.mapStateToProps,
  UserContainer.mapDispatchToProps)(UserContainer)
