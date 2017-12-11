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
        key={this.props.defaultSelected}
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
