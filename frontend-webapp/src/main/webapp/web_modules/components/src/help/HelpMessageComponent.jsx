/**
 * LICENSE_PLACEHOLDER
 **/
import Stars from 'material-ui/svg-icons/action/stars'


export default class HelpMessageComponent extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
  }
  static styleContainer = {display: 'flex', alignItems: 'center'}
  static styleIcon = {width: '24px', height: '24px', marginRight: '10px'}

  render () {
    return (<span style={HelpMessageComponent.styleContainer}>
      <Stars style={HelpMessageComponent.styleIcon} />
      {this.props.message}
    </span>)
  }
}