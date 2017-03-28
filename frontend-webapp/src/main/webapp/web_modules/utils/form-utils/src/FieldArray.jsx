/**
 * LICENSE_PLACEHOLDER
 **/
import { FieldArray } from 'redux-form'
import { intlShape } from 'react-intl'

class FieldArrayWithIntl extends React.Component {
  static contextTypes = {
    intl: intlShape,
  }
  render() {
    return (<FieldArray {...this.props} intl={this.context.intl} />)
  }
}

export default FieldArrayWithIntl
