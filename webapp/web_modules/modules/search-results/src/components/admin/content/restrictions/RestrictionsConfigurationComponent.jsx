/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { UIDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import {
  FieldsGroup, Field, FieldArray, RenderCheckbox,
} from '@regardsoss/form-utils'
import { RestrictionsConfiguration } from '../../../../shapes/ModuleConfiguration'
import DatasetRestrictionsSelectionComponent from './DatasetRestrictionsSelectionComponent'

/**
 * Configuration component for results restricitons (filtering by configuration)
 * @author Raphaël Mechali
 */
class RestrictionsConfigurationComponent extends React.Component {
  static propTypes = {
    currentNamespace: PropTypes.string.isRequired,
    currentRestrictionsValues: RestrictionsConfiguration.isRequired,
    datasets: DataManagementShapes.DatasetList.isRequired,
    datasetModels: DataManagementShapes.ModelList.isRequired,
    // redux change field method
    changeField: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Callbak: User changed dataset restriction type. Update for selected value
   * @param {*} event MUI event
   * @param {string} value selected value, one of DISPLAYED_TYPES_CHOICES
   */
  onChangeDatasetRestrictionType = (event, type) => {
    const { currentNamespace, changeField } = this.props
    changeField(`${currentNamespace}.restrictions.byDataset`, {
      type,
      selection: [],
    })
  }

  render() {
    const {
      currentNamespace, currentRestrictionsValues,
      datasets, datasetModels,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <>
        {/* Restrictions using data */ }
        <FieldsGroup
          title={formatMessage({ id: 'search.results.form.restrictions.configuration.data.restrictions.title' })}
          spanFullWidth
        >
          <Field
            name={`${currentNamespace}.restrictions.onData.lastVersionOnly`}
            component={RenderCheckbox}
            label={formatMessage({ id: 'search.results.form.restrictions.configuration.data.last.version.only' })}
          />
        </FieldsGroup>
        {/* Restrictions using dataset */}
        <FieldsGroup
          title={formatMessage({ id: 'search.results.form.restrictions.configuration.dataset.restrictions.title' })}
          spanFullWidth
        >
          <RadioButtonGroup
            name="restriction-type"
            onChange={this.onChangeDatasetRestrictionType}
            valueSelected={currentRestrictionsValues.byDataset.type}
          >
            { /** Possible restrictions types */
              UIDomain.DATASET_RESTRICTIONS_TYPES.map((type) => (
                <RadioButton
                  key={type}
                  value={type}
                  label={formatMessage({ id: `search.results.form.restrictions.configuration.display.type.${type}` })}
                />))
            }
          </RadioButtonGroup>
          <FieldArray
            name={`${currentNamespace}.restrictions.byDataset.selection`}
            component={DatasetRestrictionsSelectionComponent}
            datasets={datasets}
            datasetModels={datasetModels}
            currentRestrictionType={currentRestrictionsValues.byDataset.type}
          />
        </FieldsGroup>
      </>
    )
  }
}
export default RestrictionsConfigurationComponent
