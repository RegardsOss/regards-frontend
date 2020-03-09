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
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import LinearProgress from 'material-ui/LinearProgress'
import { SwitchThemeDecorator } from '@regardsoss/theme'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { ErrorDecoratorComponent } from '@regardsoss/components'
import messages from '../../i18n'

/**
 * Confirm action dialog component. Switches dialog modes to show adequate button
 * @author Sébastien Binda
 */
class SessionDeleteDialogComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    allowForceOption: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onForceDelete: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool,
  }

  static defaultProps = {
    open: true,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    loading: false,
  }

  handleConfirm = (action) => {
    console.error('action', action)
    const { intl: { formatMessage } } = this.context
    const request = action()
    if (request) {
      this.setState({ loading: true })
      request.then((response) => {
        let error = null
        if (response.error) {
          error = formatMessage({ id: 'acquisition-sessions.menus.session.delete.dialog.deletion.error' })
        } else {
          this.props.onClose()
        }
        this.setState({ loading: false, error })
      })
    } else {
      this.props.onClose()
    }
  }

  renderActions = () => {
    const { onClose, onForceDelete, onDelete } = this.props
    const { intl: { formatMessage } } = this.context
    const actions = [
      <FlatButton
        key="cancel"
        label={formatMessage({ id: 'acquisition-sessions.menus.session.delete.dialog.cancel.button' })}
        primary
        keyboardFocused
        onClick={onClose}
      />,
      <FlatButton
        key="delete"
        label={formatMessage({ id: 'acquisition-sessions.menus.session.delete.dialog.delete.button' })}
        onClick={() => this.handleConfirm(onDelete)}
        disabled={this.state.loading}
      />,
    ]

    if (this.props.allowForceOption) {
      actions.push(<FlatButton
        key="forceDelete"
        label={formatMessage({ id: 'acquisition-sessions.menus.session.delete.dialog.force.button' })}
        onClick={() => this.handleConfirm(onForceDelete)}
        disabled={this.state.loading}
      />)
    }
    return actions
  }

  render() {
    const {
      title, message, onClose, open,
    } = this.props
    return (
      <SwitchThemeDecorator
        useMainTheme
      >
        <Dialog
          title={title}
          actions={this.renderActions()}
          modal={false}
          open={open}
          onRequestClose={onClose}
        >
          <ErrorDecoratorComponent>
            {this.state.error}
          </ErrorDecoratorComponent>
          {this.state.loading ? <LinearProgress mode="indeterminate" /> : null}
          {message}
        </Dialog>
      </SwitchThemeDecorator>
    )
  }
}

export default withI18n(messages)(SessionDeleteDialogComponent)
