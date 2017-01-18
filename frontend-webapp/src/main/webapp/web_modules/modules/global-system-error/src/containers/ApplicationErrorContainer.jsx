/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
import { closeErrorDialog } from '../model/action'

/**
 * React component to display a dialog box containing the global current error message
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
      return (
        <Snackbar
          open={this.props.snackBarOpened}
          message={this.props.snackBarMessage}
          autoHideDuration={40000}
          onRequestClose={this.props.closeDialog}
          onActionTouchTap={this.props.closeDialog}
          action="OK"
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
