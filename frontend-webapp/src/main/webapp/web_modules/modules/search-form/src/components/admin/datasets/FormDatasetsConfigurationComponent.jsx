/**
 * LICENSE_PLACEHOLDER
 **/
import xor from 'lodash/xor'
import map from 'lodash/map'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { PageableListContainer, ListContainer, Title } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import DatasetLineComponent from './DatasetLineComponent'
import DatasetModelLineComponent from './DatasetModelLineComponent'
import { datasetActions, datasetSelectors } from '../../../clients/DatasetClient'
import { modelActions, modelSelectors } from '../../../clients/ModelClient'
import DatasetSelectionTypes from '../../../models/datasets/DatasetSelectionTypes'
import FormDatasetsTypeSelection from './FormDatasetsTypeSelection'

/**
 * Display form to configure associated datasers of search form.
 * @author Sébastien binda
 */
class FormDatasetsConfigurationComponent extends React.Component {

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static propTypes = {
    // Callback to update the list of selected entities
    changeField: PropTypes.func,
    // Current type (dataset, models, all)
    defaultType: PropTypes.string,
    // List of currently associated datasets (id)
    defaultSelectedDatasets: PropTypes.arrayOf(PropTypes.string),
    // List of currently associated dataset models (id)
    defaultSelectedDatasetModels: PropTypes.arrayOf(PropTypes.number),
    // Does the datasets / models are available for change (not available during server fetching)
    disableChangeDatasets: PropTypes.bool,
  }

  state = {
    type: this.props.defaultType ? this.props.defaultType : DatasetSelectionTypes.ALL_CATALOG_TYPE,
    selectedDataset: this.props.defaultSelectedDatasets,
    selectedDatasetModels: this.props.defaultSelectedDatasetModels,
  }

  onDatasetSelection = (dataset) => {
    const newSelectedDatasets = xor(this.state.selectedDataset, [dataset.ipId])
    this.setState({
      selectedDataset: newSelectedDatasets,
    })
    this.props.changeField('conf.datasets.selectedDatasets', newSelectedDatasets)
  }

  onDatasetModelSelection = (model) => {
    const newSelectedModels = xor(this.state.selectedDatasetModels, [model.id])
    this.setState({
      selectedDatasetModels: newSelectedModels,
    })
    this.props.changeField('conf.datasets.selectedModels', newSelectedModels)
  }

  getSelectedDatasetsObjects = () => map(this.state.selectedDataset, dataset => ({
    ipId: dataset,
  }))

  getSelectedDatasetModelsObjects = () => map(this.state.selectedDatasetModels, model => ({
    id: model,
  }))

  selectType = (event, value, input) => {
    this.setState({
      type: value,
    })
  }

  unselectAll = () => {
    this.setState({
      selectedDataset: [],
    })
    this.props.changeField('conf.datasets.selectedDatasets', [])
  }

  unselectAllModels = () => {
    this.setState({
      selectedDatasetModels: [],
    })
    this.props.changeField('conf.datasets.selectedModels', [])
  }

  resetSelection = () => {
    this.setState({
      selectedDataset: this.props.defaultSelectedDatasets,
    })
    this.props.changeField('conf.datasets.selectedDatasets', this.props.defaultSelectedDatasets)
  }

  resetModelsSelection = () => {
    this.setState({
      selectedDatasetModels: this.props.defaultSelectedDatasetModels,
    })
    this.props.changeField('conf.datasets.selectedModels', this.props.defaultSelectedDatasetModels)
  }

  resetAll = () => {
    this.resetSelection()
    this.resetModelsSelection()
    this.selectType(null,DatasetSelectionTypes.ALL_CATALOG_TYPE)
    this.props.changeField('conf.datasets.type',DatasetSelectionTypes.ALL_CATALOG_TYPE)
  }

  renderType() {
    const datasetModelTypeQueryParams = {
      type: 'DATASET',
    }
    const style = { width: '90%', margin: '20px auto' }
    switch (this.state.type) {
      case DatasetSelectionTypes.DATASET_TYPE :
        return (
          <PageableListContainer
            key={this.state.type}
            title={this.context.intl.formatMessage({ id: 'form.datasets.select.dataset.list.title' })}
            entityIdentifier="ipId"
            nbEntityByPage={10}
            entitiesActions={datasetActions}
            entitiesSelector={datasetSelectors}
            lineComponent={DatasetLineComponent}
            displayCheckbox
            onEntityCheck={this.onDatasetSelection}
            onUnselectAll={this.unselectAll}
            onReset={this.resetSelection}
            selectedEntities={this.getSelectedDatasetsObjects()}
            disableActions={this.props.disableChangeDatasets}
            style={style}
          />
        )
      case DatasetSelectionTypes.DATASET_MODEL_TYPE :
        return (
          <ListContainer
            key={this.state.type}
            title={this.context.intl.formatMessage({ id: 'form.datasets.select.dataset.models.list.title' })}
            entityIdentifier="id"
            nbEntityByPage={10}
            entitiesActions={modelActions}
            entitiesSelector={modelSelectors}
            queryParams={datasetModelTypeQueryParams}
            lineComponent={DatasetModelLineComponent}
            displayCheckbox
            onEntityCheck={this.onDatasetModelSelection}
            onUnselectAll={this.unselectAllModels}
            onReset={this.resetModelsSelection}
            selectedEntities={this.getSelectedDatasetModelsObjects()}
            disableActions={this.props.disableChangeDatasets}
            style={style}
          />
        )
      default :
        return null
    }
  }

  renderResetAllSelection = () => {
    return (
      <RaisedButton
        label={this.context.intl.formatMessage({ id: 'form.datasets.reset.all' })}
        onTouchTap={this.resetAll}
        secondary
        />
    )
  }

  render() {
    return (
      <Card>
        <Title
          level={3}
          label={this.context.intl.formatMessage({ id: 'form.datasets.tab.title' })}
        />
        {this.renderResetAllSelection()}
        <FormDatasetsTypeSelection
          defaultSelected={this.state.type}
          onSelectType={this.selectType}
          disabled={this.props.disableChangeDatasets}
        />
        {this.renderType()}
      </Card>
    )
  }
}

export default FormDatasetsConfigurationComponent
