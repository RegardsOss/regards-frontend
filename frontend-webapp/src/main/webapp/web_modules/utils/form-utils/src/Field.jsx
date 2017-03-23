/**
 * LICENSE_PLACEHOLDER
 **/
import { Field } from 'redux-form'
import { intlShape } from 'react-intl'

class FieldWithIntl extends React.Component {
  static contextTypes = {
    intl: intlShape,
  }
  render() {
    return (<Field {...this.props} intl={this.context.intl} />)
  }
}

export default FieldWithIntl
