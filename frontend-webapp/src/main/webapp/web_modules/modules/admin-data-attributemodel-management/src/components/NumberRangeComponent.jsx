import { FormattedMessage } from 'react-intl'
import { RenderTextField, RenderCheckbox, Field } from '@regardsoss/form-utils'

/**
 * Handle integer or float range restriction
 */
export class NumberRangeComponent extends React.Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
  }

  render() {
    const { type } = this.props
    return (
      <div>
        <Field
          name={`restriction.${type}.active`}
          component={RenderCheckbox}
          label={<FormattedMessage id="attrmodel.form.restriction.NUMBER_RANGE.active" />}
        />
        <Field
          name={`restriction.${type}.min`}
          fullWidth
          component={RenderTextField}
          type="number"
          label={<FormattedMessage id="attrmodel.form.restriction.NUMBER_RANGE.min" />}
        />
        <Field
          name={`restriction.${type}.isMinInclusive`}
          component={RenderCheckbox}
          label={<FormattedMessage id="attrmodel.form.restriction.NUMBER_RANGE.isMinInclusive" />}
        />
        <Field
          name={`restriction.${type}.max`}
          fullWidth
          component={RenderTextField}
          type="number"
          label={<FormattedMessage id="attrmodel.form.restriction.NUMBER_RANGE.max" />}
        />
        <Field
          name={`restriction.${type}.isMaxInclusive`}
          component={RenderCheckbox}
          label={<FormattedMessage id="attrmodel.form.restriction.NUMBER_RANGE.isMaxInclusive" />}
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
  if (currentAttrModel.content.restriction.minInclusive) {
    formValues.restriction[type].min = currentAttrModel.content.restriction.minInclusive
    formValues.restriction[type].isMinInclusive = true
  } else if (currentAttrModel.content.restriction.minExclusive) {
    formValues.restriction[type].min = currentAttrModel.content.restriction.minExclusive
    formValues.restriction[type].isMinInclusive = false
  }
  if (currentAttrModel.content.restriction.maxInclusive) {
    formValues.restriction[type].max = currentAttrModel.content.restriction.maxInclusive
    formValues.restriction[type].isMaxInclusive = true
  } else if (currentAttrModel.content.restriction.maxExclusive) {
    formValues.restriction[type].max = currentAttrModel.content.restriction.maxExclusive
    formValues.restriction[type].isMaxInclusive = false
  }
  return initialValues
}

export default NumberRangeComponent

