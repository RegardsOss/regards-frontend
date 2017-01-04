/**
 * LICENSE_PLACEHOLDER
 **/
import { xor } from 'lodash'
import { RadioButton } from 'material-ui/RadioButton'
import { Card, CardTitle } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { Field, RenderRadio } from '@regardsoss/form-utils'
import { PageableListContainer } from '@regardsoss/components'
import DatasetLineComponent from './DatasetLineComponent'
import DatasetActions from '../../models/datasets/DatasetActions'
import DatasetSelector from '../../models/datasets/DatasetSelector'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Display form to configure associated datasers of search form.
 */
class FormDatasetsConfigurationComponent extends React.Component {

  state = {
    type: this.props.type ? this.props.type : 'all',
    selectedDataset: this.props.selectedDatasets,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static propTypes = {
    appName: React.PropTypes.string.isRequired,
    change: React.PropTypes.func,
    type: React.PropTypes.string,
    selectedDatasets: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string,
    })),
    selectedDatasetModels: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string,
    })),
  }

  selectType = (event, value) => {
    this.setState({
      type: value,
    })
  }

  onDatasetSelection = (dataset) => {
    const newSelectedDatasets = xor(this.state.selectedDataset, [dataset])
    this.setState({
      selectedDataset: newSelectedDatasets,
    })
    this.props.change('conf.datasets.datasets', newSelectedDatasets)
  }

  unselectAll = () => {
    console.log('unselected all ....')
    this.setState({
      selectedDataset: [],
    })
  }

  resetSelection = () => {
    this.setState({
      selectedDataset: this.props.selectedDatasets,
    })
  }

  renderType() {
    const title = this.context.intl.formatMessage({ id: 'form.datasets.select.dataset.list.title' })
    switch (this.state.type) {
      case 'selectedDatasets' :
        return (
          <PageableListContainer
            title={title}
            entityIdentifier="name"
            nbEntityByPage={10}
            entitiesActions={DatasetActions}
            entitiesSelector={DatasetSelector(this.props.appName)}
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
        return (<div>Selected dataset models : </div>)
      default :
        return null
    }
  }

  render() {
    return (
      <Card>
        <CardTitle subtitle={<FormattedMessage id="form.datasets.tab.title" />} />
        <Field
          name="conf.datasets.type"
          component={RenderRadio}
          defaultSelected={this.props.type}
          onChange={this.selectType}
        >
          <RadioButton
            value="all"
            label={<FormattedMessage id="form.datasets.all.label" />}
          />
          <RadioButton
            value="selectedDatasets"
            label={<FormattedMessage id="form.datasets.selected.label" />}
          />
          <RadioButton
            value="seletedDatasetModels"
            label={<FormattedMessage id="form.datasets.model.selected.label" />}
          />
        </Field>
        {this.renderType()}
      </Card>
    )
  }
}

export default FormDatasetsConfigurationComponent
