/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { SwitchThemeDecorator } from '@regardsoss/theme'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
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
    message: PropTypes.string, // optional
    onConfirm: PropTypes.func.isRequired,
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

  handleDelete = () => {
    Promise.resolve(this.props.onConfirm()).then(this.props.onClose)
  }

  renderActions = () => {
    const { dialogType, onClose } = this.props
    const { intl: { formatMessage } } = this.context
    const confirmMessageKey = dialogType.messageId
    return [
      <FlatButton
        key="cancel"
        id="confirm.dialog.cancel"
        label={formatMessage({ id: 'confirm.dialog.cancel' })}
        primary
        keyboardFocused
        onClick={onClose}
      />,
      <FlatButton
        key={confirmMessageKey}
        className="selenium-confirmDialogButton"
        label={formatMessage({ id: confirmMessageKey })}
        onClick={this.handleDelete}
      />,
    ]
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
          {message}
        </Dialog>
      </SwitchThemeDecorator>
    )
  }
}

export default withI18n(messages)(ConfirmDialogComponent)
