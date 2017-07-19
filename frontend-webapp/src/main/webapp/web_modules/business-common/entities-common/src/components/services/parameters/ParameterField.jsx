/**
* LICENSE_PLACEHOLDER
**/
import DynamicServiceParameter from '../../../definitions/service/DynamicServiceParameter'

/**
* A parameter field
*/
class ParameterField extends React.Component {

  static propTypes = {
    parameter: PropTypes.instanceOf(DynamicServiceParameter),
  }

  render() {
    const { parameter } = this.props
    switch (parameter.type) {
      case DynamicServiceParameter.ParameterType.CHOICE:
        <ChoiceParameterField parameter={parameter} />
      case DynamicServiceParameter.ParameterType.DATE:
        <DateParameterField parameter={parameter} />
      case DynamicServiceParameter.ParameterType.STRING:
        <StringParameterField parameter={parameter} />
      case DynamicServiceParameter.ParameterType.NUMBER:
        <NumberParameterField parameter={parameter} />
    }
    return (
      <div />
    )
  }
}
export default ParameterField
