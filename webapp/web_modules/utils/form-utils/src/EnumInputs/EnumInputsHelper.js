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
import forEach from 'lodash/forEach'
import pickBy from 'lodash/pickBy'
import valuesIn from 'lodash/valuesIn'

/**
 *
 * @param currentFormValues initial values provided to the form, to be able to reedit that field
 * @param currentEnumValues object received from the API
 * @returns {*} object sent to redux-form to correctly initialize form inputs
 */
function apiResultIntoFormValues(currentFormValues, currentEnumValues, inputKey) {
  const formValues = currentFormValues
  formValues.enumform = {}
  formValues.enumform[inputKey] = {}
  formValues.enumform[inputKey].inputs = {}
  forEach(currentEnumValues, (currentEnumValue, key) => {
    formValues.enumform[inputKey].inputs[`input${key}`] = currentEnumValue
  })
  return formValues
}

/**
 * Extract values from form result and create an array of string
 * @param values
 * @return [string] resulting array
 */
function formValuesIntoApiData(values, inputKey) {
  let enumValues = []
  if (values && values.enumForm && values.enumForm.length > 0
    && values.enumform[inputKey] && values.enumform[inputKey].inputs) {
    enumValues = valuesIn(pickBy(values.enumform[inputKey].inputs, (val) => val && val.length > 0))
  }
  return enumValues
}

export default {
  formValuesIntoApiData, apiResultIntoFormValues,
}
