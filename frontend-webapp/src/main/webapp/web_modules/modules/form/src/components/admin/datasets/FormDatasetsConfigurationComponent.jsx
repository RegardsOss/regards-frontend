/**
 * LICENSE_PLACEHOLDER
 **/
import { xor, map } from 'lodash'
import { Card, CardTitle } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { PageableListContainer } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { Model, Entity } from '@regardsoss/model'
import DatasetLineComponent from './DatasetLineComponent'
import DatasetModelLineComponent from './DatasetModelLineComponent'
import DatasetActions from '../../../models/datasets/DatasetActions'
import DatasetSelector from '../../../models/datasets/DatasetSelector'
import DatasetModelActions from '../../../models/datasets/DatasetModelActions'
import DatasetModelSelector from '../../../models/datasets/DatasetModelSelector'
import { DATASET_MODEL_TYPE, DATASET_TYPE } from '../../../models/datasets/DatasetSelectionTypes'
import FormDatasetsTypeSelection from './FormDatasetsTypeSelection'

/**
 * Display form to configure associated datasers of search form.
 */
class FormDatasetsConfigurationComponent extends React.Component {

  state = {
    type: this.props.defaultType ? this.props.defaultType : 'all',
    selectedDataset: this.props.defaultSelectedDatasets,
    selectedDatasetModels: this.props.defaultSelectedDatasetModels,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static propTypes = {
    changeField: React.PropTypes.func,
    defaultType: React.PropTypes.string,
    defaultSelectedDatasets: React.PropTypes.arrayOf(React.PropTypes.number),
    defaultSelectedDatasetModels: React.PropTypes.arrayOf(React.PropTypes.number),
  }


  selectType = (event, value, input) => {
    this.setState({
      type: value,
    })
  }

  onDatasetSelection = (dataset) => {
    console.log(dataset)
    const newSelectedDatasets = xor(this.state.selectedDataset, [dataset.id])
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

  getSelectedDatasetsObjects = () => map(this.state.selectedDataset, dataset => ({
    id: dataset,
  }))

  getSelectedDatasetModelsObjects = () => map(this.state.selectedDatasetModels, model => ({
    id: model,
  }))

  renderType() {
    switch (this.state.type) {
      case DATASET_TYPE :
        return (
          <PageableListContainer
            key={this.state.type}
            title={this.context.intl.formatMessage({ id: 'form.datasets.select.dataset.list.title' })}
            entityIdentifier="id"
            nbEntityByPage={10}
            entitiesActions={DatasetActions}
            entitiesSelector={DatasetSelector}
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
          <PageableListContainer
            key={this.state.type}
            title={this.context.intl.formatMessage({ id: 'form.datasets.select.dataset.models.list.title' })}
            entityIdentifier="id"
            nbEntityByPage={10}
            entitiesActions={DatasetModelActions}
            entitiesSelector={DatasetModelSelector}
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

export default {
  FormDatasetsConfigurationComponent,
}
