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
import join from 'lodash/join'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import { connect } from '@regardsoss/redux'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { UIDomain } from '@regardsoss/domain'
import ModuleConfiguration from '../../shapes/ModuleConfiguration'
import { dataObjectAttributesActions, dataObjectAttributesSelectors } from '../../clients/DataObjectAttributesClient'
import { dataSetAttributesActions, dataSetAttributesSelectors } from '../../clients/DataSetAttributesClient'
import { uiPluginDefinitionActions, uiPluginDefinitionSelectors } from '../../clients/UIPluginDefinitionClient'
import FormTabsComponent from '../../components/admin/FormTabsComponent'

/**
 * Main container to display administration view of the module form.
 * @author Sébastien binda
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
      selectableDataObjectsAttributes: dataObjectAttributesSelectors.getList(state),
      selectableDataSetsAttributes: dataSetAttributesSelectors.getList(state),
      availableCriterion: uiPluginDefinitionSelectors.getList(state),
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
      // Function to retrieve all available criterion plugins
      fetchCriterion: () => dispatch(uiPluginDefinitionActions.fetchPagedEntityList(0, 1000, {}, { type: 'CRITERIA' })),
      fetchDataObjectAttributes: (modelNames, datasetIds) => dispatch(dataObjectAttributesActions.fetchPagedEntityListByPost(0, 10000, null, { modelNames, datasetIds })),
      fetchDataSetAttributes: (modelNames, datasetIds) => dispatch(dataSetAttributesActions.fetchPagedEntityListByPost(0, 10000, null, { modelNames, datasetIds })),
    }
  }

  static propTypes = {
    // Props supplied by LazyModuleComponent
    appName: PropTypes.string,
    project: PropTypes.string,
    adminForm: PropTypes.shape({
      currentNamespace: PropTypes.string,
      isCreating: PropTypes.bool,
      isDuplicating: PropTypes.bool,
      isEditing: PropTypes.bool,
      changeField: PropTypes.func,
      // Current module configuration. Values from the redux-form
      form: PropTypes.shape({
        // Specific current module configuration for the current AdminContainer
        conf: ModuleConfiguration,
      }),
    }),

    // redefines expected configuration shape
    moduleConf: ModuleConfiguration.isRequired,

    // Set by mapStateToProps and mapDispatchToProps
    selectableDataObjectsAttributes: DataManagementShapes.AttributeModelList,
    selectableDataSetsAttributes: DataManagementShapes.AttributeModelList,
    availableCriterion: AccessShapes.UIPluginDefinitionList,
    fetchCriterion: PropTypes.func,
    // Retrieve data object attributes
    fetchDataObjectAttributes: PropTypes.func.isRequired,
    // Retrieve data set attributes
    fetchDataSetAttributes: PropTypes.func.isRequired,
  }

  static defaultProps = {
    selectableDataObjectsAttributes: [],
    selectableDataSetsAttributes: [],
    availableCriterion: [],
  }

  static listToQueryParam = (list) => {
    let param = ''
    if (list && list.length > 0) {
      param = `${join(list, ',')}`
    }
    return param
  }

  constructor(props) {
    super(props)
    this.CONF_DATASETS = `${props.adminForm.currentNamespace}.datasets`
    this.CONF_SEARCH_RESULT = `${props.adminForm.currentNamespace}.searchResult`
  }

  state = {
    attributesLoading: true,
    criterionLoading: true,
  }

  /**
   * Lifecycle method: component did mount, used here to:
   * - initialize the available attributes list through current dataset restrictions
   * - initialize criteria list
   */
  componentDidMount() {
    // Load available criterion plugins
    Promise.resolve(this.props.fetchCriterion()).then(() => this.setState({
      criterionLoading: false,
    }))
    // Initialize attributes pool from current configuration
    this.onPropertiesUpdated(null, this.props)
  }

  /**
   * Lifecycle method: component will receive props. Used here to update the list of selectable attributes
   * @param {*} nextProps next component props
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: used here to load or reload attributes list as restrictions change
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // Pull available attribute when loading or on dataset retrictions update
    const datasetRestrictions = get(newProps, `adminForm.form.${this.CONF_SEARCH_RESULT}.restrictions.byDataset`,
      { type: UIDomain.DATASET_RESCRICTIONS_TYPES_ENUM.NONE, selection: [] })
    const previousDatasetRestrictions = get(oldProps, `adminForm.form.${this.CONF_SEARCH_RESULT}.restrictions.byDataset`,
      { type: UIDomain.DATASET_RESCRICTIONS_TYPES_ENUM.NONE, selection: [] })
    if (!oldProps || !isEqual(datasetRestrictions, previousDatasetRestrictions)) {
      this.onDatasetRestrictionsUpdate(datasetRestrictions.type, datasetRestrictions.selection)
    }
  }

  /**
   * Updates the list of selectable attributes on dataset restrictions change
   * @param {string} datasetRestrictionType one of UIDomain.DATASET_RESCRICTIONS_TYPES_ENUM values
   * @param {[string]} selection applying selection for restriction type
   */
  onDatasetRestrictionsUpdate = (datasetRestrictionType = UIDomain.DATASET_RESCRICTIONS_TYPES_ENUM.NONE, selection = []) => {
    const modelNames = datasetRestrictionType === UIDomain.DATASET_RESCRICTIONS_TYPES_ENUM.SELECTED_MODELS ? selection : null
    const datasetIds = datasetRestrictionType === UIDomain.DATASET_RESCRICTIONS_TYPES_ENUM.SELECTED_DATASETS ? selection : null
    return Promise.all([
      this.props.fetchDataObjectAttributes(modelNames, datasetIds),
      this.props.fetchDataSetAttributes(modelNames, datasetIds),
    ]).then(() => this.setState({ attributesLoading: false }))
  }

  /**
   * Renders tabs (lazy called, after loading)
   */
  renderTabs = () => {
    const {
      appName, project, adminForm, moduleConf,
      availableCriterion, selectableDataObjectsAttributes, selectableDataSetsAttributes,
    } = this.props
    const { attributesLoading, criterionLoading } = this.state
    return (
      <FormTabsComponent
        appName={appName}
        project={project}
        adminForm={adminForm}
        currentNamespace={adminForm.currentNamespace}
        changeField={adminForm.changeField}
        defaultConf={moduleConf}
        selectableDataObjectsAttributes={selectableDataObjectsAttributes}
        selectableDataSetsAttributes={selectableDataSetsAttributes}
        attributesLoading={attributesLoading}
        availableCriterion={availableCriterion}
        criterionFetching={criterionLoading}
      />
    )
  }

  render() {
    return (
      <LoadableContentDisplayDecorator
        isLoading={this.state.attributesLoading || this.state.criterionLoading}
      >
        {this.renderTabs}
      </LoadableContentDisplayDecorator>
    )
  }
}

export default connect(
  AdminContainer.mapStateToProps,
  AdminContainer.mapDispatchToProps)(AdminContainer)
