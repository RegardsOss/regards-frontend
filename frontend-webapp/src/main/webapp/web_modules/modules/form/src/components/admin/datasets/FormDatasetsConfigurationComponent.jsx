/**
 * LICENSE_PLACEHOLDER
 **/
import { xor } from 'lodash'
import { Card, CardTitle } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { PageableListContainer } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import DatasetLineComponent from './DatasetLineComponent'
import DatasetModelLineComponent from './DatasetLineComponent'
import DatasetActions from '../../../models/datasets/DatasetActions'
import DatasetSelector from '../../../models/datasets/DatasetSelector'
import DatasetModelActions from '../../../models/datasets/DatasetModelActions'
import DatasetModelSelector from '../../../models/datasets/DatasetModelSelector'
import FormDatasetsTypeSelection from './FormDatasetsTypeSelection'

/**
 * Display form to configure associated datasers of search form.
 */
class FormDatasetsConfigurationComponent extends React.Component {

  state = {
    type: this.props.type ? this.props.type : 'all',
    selectedDataset: this.props.selectedDatasets,
    selectedDatasetModels: this.props.selectedDatasetModels,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static propTypes = {
    changeField: React.PropTypes.func,
    type: React.PropTypes.string,
    selectedDatasets: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string,
    })),
    selectedDatasetModels: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string,
    })),
  }


  selectType = (event, value, input) => {
    this.setState({
      type: value,
    })
  }

  onDatasetSelection = (dataset) => {
    const newSelectedDatasets = xor(this.state.selectedDataset, [dataset])
    this.setState({
      selectedDataset: newSelectedDatasets,
    })
    this.props.changeField('conf.datasets.datasets', newSelectedDatasets)
  }

  onDatasetModelSelection = (model) => {
    const newSelectedModels = xor(this.state.selectedDatasetModels, [model])
    this.setState({
      selectedDatasetModels: newSelectedModels,
    })
    this.props.changeField('conf.datasets.models', newSelectedModels)
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
      selectedDataset: this.props.selectedDatasets,
    })
  }

  resetModelsSelection = () => {
    this.setState({
      selectedDatasetModels: this.props.selectedDatasetModels,
    })
  }

  renderType() {
    switch (this.state.type) {
      case 'selectedDatasets' :
        return (
          <PageableListContainer
            key={this.state.type}
            title={this.context.intl.formatMessage({ id: 'form.datasets.select.dataset.list.title' })}
            entityIdentifier="name"
            nbEntityByPage={10}
            entitiesActions={DatasetActions}
            entitiesSelector={DatasetSelector}
            lineComponent={DatasetLineComponent}
            displayCheckbox
            onEntityCheck={this.onDatasetSelection}
            onUnselectAll={this.unselectAll}
            onReset={this.resetSelection}
            selectedEntities={this.state.selectedDataset}
            style={{ width: '90%', margin: '20px auto' }}
          />
        )
      case 'seletedDatasetModels' :
        return (
          <PageableListContainer
            key={this.state.type}
            title={this.context.intl.formatMessage({ id: 'form.datasets.select.dataset.models.list.title' })}
            entityIdentifier="name"
            nbEntityByPage={10}
            entitiesActions={DatasetModelActions}
            entitiesSelector={DatasetModelSelector}
            lineComponent={DatasetModelLineComponent}
            displayCheckbox
            onEntityCheck={this.onDatasetModelSelection}
            onUnselectAll={this.unselectAllModels}
            onReset={this.resetModelsSelection}
            selectedEntities={this.state.selectedDatasetModels}
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
          defaultSelected={this.props.type}
          onSelectType={this.selectType}
        />
        {this.renderType()}
      </Card>
    )
  }
}

export default FormDatasetsConfigurationComponent
