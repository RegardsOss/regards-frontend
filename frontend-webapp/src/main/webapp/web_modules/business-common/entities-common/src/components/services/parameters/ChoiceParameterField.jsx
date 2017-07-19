/**
* LICENSE_PLACEHOLDER
**/
import { Field } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import { SelectField } from 'redux-form-material-ui'
import DynamicServiceParameter from '../../../definitions/service/DynamicServiceParameter'

/**
* Choice parameter field
*/
class ChoiceParameterField extends React.Component {

  static propTypes = {
    parameter: PropTypes.instanceOf(DynamicServiceParameter),
  }

  render() {
    const { parameter: { id, name, choices } } = this.props
    return (
      <Field
        name={id}
        component={SelectField}
        hintText={name}
      >
        {
          choices.map(choice => <MenuItem key={choice} value={choice} primaryText={choice} />)
        }
      </Field>
    )
  }
}
export default ChoiceParameterField
