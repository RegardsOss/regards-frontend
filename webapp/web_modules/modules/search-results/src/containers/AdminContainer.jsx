/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { INITIAL_FORM_STATE } from '../domain/form/InitialFormState'
import { FORM_SECTIONS_ENUM } from '../domain/form/FormSectionsEnum'
import { FORM_PAGES_ENUM } from '../domain/form/FormPagesEnum'
import { PAGES_BY_TYPE } from '../domain/form/FormPagesByType'
import { datasetActions, datasetSelectors } from '../clients/DatasetClient'
import { datasetModelActions, datasetModelSelectors } from '../clients/DatasetModelClient'
import { dataObjectAttributesActions, dataObjectAttributesSelectors } from '../clients/DataObjectAttributesClient'
import { dataSetAttributesActions, dataSetAttributesSelectors } from '../clients/DataSetAttributesClient'
import PluginsMetadataProvider from './admin/plugins/PluginsMetadataProvider'
import MainFormComponent from '../components/admin/MainFormComponent'

/**
 * Main container to display administration view of the module form.
 * @author Sébastien binda
 * @author Léo Mieulet
 */
export class AdminContainer extends React.Component {
  static propTypes = {
    // default module properties
    ...AccessShapes.runtimeConfigurationModuleFields,
    // Set by mapStateToProps
    datasets: DataManagementShapes.DatasetList.isRequired,
    datasetModels: DataManagementShapes.ModelList.isRequired,
    dataAttributeModels: DataManagementShapes.AttributeModelList,
    datasetAttributeModels: DataManagementShapes.AttributeModelList,
    // Set by mapDispatchToProps
    fetchDatasets: PropTypes.func.isRequired,
    fetchDatasetModels: PropTypes.func.isRequired,
    fetchDataObjectAttributes: PropTypes.func.isRequired,
    fetchDataSetAttributes: PropTypes.func.isRequired,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { adminForm: { conf } }) {
    // bind attributes from parent control. When not externally driven, bind from local redux store
    return {
      datasets: datasetSelectors.getList(state),
      datasetModels: datasetModelSelectors.getList(state),
      dataAttributeModels: (conf && conf.selectableDataObjectsAttributes) || dataObjectAttributesSelectors.getList(state),
      datasetAttributeModels: (conf && conf.selectableDataSetsAttributes) || dataSetAttributesSelectors.getList(state),
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
      /** Fetch all datasets and datasets models */
      fetchDatasets: () => dispatch(datasetActions.fetchPagedEntityList(0, 10000)),
      fetchDatasetModels: () => dispatch(datasetModelActions.fetchEntityList(null, { type: DamDomain.ENTITY_TYPES_ENUM.DATASET })),
      /** Fetch attributes based on current dataset IDs / model names restrictions */
      fetchDataObjectAttributes: (modelNames, datasetIds) => dispatch(dataObjectAttributesActions.fetchPagedEntityListByPost(0, 10000, null, null, { modelNames, datasetIds })),
      fetchDataSetAttributes: (modelNames, datasetIds) => dispatch(dataSetAttributesActions.fetchPagedEntityListByPost(0, 10000, null, null, { modelNames, datasetIds })),
    }
  }

  /**
   * For each views group, extract data like {type: string, enabled: bool}, where type is entity type of the group
   * @param {*} props considered properties
   * @return {[{type: string, enabled: boolean}]}
   */
  static extractViewsGroupData(props) {
    const { adminForm } = props
    const namespace = get(adminForm, 'currentNamespace')
    const viewsGroups = get(adminForm, `form.${namespace}.viewsGroups`, {})
    return map(viewsGroups, (group, key) => ({ type: key, enabled: group.enabled }))
  }

  /**
   * Builds navigation tree from views data
   * @param {*} newViewsData views
   * @param {boolean} forbidRestrictions should forbid restrictions edition
   * @return {{navigationSections: [*], selectedSectionType: string, selectedPageType: string}} navigation tree with selection
   */
  static buildNavigationTree(newViewsData, forbidRestrictions) {
    return {
      navigationSections: [{
        // Main configuration page, always available (contains only main page)
        type: FORM_SECTIONS_ENUM.MAIN,
        pages: [{
          type: FORM_PAGES_ENUM.MAIN,
          selected: true,
        }],
      }, {
        // Filters page, always available (contains only main page)
        type: FORM_SECTIONS_ENUM.FILTERS,
        pages: [{
          type: FORM_PAGES_ENUM.MAIN,
          selected: false,
        }],
      }, forbidRestrictions ? null : {
        // Restrictions page (contains only main page)
        type: FORM_SECTIONS_ENUM.RESTRICTIONS,
        pages: [{
          type: FORM_PAGES_ENUM.MAIN,
          selected: false,
        }],
      }, {
        // Search configuration
        type: FORM_SECTIONS_ENUM.SEARCH,
        pages: [{
          type: FORM_PAGES_ENUM.MAIN,
          selected: false,
        }],
      }, ...newViewsData.filter((viewsGroup) => viewsGroup.enabled) // keep only enabled views groups
        .map((viewsGroup) => ({
          type: viewsGroup.type,
          pages: PAGES_BY_TYPE[viewsGroup.type].map((type) => ({
            type,
            selected: false,
          })),
        })),
      ].filter((s) => !!s), // remove any section not present (especially restrictions)
      // report selected elements
      selectedSectionType: FORM_SECTIONS_ENUM.MAIN,
      selectedPageType: FORM_PAGES_ENUM.MAIN,
    }
  }

  state = {
    // used to prevent showing panel before dataset and models where loaded
    hasLoadedDatasetsAndModels: false,
    // used to prevent removing attributes from lists while initial loading is not performed
    hasLoadedInitialAttributes: false,
    navigationSections: [],
    selectedSectionType: null,
    selectedPageType: null,
  }

  /**
   * Lifecycle method: component did mount. Used here to start initial data fetching
   */
  componentDidMount() {
    const {
      adminForm: {
        changeField, isCreating, currentNamespace,
      },
      fetchDatasets, fetchDatasetModels,
    } = this.props
    // 1 - Initialize form module state when creating a new module
    if (isCreating) {
      changeField(currentNamespace, INITIAL_FORM_STATE)
    }
    // 2 - Load initial attributes and datasets
    Promise.all([fetchDatasets(), fetchDatasetModels()]).then(() => this.setState({ hasLoadedDatasetsAndModels: true }))
    // 3 - Initialize available attributes through onPropertiesUpdated
    this.onPropertiesUpdated(null, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties (null when none)
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // 1 - When view data change, or views are enabled / disabled, rebuild the left tree model for available sections and pages
    const oldViewsData = AdminContainer.extractViewsGroupData(oldProps || {})
    const newViewsData = AdminContainer.extractViewsGroupData(newProps)
    let nextState = { } // only diff with previous state
    if (!isEqual(oldViewsData, newViewsData)) {
      nextState = {
        ...nextState,
        ...AdminContainer.buildNavigationTree(newViewsData, get(newProps.adminForm, 'conf.forbidRestrictions')),
      }
    }
    // 2 - When auto-controlled (not externally driven)
    const {
      adminForm: { form, currentNamespace, conf },
    } = newProps
    const isAutoControlled = !(conf && conf.selectableDataObjectsAttributes && conf.selectableDataSetsAttributes)
    if (isAutoControlled) {
      // ... If the dataset restrictions changed, or at initialization, update locally available attributes
      // a - recover current restrictions from form values (or default ones)
      const datasetRescriction = get(form, `${currentNamespace}.restrictions.byDataset`, {
        type: UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.NONE,
        selection: [],
      })
      // b - recover previous restrictions (or default ones)
      const oldAdminForm = get(oldProps, 'adminForm', {})
      const oldDatasetRestrictions = get(oldAdminForm, `form.${oldAdminForm.currentNamespace}.restrictions.byDataset`, {
        type: UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.NONE,
        selection: [],
      })
      if (!oldProps || !isEqual(oldDatasetRestrictions, datasetRescriction)) {
        this.onDatasetRestrictionsUpdate(datasetRescriction.type, datasetRescriction.selection)
      }
    } else if (!oldProps) {
      // handle non auto-controlled case initialization
      nextState = {
        ...nextState,
        hasLoadedInitialAttributes: true, // immediately done as the attributes are provided
      }
    }
    if (!isEmpty(nextState)) {
      this.setState(nextState)
    }
  }

  /**
   * Updates the list of selectable attributes on dataset restrictions change
   * @param {string} datasetRestrictionType one of UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM values
   * @param {[string]} selection applying selection for restriction type
   */
  onDatasetRestrictionsUpdate = (datasetRestrictionType = UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.NONE, selection = []) => {
    const modelNames = datasetRestrictionType === UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_MODELS ? selection : null
    const datasetIds = datasetRestrictionType === UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_DATASETS ? selection : null
    return Promise.all([
      this.props.fetchDataObjectAttributes(modelNames, datasetIds),
      this.props.fetchDataSetAttributes(modelNames, datasetIds),
    ]).then(() => this.setState({ hasLoadedInitialAttributes: true })) // handle init case
  }

  /**
   * Call back: user browsed to a page
   * @param {*} section selected section, matching FormSection
   * @param {*} page selected page, matching FormPage, mandatory (and not already selected!)
   */
  onBrowseToPage = (section, page) => {
    this.setState({
      navigationSections: this.state.navigationSections.map((currentSection) => ({
        type: currentSection.type,
        pages: currentSection.pages.map((currentPage) => ({
          type: currentPage.type,
          selected: section.type === currentSection.type && page.type === currentPage.type, // update selected page
        })),
      })),
      selectedSectionType: section.type,
      selectedPageType: page.type,
    })
  }

  render() {
    const {
      hasLoadedDatasetsAndModels, hasLoadedInitialAttributes, navigationSections, selectedSectionType, selectedPageType,
    } = this.state
    const {
      datasets, datasetModels,
      dataAttributeModels, datasetAttributeModels,
      adminForm: {
        form, currentNamespace, changeField, invalidFormConfig,
      },
    } = this.props
    if (form && navigationSections.length && selectedSectionType && selectedPageType) {
      return (
        <LoadableContentDisplayDecorator
          // wait for form initialization and data loading
          isLoading={!hasLoadedDatasetsAndModels || !hasLoadedInitialAttributes}
        >
          <PluginsMetadataProvider dataAttributeModels={dataAttributeModels}>
            <MainFormComponent
              navigationSections={navigationSections}
              selectedSectionType={selectedSectionType}
              selectedPageType={selectedPageType}
              currentNamespace={currentNamespace}
              currentFormValues={get(form, currentNamespace)}
              datasets={datasets}
              datasetModels={datasetModels}
              dataAttributeModels={dataAttributeModels}
              datasetAttributeModels={datasetAttributeModels}
              changeField={changeField}
              invalidFormConfig={invalidFormConfig}
              onBrowseToPage={this.onBrowseToPage}
            />
          </PluginsMetadataProvider>
        </LoadableContentDisplayDecorator>
      )
    }
    return null
  }
}

export default connect(AdminContainer.mapStateToProps, AdminContainer.mapDispatchToProps)(AdminContainer)
