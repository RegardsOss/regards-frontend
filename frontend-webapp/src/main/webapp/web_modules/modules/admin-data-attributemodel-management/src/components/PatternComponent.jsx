import { FormattedMessage } from 'react-intl'
import { RenderTextField, RenderCheckbox, RenderSelectField, Field } from '@regardsoss/form-utils'

/**
 * Handle pattern restriction
 */
export class PatternComponent extends React.Component {

  render() {
    return (
      <div>
        <Field
          name="restriction.PATTERN.active"
          component={RenderCheckbox}
          label={<FormattedMessage id="attrmodel.form.restriction.PATTERN.active" />}
        />
        <Field
          name="restriction.PATTERN.pattern"
          fullWidth
          component={RenderTextField}
          type="text"
          label={<FormattedMessage id="attrmodel.form.restriction.PATTERN.pattern" />}
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
  initialValues.restriction.PATTERN = {}
  initialValues.restriction.PATTERN.active = true
  initialValues.restriction.PATTERN.pattern = currentAttrModel.content.restriction.pattern
  return initialValues
}

export default PatternComponent

