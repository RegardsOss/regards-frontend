/**
 * LICENSE_PLACEHOLDER
 **/
import { RadioButton } from 'material-ui/RadioButton'
import { Field, RenderRadio } from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import DatasetSelectionType from '../../../models/datasets/DatasetSelectionTypes'

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

  static contextTypes = {
    ...i18nContextType,
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
          value={DatasetSelectionType.ALL_CATALOG_TYPE}
          label={this.context.intl.formatMessage({ id: 'form.datasets.all.label' })}
          disabled={this.props.disabled}
        />
        <RadioButton
          value={DatasetSelectionType.DATASET_TYPE}
          label={this.context.intl.formatMessage({ id: 'form.datasets.selected.label' })}
          disabled={this.props.disabled}
        />
        <RadioButton
          value={DatasetSelectionType.DATASET_MODEL_TYPE}
          label={this.context.intl.formatMessage({ id: 'form.datasets.model.selected.label' })}
          disabled={this.props.disabled}
        />
      </Field>
    )
  }

}
export default FormDatasetsTypeSelection
