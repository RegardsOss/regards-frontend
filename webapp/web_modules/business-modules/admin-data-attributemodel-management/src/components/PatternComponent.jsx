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
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { RenderTextField, RenderCheckbox, Field } from '@regardsoss/form-utils'

/**
 * Handle pattern restriction
 */
export class PatternComponent extends React.Component {
  static propTypes = {
    // redux form
    change: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onTextFieldChange = (event) => {
    this.props.change('restriction.PATTERN.active', true)
  }

  render() {
    return (
      <div>
        <Field
          name="restriction.PATTERN.active"
          component={RenderCheckbox}
          label={this.context.intl.formatMessage({ id: 'attrmodel.form.restriction.PATTERN.active' })}
          alwaysShowError
        />
        <Field
          name="restriction.PATTERN.pattern"
          onChange={this.onTextFieldChange}
          fullWidth
          component={RenderTextField}
          type="text"
          label={this.context.intl.formatMessage({ id: 'attrmodel.form.restriction.PATTERN.pattern' })}
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
export function initializePatternForm(initialValues, currentAttrModel) {
  const formValues = initialValues
  formValues.restriction.PATTERN = {}
  formValues.restriction.PATTERN.active = true
  formValues.restriction.PATTERN.pattern = currentAttrModel.content.restriction.pattern
  return formValues
}

export default PatternComponent
