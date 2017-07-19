/**
* LICENSE_PLACEHOLDER
**/
import { Field } from 'redux-form'
import { DatePicker } from 'redux-form-material-ui'
import { i18nContextType } from '@regardsoss/i18n'
import { ErrorTypes } from '@regardsoss/form-utils'
import DynamicServiceParameter from '../../../definitions/service/DynamicServiceParameter'

/**
* String parameter field
*/
class StringParameterField extends React.Component {

  static propTypes = {
    parameter: PropTypes.instanceOf(DynamicServiceParameter),
  }


  render() {
    const { maProp } = this.props
    return (
      <div />
    )
  }
}
export default StringParameterField
