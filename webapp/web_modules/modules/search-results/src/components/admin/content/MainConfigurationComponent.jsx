/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import reduce from 'lodash/reduce'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { DamDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { FieldsGroup } from '@regardsoss/form-utils'
import { ModulePaneStateField } from '@regardsoss/modules-api'
import ModuleConfiguration from '../../../shapes/ModuleConfiguration'

/**
 * Main configuration component
 * @author Raphaël Mechali
 */
class MainConfigurationComponent extends React.Component {
  static propTypes = {
    currentNamespace: PropTypes.string.isRequired,
    currentFormValues: ModuleConfiguration.isRequired,
    // redux change field method
    changeField: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Possible choices for displayed types (nota: string as MUI works hardly with anything else...) */
  static DISPLAYED_TYPES_CHOICES = {
    DATA: 'DATA',
    DATA_AND_DATASET: 'DATA_AND_DATASET',
  }

  /** As choices are necessary string, define here the matching views list to enable by choice */
  static ENABLED_VIEWS_BY_TYPES_CHOICE = {
    [MainConfigurationComponent.DISPLAYED_TYPES_CHOICES.DATA]: [DamDomain.ENTITY_TYPES_ENUM.DATA],
    [MainConfigurationComponent.DISPLAYED_TYPES_CHOICES.DATA_AND_DATASET]: [DamDomain.ENTITY_TYPES_ENUM.DATA, DamDomain.ENTITY_TYPES_ENUM.DATASET],
  }

  /**
   * Callbak: User changed displayed entity types. Update for values
   * @param {*} event MUI event
   * @param {string} value selected value, one of DISPLAYED_TYPES_CHOICES
   */
  onChangeDisplayedTypes = (event, typesChoice) => {
    const { currentNamespace, currentFormValues, changeField } = this.props
    changeField(currentNamespace, {
      // update form values: keep all but update enabled state in groups
      ...currentFormValues,
      viewsGroups: reduce(currentFormValues.viewsGroups, (acc, group, groupType) => ({
        ...acc,
        [groupType]: {
          ...group,
          // enabled when the list of types selected contains the group type
          enabled: MainConfigurationComponent.ENABLED_VIEWS_BY_TYPES_CHOICE[typesChoice].includes(groupType),
        },
      }), {}),
    })
  }

  /**
   * @return {[string]} DISPLAYED_TYPES_CHOICES value matching current form values
   */
  getCurrentDisplayedTypesChoices = () => {
    const { currentFormValues: { viewsGroups } } = this.props
    if (viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATA].enabled
      && viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATASET].enabled) {
      return MainConfigurationComponent.DISPLAYED_TYPES_CHOICES.DATA_AND_DATASET
    }
    if (viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATA].enabled) {
      return MainConfigurationComponent.DISPLAYED_TYPES_CHOICES.DATA
    }
    throw new Error('Enabled views configuration unhandled!')
  }

  render() {
    const { currentNamespace } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <div>
        {/* Presentation pane initial state (title is provided by ModulePaneStateField) */}
        <ModulePaneStateField currentNamespace={currentNamespace} />
        {/* Results view entity types configuration (disconnected of the form, as changes are locally handled) */}
        <FieldsGroup title={formatMessage({ id: 'search.results.form.main.configuration.display.types.message' })}>
          <RadioButtonGroup
            name="display-types"
            onChange={this.onChangeDisplayedTypes}
            valueSelected={this.getCurrentDisplayedTypesChoices()}
          >
            <RadioButton
              value={MainConfigurationComponent.DISPLAYED_TYPES_CHOICES.DATA}
              label={formatMessage({ id: 'search.results.form.main.configuration.display.types.data' })}
            />
            <RadioButton
              value={MainConfigurationComponent.DISPLAYED_TYPES_CHOICES.DATA_AND_DATASET}
              label={formatMessage({ id: 'search.results.form.configuration.result.type.data.and.datasets' })}
            />
          </RadioButtonGroup>
        </FieldsGroup>
      </div>
    )
  }
}
export default MainConfigurationComponent
