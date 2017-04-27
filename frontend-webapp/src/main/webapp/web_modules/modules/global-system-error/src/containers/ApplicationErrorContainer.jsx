/**
 * LICENSE_PLACEHOLDER
 **/
// cannot import our connect method here, cyclic dependencies
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
import { closeErrorDialog } from '../model/action'

/**
 * React component to display a dialog box containing the global current error message
 * @author Sébastien binda
 */
class ApplicationErrorContainer extends React.Component {

  static propTypes = {
    snackBarOpened: React.PropTypes.bool,
    snackBarMessage: React.PropTypes.string,
    // Set by mapDispatchToProps
    closeDialog: React.PropTypes.func,
  }

  render() {
    if (this.props.snackBarOpened) {
      const message = this.props.snackBarMessage
      return (
        <Snackbar
          open={this.props.snackBarOpened}
          message={message}
          onRequestClose={this.props.closeDialog}
          onActionTouchTap={this.props.closeDialog}
          action="OK"
          bodyStyle={{ height: 'auto', lineHeight: '28px', padding: 24, whiteSpace: 'pre-line' }}
        />
      )
    }
    return null
  }
}

const mapStateToProps = state => ({
  // Add theme from store to the components props
  snackBarOpened: state.common.error.opened ? state.common.error.opened : false,
  snackBarMessage: state.common.error.message ? state.common.error.message : '',
})

const mapDispatchToProps = dispatch => ({
  closeDialog: () => dispatch(closeErrorDialog()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationErrorContainer)
