/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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
    snackBarOpened: PropTypes.bool,
    snackBarMessage: PropTypes.string,
    // Set by mapDispatchToProps
    closeDialog: PropTypes.func,
  }

  static COMP_STYLE = {
    height: 'auto', lineHeight: '28px', padding: 24, whiteSpace: 'pre-line',
  }

  render() {
    if (this.props.snackBarOpened) {
      const message = this.props.snackBarMessage
      return (
        <Snackbar
          open={this.props.snackBarOpened}
          message={message}
          onRequestClose={this.props.closeDialog}
          onActionClick={this.props.closeDialog}
          action="OK"
          bodyStyle={ApplicationErrorContainer.COMP_STYLE}
        />
      )
    }
    return null
  }
}

const mapStateToProps = (state) => ({
  // Add theme from store to the components props
  snackBarOpened: state.common.error.opened ? state.common.error.opened : false,
  snackBarMessage: state.common.error.message ? state.common.error.message : '',
})

const mapDispatchToProps = (dispatch) => ({
  closeDialog: () => dispatch(closeErrorDialog()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationErrorContainer)
