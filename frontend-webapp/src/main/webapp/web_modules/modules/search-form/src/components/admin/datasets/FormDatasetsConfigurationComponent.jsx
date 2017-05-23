/**
 * LICENSE_PLACEHOLDER
 **/
import xor from 'lodash/xor'
import map from 'lodash/map'
import { Card, CardTitle } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { PageableListContainer, ListContainer } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import DatasetLineComponent from './DatasetLineComponent'
import DatasetModelLineComponent from './DatasetModelLineComponent'
import { datasetActions, datasetSelectors } from '../../../clients/DatasetClient'
import { modelActions, modelSelectors } from '../../../clients/ModelClient'
import { DATASET_MODEL_TYPE, DATASET_TYPE } from '../../../models/datasets/DatasetSelectionTypes'
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
    type: this.props.defaultType ? this.props.defaultType : 'all',
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
  }

  unselectAllModels = () => {
    this.setState({
      selectedDatasetModels: [],
    })
  }

  resetSelection = () => {
    this.setState({
      selectedDataset: this.props.defaultSelectedDatasets,
    })
  }

  resetModelsSelection = () => {
    this.setState({
      selectedDatasetModels: this.props.defaultSelectedDatasetModels,
    })
  }

  renderType() {
    const datasetModelTypeQueryParams = {
      type: 'DATASET',
    }
    switch (this.state.type) {
      case DATASET_TYPE :
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
            style={{ width: '90%', margin: '20px auto' }}
          />
        )
      case DATASET_MODEL_TYPE :
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
            style={{ width: '90%', margin: '20px auto' }}
          />
        )
      default :
        return null
    }
  }

  render() {
    return (
      <Card>
        <CardTitle subtitle={<FormattedMessage id="form.datasets.tab.title" />} />
        <FormDatasetsTypeSelection
          defaultSelected={this.props.defaultType}
          onSelectType={this.selectType}
          disabled={this.props.disableChangeDatasets}
        />
        {this.renderType()}
      </Card>
    )
  }
}

export default FormDatasetsConfigurationComponent
