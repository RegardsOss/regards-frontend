/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DatasetSelectionTypes from '../../../domain/DatasetSelectionTypes'

/**
 * React component to display a radio group box to select the search form dataset assocation type
 * Types are : all, datasets, datasetModels
 * @author Sébastien binda
 */
class FormDatasetsTypeSelection extends React.Component {
  static propTypes = {
    currentNamespace: PropTypes.string,
    defaultSelected: PropTypes.string,
    onSelectType: PropTypes.func,
    disabled: PropTypes.bool,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { currentNamespace } = this.props
    return (
      <Field
        key={this.props.defaultSelected}
        name={`${currentNamespace}.datasets.type`}
        onSelect={this.props.onSelectType}
        component={RenderRadio}
        defaultSelected={DatasetSelectionTypes.ALL_CATALOG_TYPE}
      >
        <RadioButton
          value={DatasetSelectionTypes.ALL_CATALOG_TYPE}
          label={this.context.intl.formatMessage({ id: 'form.datasets.all.label' })}
          disabled={this.props.disabled}
        />
        <RadioButton
          value={DatasetSelectionTypes.DATASET_TYPE}
          label={this.context.intl.formatMessage({ id: 'form.datasets.selected.label' })}
          disabled={this.props.disabled}
        />
        <RadioButton
          value={DatasetSelectionTypes.DATASET_MODEL_TYPE}
          label={this.context.intl.formatMessage({ id: 'form.datasets.model.selected.label' })}
          disabled={this.props.disabled}
        />
      </Field>
    )
  }
}
export default FormDatasetsTypeSelection
