/**
* LICENSE_PLACEHOLDER
**/
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { i18nContextType } from '@regardsoss/i18n'
import { ErrorTypes } from '@regardsoss/form-utils'
import DynamicServiceParameter from '../../../definitions/service/DynamicServiceParameter'

/**
* Number parameter field
*/
class NumberParameterField extends React.Component {

  static propTypes = {
    parameter: PropTypes.instanceOf(DynamicServiceParameter),
  }

  /**
   * Validates this field value
   * @param {*} value  value
   * @param {*} allValues all form values (unused)
   * @param {*} props this properties
   */
  validate = (value, allValues, { parameter }) => {
    const { intl: { formatMessage } } = this.context
    if (!value && parameter.required) {
      return formatMessage(ErrorTypes.REQUIRED)
    }
    return undefined
  }

  render() {
    const { parameter: { id, name } } = this.props
    return (
      <Field
        name={id}
        component={TextField}
        hintText={name}
        validate={this.validate}
      />
    )
  }
}
export default NumberParameterField
