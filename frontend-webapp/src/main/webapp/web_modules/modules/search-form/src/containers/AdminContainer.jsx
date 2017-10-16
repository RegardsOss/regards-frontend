/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ModuleConfiguration from '../models/ModuleConfiguration'
import { datasetDataAttributesActions, datasetDataAttributesSelectors } from '../clients/DatasetDataAttributesClient'
import { uiPluginDefinitionActions, uiPluginDefinitionSelectors } from '../clients/UIPluginDefinitionClient'
import DatasetSelectionTypes from '../models/datasets/DatasetSelectionTypes'
import FormTabsComponent from '../components/admin/FormTabsComponent'

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
      changeField: PropTypes.func,
      // Current module configuration. Values from the redux-form
      form: PropTypes.shape({
        // Specific current module configuration for the current AdminContainer
        conf: ModuleConfiguration,
      }),
    }),

    // Initial module configuration given by LayModuleComponent
    moduleConf: ModuleConfiguration.isRequired,

    // Set by mapStateToProps and mapDispatchToProps
    selectableDataObjectsAttributes: DataManagementShapes.AttributeModelList,
    selectableDataObjectsAttributesFetching: PropTypes.bool,
    availableCriterion: AccessShapes.UIPluginDefinitionList,
    fetchCriterion: PropTypes.func,
    // Retrieve data objects attributes for given dataset models
    fetchModelsAttributes: PropTypes.func,
    // Retrieve data objects attributes for all data objects models
    fetchAllModelsAttributes: PropTypes.func,
    // Retrieve data objects attributes for given datasets
    fetchDatasetsAttributes: PropTypes.func,
  }

  static defaultProps = {
    selectableDataObjectsAttributes: [],
    selectableDataObjectsAttributesFetching: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      attributesLoading: true,
      criterionLoading: true,
    }
  }

  componentWillMount() {
    if (get(this.props, 'adminForm.form.conf.datasets', null)) {
      this.updateselectableDataObjectsAttributes(this.props.adminForm.form.conf.datasets.type,
        this.props.adminForm.form.conf.datasets.selectedModels,
        this.props.adminForm.form.conf.datasets.selectedDatasets)
    } else {
      this.updateselectableDataObjectsAttributes()
    }
    // Load available criterion plugins
    return Promise.resolve(this.props.fetchCriterion()).then(() => this.setState({
      criterionLoading: false,
    }))
  }

  componentWillReceiveProps(nextProps) {
    // Check if the selectable attributes have to be updated
    const datasetsConf = get(this.props,"adminForm.form.conf.datasets",null)
    const newDatasetsConf = get(nextProps, "adminForm.form.conf.datasets", null)
    if (datasetsConf && newDatasetsConf && !isEqual(datasetsConf, newDatasetsConf)) {
      this.updateselectableDataObjectsAttributes(newDatasetsConf.type,
        newDatasetsConf.selectedModels,
        newDatasetsConf.selectedDatasets)
    }
  }

  updateselectableDataObjectsAttributes = (type, models, datasets) => {
    let task
    if (type === DatasetSelectionTypes.DATASET_MODEL_TYPE && models && models.length > 0) {
      task = this.props.fetchModelsAttributes(models)
    } else if (type === DatasetSelectionTypes.DATASET_TYPE && datasets && datasets.length > 0) {
      task = this.props.fetchDatasetsAttributes(datasets)
    } else {
      task = this.props.fetchAllModelsAttributes()
    }

    return Promise.resolve(task).then(() => this.setState({ attributesLoading: false }))
  }

  initEmptyProps() {
    return {
      appName: this.props.appName,
      project: this.props.project,
      adminForm: this.props.adminForm,
      changeField: this.props.adminForm.changeField,
      defaultConf: {
        enableFacettes: this.props.moduleConf.enableFacettes,
        resultType: this.props.moduleConf.resultType ? this.props.moduleConf.resultType : 'datasets',
        datasets: this.props.moduleConf.datasets ? this.props.moduleConf.datasets : {
          type: 'all',
        },
        criterion: this.props.moduleConf.criterion ? this.props.moduleConf.criterion : [],
        layout: this.props.moduleConf.layout,
        attributes: this.props.moduleConf.attributes ? this.props.moduleConf.attributes : [],
        attributesRegroupements: this.props.moduleConf.attributesRegroupements ? this.props.moduleConf.attributesRegroupements : [],
      },
      selectableDataObjectsAttributes: this.props.selectableDataObjectsAttributes,
      selectableDataObjectsAttributesFetching: this.state.attributesLoading,
      disableChangeDatasets: this.props.selectableDataObjectsAttributesFetching,
      availableCriterion: this.props.availableCriterion,
      criterionFetching: this.state.criterionLoading,
    }
  }

  render() {
    if (this.props.adminForm.form) {
      const props = this.initEmptyProps()
      return (
        <LoadableContentDisplayDecorator
          isLoading={this.state.attributesLoading || this.state.criterionLoading}
        >
          <FormTabsComponent
            {...props}
          />
        </LoadableContentDisplayDecorator>
      )
    }
    return null
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectableDataObjectsAttributes: datasetDataAttributesSelectors.getList(state),
  availableCriterion: uiPluginDefinitionSelectors.getList(state),
})

const listToQueryParam = (list) => {
  let param = ''
  if (list && list.length > 0) {
    param = `${join(list, ',')}`
  }
  return param
}

const mapDispatchToProps = dispatch => ({
  // Function to retrieve all available criterion plugins
  fetchCriterion: () => dispatch(uiPluginDefinitionActions.fetchPagedEntityList(0, 100, {}, { type: 'CRITERIA' })),
  fetchAllModelsAttributes: () => dispatch(datasetDataAttributesActions.fetchPagedEntityList(0, 10000)),
  // Function to retrieve attributes associated to the selected models
  fetchModelsAttributes: modelsId => dispatch(
    datasetDataAttributesActions.fetchPagedEntityList(0, 10000, {}, { modelId: listToQueryParam(modelsId) })),
  // Function to retrieve attributes associated to the selected datasets
  fetchDatasetsAttributes: datasetsId => dispatch(
    datasetDataAttributesActions.fetchPagedEntityList(0, 10000, {}, { datasetIds: listToQueryParam(datasetsId) })),
  // funcution to update a value of the current redux-form
})

const UnconnectedAdminContainer = AdminContainer
export {
  UnconnectedAdminContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)

