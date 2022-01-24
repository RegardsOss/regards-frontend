/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { RenderTextField, RenderCheckbox, Field } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Handle integer or float range restriction
 */
export class NumberRangeComponent extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onTextFieldChange = (event) => {
    // Avoid that change on the TextInput mount
    if (event.type === 'change') {
      this.props.change(`restriction.${this.props.type}.active`, true)
    }
  }

  render() {
    const { type } = this.props
    return (
      <div>
        <Field
          name={`restriction.${type}.active`}
          component={RenderCheckbox}
          label={this.context.intl.formatMessage({ id: 'attrmodel.form.restriction.NUMBER_RANGE.active' })}
          alwaysShowError
        />
        <Field
          name={`restriction.${type}.min`}
          onChange={this.onTextFieldChange}
          fullWidth
          component={RenderTextField}
          type="number"
          label={this.context.intl.formatMessage({ id: 'attrmodel.form.restriction.NUMBER_RANGE.min' })}
        />
        <Field
          name={`restriction.${type}.isMinInclusive`}
          onChange={this.onTextFieldChange}
          component={RenderCheckbox}
          label={this.context.intl.formatMessage({ id: 'attrmodel.form.restriction.NUMBER_RANGE.isMinInclusive' })}
        />
        <Field
          name={`restriction.${type}.max`}
          onChange={this.onTextFieldChange}
          fullWidth
          component={RenderTextField}
          type="number"
          label={this.context.intl.formatMessage({ id: 'attrmodel.form.restriction.NUMBER_RANGE.max' })}
        />
        <Field
          name={`restriction.${type}.isMaxInclusive`}
          onChange={this.onTextFieldChange}
          component={RenderCheckbox}
          label={this.context.intl.formatMessage({ id: 'attrmodel.form.restriction.NUMBER_RANGE.isMaxInclusive' })}
        />
      </div>
    )
  }
}

/**
 *
 * @param initialValues values provided to the form
 * @param currentAttrModel object received from the API
 * @returns {*} object sent to redux-form to correctly initialize form inputs
 */
export function initializeNumberRangeForm(type, initialValues, currentAttrModel) {
  const formValues = initialValues
  formValues.restriction[type] = {}
  formValues.restriction[type].active = true
  formValues.restriction[type].min = currentAttrModel.content.restriction.min
  formValues.restriction[type].max = currentAttrModel.content.restriction.max
  formValues.restriction[type].isMinInclusive = !currentAttrModel.content.restriction.minExcluded
  formValues.restriction[type].isMaxInclusive = !currentAttrModel.content.restriction.maxExcluded
  return initialValues
}

export default NumberRangeComponent
