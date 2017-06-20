/**
 * LICENSE_PLACEHOLDER
 **/
import IconButton from 'material-ui/IconButton'
import BoardActionShape from './BoardActionShape'

/**
 * Action displayed in boadItem
 *
 * @author Sébastien Binda
 */
class BoardItemAction extends React.Component {

  static propTypes = {
    action: BoardActionShape.isRequired,
    openConfirmDialog: PropTypes.func,
  }

  componentWillMount() {
    if (this.props.action.initialize) {
      this.props.action.initialize()
    }
  }
  render() {
    const { action, openConfirmDialog } = this.props
    if (action.customRender) {
      return action.customRender
    }
    return (<IconButton
      tooltip={action.tooltipMsg}
      onTouchTap={action.confirmMessage ? () => openConfirmDialog(action) : action.touchTapAction}
      className={action.className}
    >
      {action.icon}
    </IconButton>)
  }

}

export default BoardItemAction
