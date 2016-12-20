import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, RenderCheckbox, RenderSelectField, Field } from '@regardsoss/form-utils'
import { reduxForm } from 'redux-form'

/**
 * Display edit and create attribute model form
 */
export class IntegerRangeComponent extends React.Component {

  render() {
    return (
      <div>
        <Field
          name="restriction.INTEGER_RANGE.active"
          component={RenderCheckbox}
          label={<FormattedMessage id="attrmodel.form.restriction.INTEGER_RANGE.active" />}
        />
        <Field
          name="restriction.INTEGER_RANGE.min"
          fullWidth
          component={RenderTextField}
          type="number"
          label={<FormattedMessage id="attrmodel.form.restriction.INTEGER_RANGE.min" />}
        />
        <Field
          name="restriction.INTEGER_RANGE.isMinInclusive"
          component={RenderCheckbox}
          label={<FormattedMessage id="attrmodel.form.restriction.INTEGER_RANGE.isMinInclusive" />}
        />
        <Field
          name="restriction.INTEGER_RANGE.max"
          fullWidth
          component={RenderTextField}
          type="number"
          label={<FormattedMessage id="attrmodel.form.restriction.INTEGER_RANGE.max" />}
        />
        <Field
          name="restriction.INTEGER_RANGE.isMaxInclusive"
          component={RenderCheckbox}
          label={<FormattedMessage id="attrmodel.form.restriction.INTEGER_RANGE.isMaxInclusive" />}
        />
      </div>
    )
  }
}

export function initializeIntegerRangeForm(initialValues, currentAttrModel) {
  initialValues.restriction.INTEGER_RANGE = {}
  initialValues.restriction.INTEGER_RANGE.active = true
  if (currentAttrModel.content.restriction.minInclusive) {
    initialValues.restriction.INTEGER_RANGE.min = currentAttrModel.content.restriction.minInclusive
    initialValues.restriction.INTEGER_RANGE.isMinInclusive = true
  } else if (currentAttrModel.content.restriction.minExclusive) {
    initialValues.restriction.INTEGER_RANGE.min = currentAttrModel.content.restriction.minExclusive
    initialValues.restriction.INTEGER_RANGE.isMinInclusive = false
  }
  if (currentAttrModel.content.restriction.maxInclusive) {
    initialValues.restriction.INTEGER_RANGE.max = currentAttrModel.content.restriction.maxInclusive
    initialValues.restriction.INTEGER_RANGE.isMaxInclusive = true
  } else if (currentAttrModel.content.restriction.maxExclusive) {
    initialValues.restriction.INTEGER_RANGE.max = currentAttrModel.content.restriction.maxExclusive
    initialValues.restriction.INTEGER_RANGE.isMaxInclusive = false
  }
  return initialValues
}

export default IntegerRangeComponent

