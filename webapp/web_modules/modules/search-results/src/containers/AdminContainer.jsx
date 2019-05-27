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
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DataAttributeModelActions, DataAttributeModelSelectors } from '../clients/DataobjectAttributeModelClient'
import { DatasetAttributeModelActions, DatasetAttributeModelSelectors } from '../clients/DatasetAttributeModelClient'
import { DocumentAttributeModelActions, DocumentAttributeModelSelectors } from '../clients/DocumentAttributeModelClient'
import ModuleConfiguration from '../shapes/ModuleConfiguration'
import { INITIAL_FORM_STATE } from '../domain/form/InitialFormState'
import { FORM_SECTIONS_ENUM } from '../domain/form/FormSectionsEnum'
import { FORM_PAGES_ENUM } from '../domain/form/FormPagesEnum'
import { PAGES_BY_TYPE } from '../domain/form/FormPagesByType'
import MainFormComponent from '../components/admin/MainFormComponent'

/**
 * Main container to display administration view of the module form.
 * @author Sébastien binda
 * @author Léo Mieulet
 */
export class AdminContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      dataAttributeModels: DataAttributeModelSelectors.getList(state),
      datasetAttributeModels: DatasetAttributeModelSelectors.getList(state),
      documentAttributeModels: DocumentAttributeModelSelectors.getList(state),
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
      fetchAllDataAttributes: () => dispatch(DataAttributeModelActions.fetchEntityList({ modelType: 'DATA' })),
      fetchAllDatasetModelsAttributes: () => dispatch(DatasetAttributeModelActions.fetchEntityList({ modelType: 'DATASET' })),
      fetchAllDocumentModelsAttributes: () => dispatch(DocumentAttributeModelActions.fetchEntityList({ modelType: 'DOCUMENT' })),
    }
  }

  static propTypes = {
    // default module properties
    ...AccessShapes.runtimeConfigurationModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration,
    // Set by mapStateToProps
    dataAttributeModels: DataManagementShapes.AttributeModelList,
    datasetAttributeModels: DataManagementShapes.AttributeModelList,
    documentAttributeModels: DataManagementShapes.AttributeModelList,
    // Set by mapDispatchToProps
    fetchAllDataAttributes: PropTypes.func,
    fetchAllDatasetModelsAttributes: PropTypes.func,
    fetchAllDocumentModelsAttributes: PropTypes.func,
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
   * @return {{navigationSections: [*], selectedSectionType: string, selectedPageType: string}} navigation tree with selection
   */
  static buildNavigationTree(newViewsData) {
    return {
      navigationSections: [{
        // Main configuration page, always available (contains only main page)
        type: FORM_SECTIONS_ENUM.MAIN,
        pages: [{
          type: FORM_PAGES_ENUM.MAIN,
          selected: true,
        }],
      }, ...newViewsData.filter(viewsGroup => viewsGroup.enabled) // keep only enabled views groups
        .map(viewsGroup => ({
          type: viewsGroup.type,
          pages: PAGES_BY_TYPE[viewsGroup.type].map(type => ({
            type,
            selected: false,
          })),
        })),
      ],
      // report selected elements
      selectedSectionType: FORM_SECTIONS_ENUM.MAIN,
      selectedPageType: FORM_PAGES_ENUM.MAIN,
    }
  }

  state = {
    isLoading: true,
    navigationSections: [],
    selectedSectionType: null,
    selectedPageType: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component did mount. Used here to start initial data fetching
   */
  componentDidMount() {
    const {
      adminForm: { changeField, isCreating, currentNamespace },
      fetchAllDatasetModelsAttributes, fetchAllDocumentModelsAttributes, fetchAllDataAttributes,
    } = this.props
    // 1 - Initialize form module state when creating a new module
    if (isCreating) {
      changeField(currentNamespace, INITIAL_FORM_STATE)
    }
    // 2 - pull required data
    Promise.all([
      fetchAllDatasetModelsAttributes(),
      fetchAllDocumentModelsAttributes(),
      fetchAllDataAttributes(),
    ]).then(() => this.setState({ isLoading: false }))
  }

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
    // When view data change, or views are enabled / disabled, rebuild the left tree model for available sections and pages
    const oldViewsData = AdminContainer.extractViewsGroupData(oldProps)
    const newViewsData = AdminContainer.extractViewsGroupData(newProps)
    if (!isEqual(oldViewsData, newViewsData)) {
      this.setState(AdminContainer.buildNavigationTree(newViewsData))
    }
  }

  /**
   * Call back: user browsed to a page
   * @param {*} section selected section, matching FormSection
   * @param {*} page selected page, matching FormPage, mandatory (and not already selected!)
   */
  onBrowseToPage = (section, page) => {
    this.setState({
      navigationSections: this.state.navigationSections.map(currentSection => ({
        type: currentSection.type,
        pages: currentSection.pages.map(currentPage => ({
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
      isLoading, navigationSections, selectedSectionType, selectedPageType,
    } = this.state
    const {
      dataAttributeModels, datasetAttributeModels, documentAttributeModels,
      adminForm: {
        form = {}, currentNamespace, changeField, conf = {},
      },
    } = this.props
    if (form && navigationSections.length && selectedSectionType && selectedPageType) {
      return (
        <LoadableContentDisplayDecorator
          // wait for form initialization and data loading
          isLoading={isLoading}
        >
          <MainFormComponent
            navigationSections={navigationSections}
            selectedSectionType={selectedSectionType}
            selectedPageType={selectedPageType}

            currentNamespace={currentNamespace}
            currentFormValues={get(form, currentNamespace)}
            documentsForbidden={!!conf.documentsForbidden}

            // use restricted attributes models from conf or fetched ones
            dataAttributeModels={conf.selectableDataObjectsAttributes || dataAttributeModels}
            datasetAttributeModels={conf.selectableDataSetsAttributes || datasetAttributeModels}
            documentAttributeModels={documentAttributeModels}

            changeField={changeField}
            onBrowseToPage={this.onBrowseToPage}
          />
        </LoadableContentDisplayDecorator>
      )
    }
    return null
  }
}

export default connect(AdminContainer.mapStateToProps, AdminContainer.mapDispatchToProps)(AdminContainer)
