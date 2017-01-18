import { map, pickBy, valuesIn } from 'lodash'


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
  map(currentEnumValues, (currentEnumValue, key) => {
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
  if (values.enumform[inputKey] && values.enumform[inputKey].inputs) {
    enumValues = valuesIn(pickBy(values.enumform[inputKey].inputs, val => val && val.length > 0))
  }
  return enumValues
}

export default {
  formValuesIntoApiData, apiResultIntoFormValues,
}
