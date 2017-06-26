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

