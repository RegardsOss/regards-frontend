/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import LinearProgress from 'material-ui/LinearProgress'
import { SwitchThemeDecorator } from '@regardsoss/theme'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import ErrorDecoratorComponent from '../error/ErrorDecoratorComponent'
import messages from './i18n'

/**
 * possible dialog types
 */
export const ConfirmDialogComponentTypes = {
  DELETE: {
    messageId: 'confirm.dialog.delete',
  },
  REFUSE: {
    messageId: 'confirm.dialog.refuse',
  },
  CONFIRM: {
    messageId: 'confirm.dialog.confirm',
  },
}

/**
 * Confirm action dialog component. Switches dialog modes to show adequate button
 */
class ConfirmDialogComponent extends React.Component {
  static propTypes = {
    dialogType: PropTypes.oneOf(values(ConfirmDialogComponentTypes)),
    title: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    message: PropTypes.any, // optional
    errorMessage: PropTypes.string, // optional
    onConfirm: PropTypes.func.isRequired,
    confirmMessageKey: PropTypes.string,
    // onClose is always called whether the popup is closed or submitted
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool,
  }

  static defaultProps = {
    dialogType: ConfirmDialogComponentTypes.CONFIRM,
    open: true,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    loading: false,
  }

  handleConfirm = () => {
    const { intl: { formatMessage } } = this.context
    const request = this.props.onConfirm()
    if (request) {
      this.setState({ loading: true })
      request.then((response) => {
        let error = null
        if (response.error) {
          error = this.props.errorMessage || formatMessage({ id: 'confirm.dialog.unknown.error' })
        } else {
          this.props.onClose()
        }
        this.setState({ loading: false, error })
      })
    } else {
      this.props.onClose()
    }
  }

  render() {
    const {
      title, message, onClose, open,
      dialogType,
    } = this.props
    const { intl: { formatMessage } } = this.context
    const confirmMessageKey = this.props.confirmMessageKey || dialogType.messageId
    return (
      <SwitchThemeDecorator
        useMainTheme
      >
        <Dialog
          title={title}
          actions={<>
            <FlatButton
              key="cancel"
              id="confirm.dialog.cancel"
              label={formatMessage({ id: 'confirm.dialog.cancel' })}
              onClick={onClose}
            />
            <FlatButton
              key={confirmMessageKey}
              primary
              keyboardFocused
              className="selenium-confirmDialogButton"
              label={formatMessage({ id: confirmMessageKey })}
              onClick={this.handleConfirm}
              disabled={this.state.loading}
            />
          </>}
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

export default withI18n(messages, true)(ConfirmDialogComponent)
