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
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import messages from '../../../i18n'

/**
 * Confirm action dialog component. Switches dialog mode,
 */
class SIPConfirmDeleteDialog extends React.Component {
  static propTypes = {
    sipId: PropTypes.string.isRequired,
    onDeleteSip: PropTypes.func.isRequired,
    onDeleteSips: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  handleDelete = (action) => {
    Promise.resolve(action()).then(this.props.onClose)
  }

  renderActions = () => {
    const { onClose } = this.props
    const { intl: { formatMessage } } = this.context
    return [
      <FlatButton
        key="cancel"
        id="confirm.dialog.cancel"
        label={formatMessage({ id: 'sip.cancel.delete' })}
        primary
        keyboardFocused
        onClick={onClose}
      />,
      <FlatButton
        key="deleteSIP"
        className="selenium-confirmDialogButton"
        label={formatMessage({ id: 'sip.confirm.delete.sip' })}
        onClick={() => this.handleDelete(this.props.onDeleteSip)}
      />,
      <FlatButton
        key="deleteSIPS"
        className="selenium-confirmDialogButton"
        label={formatMessage({ id: 'sip.confirm.delete.sips' })}
        onClick={() => this.handleDelete(this.props.onDeleteSips)}
      />,
    ]
  }

  render() {
    const { sipId } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <Dialog
        title={formatMessage({ id: 'sip.confirm.delete.title' }, { id: sipId })}
        actions={this.renderActions()}
        modal={false}
        open
      >
        {formatMessage({ id: 'sip.confirm.delete.message' })}
      </Dialog>

    )
  }
}

export default withI18n(messages)(SIPConfirmDeleteDialog)
