/**
 * LICENSE_PLACEHOLDER
 **/
import { RadioButton } from 'material-ui/RadioButton'
import { FormattedMessage } from 'react-intl'
import { Field, RenderRadio } from '@regardsoss/form-utils'

/**
 * React component to display a radio group box to select the search form dataset assocation type
 * Types are : all, datasets, datasetModels
 */
class FormDatasetsTypeSelection extends React.Component {

  static propTypes = {
    defaultSelected: React.PropTypes.string,
    onSelectType: React.PropTypes.func,
    disabled: React.PropTypes.bool,
  }

  render() {
    return (
      <Field
        name="conf.datasets.type"
        onSelect={this.props.onSelectType}
        component={RenderRadio}
        defaultSelected={this.props.defaultSelected}
      >
        <RadioButton
          value="all"
          label={<FormattedMessage id="form.datasets.all.label" />}
          disabled={this.props.disabled}
        />
        <RadioButton
          value="selectedDatasets"
          label={<FormattedMessage id="form.datasets.selected.label" />}
          disabled={this.props.disabled}
        />
        <RadioButton
          value="seletedDatasetModels"
          label={<FormattedMessage id="form.datasets.model.selected.label" />}
          disabled={this.props.disabled}
        />
      </Field>
    )
  }

}
export default FormDatasetsTypeSelection
