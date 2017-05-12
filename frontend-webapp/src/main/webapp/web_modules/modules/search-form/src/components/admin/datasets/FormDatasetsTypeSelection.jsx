/**
 * LICENSE_PLACEHOLDER
 **/
import { RadioButton } from 'material-ui/RadioButton'
import { FormattedMessage } from 'react-intl'
import { Field, RenderRadio } from '@regardsoss/form-utils'
import DatasetSelectionType from '../../../definitions/DatasetSelectionType'

/**
 * React component to display a radio group box to select the search form dataset assocation type
 * Types are : all, datasets, datasetModels
 * @author Sébastien binda
 */
class FormDatasetsTypeSelection extends React.Component {

  static propTypes = {
    defaultSelected: PropTypes.string,
    onSelectType: PropTypes.func,
    disabled: PropTypes.bool,
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
          value={DatasetSelectionType.all}
          label={<FormattedMessage id="form.datasets.all.label" />}
          disabled={this.props.disabled}
        />
        <RadioButton
          value={DatasetSelectionType.selectedDatasets}
          label={<FormattedMessage id="form.datasets.selected.label" />}
          disabled={this.props.disabled}
        />
        <RadioButton
          value={DatasetSelectionType.seletedDatasetModels}
          label={<FormattedMessage id="form.datasets.model.selected.label" />}
          disabled={this.props.disabled}
        />
      </Field>
    )
  }

}
export default FormDatasetsTypeSelection
