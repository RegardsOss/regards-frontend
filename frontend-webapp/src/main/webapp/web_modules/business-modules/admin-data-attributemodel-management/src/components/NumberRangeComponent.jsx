import { RenderTextField, RenderCheckbox, Field } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Handle integer or float range restriction
 */
export class NumberRangeComponent extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
  }
  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { type } = this.props
    return (
      <div>
        <Field
          name={`restriction.${type}.active`}
          component={RenderCheckbox}
          label={this.context.intl.formatMessage({ id: 'attrmodel.form.restriction.NUMBER_RANGE.active' })}
        />
        <Field
          name={`restriction.${type}.min`}
          fullWidth
          component={RenderTextField}
          type="number"
          label={this.context.intl.formatMessage({ id: 'attrmodel.form.restriction.NUMBER_RANGE.min' })}
        />
        <Field
          name={`restriction.${type}.isMinInclusive`}
          component={RenderCheckbox}
          label={this.context.intl.formatMessage({ id: 'attrmodel.form.restriction.NUMBER_RANGE.isMinInclusive' })}
        />
        <Field
          name={`restriction.${type}.max`}
          fullWidth
          component={RenderTextField}
          type="number"
          label={this.context.intl.formatMessage({ id: 'attrmodel.form.restriction.NUMBER_RANGE.max' })}
        />
        <Field
          name={`restriction.${type}.isMaxInclusive`}
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

