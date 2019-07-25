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
import ModuleConfiguration from '../../shapes/ModuleConfiguration'
import { dataObjectAttributesActions, dataObjectAttributesSelectors } from '../../clients/DataObjectAttributesClient'
import { dataSetAttributesActions, dataSetAttributesSelectors } from '../../clients/DataSetAttributesClient'
import { uiPluginDefinitionActions, uiPluginDefinitionSelectors } from '../../clients/UIPluginDefinitionClient'
import DatasetSelectionTypes from '../../domain/DatasetSelectionTypes'
import FormTabsComponent from '../../components/admin/FormTabsComponent'

/**
 * Main container to display administration view of the module form.
 * @author Sébastien binda
 */
class AdminContainer extends React.Component {
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
    this.CONF_DATASETS_TYPES = `${props.adminForm.currentNamespace}.datasets.type`
    this.CONF_DATASETS_SELECTED_MODELS = `${props.adminForm.currentNamespace}.datasets.selectedModels`
    this.CONF_DATASETS_SELECTED_DATASETS = `${props.adminForm.currentNamespace}.datasets.selectedDatasets`
    this.CONF_SEARCH_RESULT = `${props.adminForm.currentNamespace}.searchResult`
  }

  state = {
    attributesLoading: true,
    criterionLoading: true,
  }

  componentWillMount() {
    if (!this.props.adminForm.isCreating) {
      this.updateSelectableAttributes(
        get(this.props.adminForm.form, this.CONF_DATASETS_TYPES),
        get(this.props.adminForm.form, this.CONF_DATASETS_SELECTED_MODELS),
        get(this.props.adminForm.form, this.CONF_DATASETS_SELECTED_DATASETS),
      )
    } else {
      this.updateSelectableAttributes()
    }
    // Load available criterion plugins
    return Promise.resolve(this.props.fetchCriterion()).then(() => this.setState({
      criterionLoading: false,
    }))
  }

  componentWillReceiveProps(nextProps) {
    // Check if the selectable attributes have to be updated
    const datasetsConf = get(this.props.adminForm.form, this.CONF_DATASETS, null)
    const newDatasetsConf = get(nextProps.adminForm.form, this.CONF_DATASETS, null)
    if (datasetsConf && newDatasetsConf && !isEqual(datasetsConf, newDatasetsConf)) {
      this.updateSelectableAttributes(
        newDatasetsConf.type,
        newDatasetsConf.selectedModels,
        newDatasetsConf.selectedDatasets,
      )
    }
  }

  updateSelectableAttributes = (type, modelIds, datasetIds) => {
    const tasks = []
    if (type === DatasetSelectionTypes.DATASET_MODEL_TYPE && modelIds && modelIds.length > 0) {
      tasks.push(this.props.fetchDataObjectAttributes(modelIds))
      tasks.push(this.props.fetchDataSetAttributes(modelIds))
    } else if (type === DatasetSelectionTypes.DATASET_TYPE && datasetIds && datasetIds.length > 0) {
      tasks.push(this.props.fetchDataObjectAttributes(null, datasetIds))
      tasks.push(this.props.fetchDataSetAttributes(null, datasetIds))
    } else {
      tasks.push(this.props.fetchDataObjectAttributes())
      tasks.push(this.props.fetchDataSetAttributes())
    }

    return Promise.all(tasks).then(() => this.setState({ attributesLoading: false }))
  }

  initEmptyProps() {
    return {
      appName: this.props.appName,
      project: this.props.project,
      adminForm: this.props.adminForm,
      currentNamespace: this.props.adminForm.currentNamespace,
      changeField: this.props.adminForm.changeField,
      defaultConf: {
        datasets: this.props.moduleConf.datasets ? this.props.moduleConf.datasets : {
          type: 'all',
        },
        criterion: this.props.moduleConf.criterion ? this.props.moduleConf.criterion : [],
        layout: this.props.moduleConf.layout,
      },
      selectableDataObjectsAttributes: this.props.selectableDataObjectsAttributes,
      selectableDataSetsAttributes: this.props.selectableDataSetsAttributes,
      attributesLoading: this.state.attributesLoading,
      disableChangeDatasets: this.state.attributesLoading,
      availableCriterion: this.props.availableCriterion,
      criterionFetching: this.state.criterionLoading,
    }
  }

  renderTabs = () => (
    <FormTabsComponent
      {...this.initEmptyProps()}
    />
  )

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

const mapStateToProps = (state, ownProps) => ({
  selectableDataObjectsAttributes: dataObjectAttributesSelectors.getList(state),
  selectableDataSetsAttributes: dataSetAttributesSelectors.getList(state),
  availableCriterion: uiPluginDefinitionSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  // Function to retrieve all available criterion plugins
  fetchCriterion: () => dispatch(uiPluginDefinitionActions.fetchPagedEntityList(0, 100, {}, { type: 'CRITERIA' })),
  fetchDataObjectAttributes: (modelIds, datasetIds) => dispatch(dataObjectAttributesActions.fetchPagedEntityListByPost(0, 10000, {}, { modelIds, datasetIds })),
  // Function to retrieve dataset atributes
  fetchDataSetAttributes: (modelIds, datasetIds) => dispatch(dataSetAttributesActions.fetchPagedEntityListByPost(0, 10000, {}, { modelIds, datasetIds })),
})

const UnconnectedAdminContainer = AdminContainer
export { UnconnectedAdminContainer }

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
