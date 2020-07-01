/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
// import Dialog from 'material-ui/Dialog'
import ConfirmDialogComponent from './ConfirmDialogComponent'
import getDisplayName from '../getDisplayName'

/**
 * Decorates a React component.
 * Intercepts the action performed on click in order to add a confirm modal before performing the action.
 *
 * @type {function}
 * @param {React.Component} DecoratedComponent The component to enhance
 * @return {React.Component}
 * @author Xavier-Alexandre Brochard
 */
const withConfirmDialog = (DecoratedComponent) => {
  class WithConfirmDialog extends React.Component {
    static propTypes = {
      onClick: PropTypes.func.isRequired,
      dialogTitle: PropTypes.string.isRequired,
      dialogMessage: PropTypes.string,
    }

    static displayName = `WithConfirmDialog(${getDisplayName(DecoratedComponent)})`

    state = {
      open: false,
    }

    handleOpen = () => {
      this.setState({ open: true })
    }

    handleConfirm = (evt) => {
      // A - close dialog
      this.handleClose()
      // B - run action
      const { onClick } = this.props
      onClick(evt)
    }

    handleClose = () => {
      this.setState({ open: false })
    }

    render() {
      const { dialogTitle, dialogMessage, ...otherProps } = this.props
      const { open } = this.state
      otherProps.onClick = this.handleOpen
      const decoratedComponentElement = React.createElement(DecoratedComponent, otherProps)

      return (
        <>
          {decoratedComponentElement}
          <ConfirmDialogComponent
            title={dialogTitle}
            message={dialogMessage}
            onConfirm={this.handleConfirm}
            onClose={this.handleClose}
            open={open}
          />
        </>
      )
    }
  }

  return WithConfirmDialog
}

export default withConfirmDialog
