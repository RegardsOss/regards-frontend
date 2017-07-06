/**
 * LICENSE_PLACEHOLDER
 **/
import Info from 'material-ui/svg-icons/action/lightbulb-outline'


export default class HelpMessageComponent extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
  }
  static styleContainer = { display: 'flex', alignItems: 'center' }
  static styleIcon = { width: '24px', height: '24px', marginRight: '10px' }

  render() {
    return (<span style={HelpMessageComponent.styleContainer}>
      <Info style={HelpMessageComponent.styleIcon} />
      {this.props.message}
    </span>)
  }
}
