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
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import messages from '../../i18n'

/**
 * Confirm action dialog component. Switches dialog mode,
 */
export class RequestDeleteDialog extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirmDelete: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { open, onConfirmDelete, onClose } = this.props
    const { intl: { formatMessage }, moduleTheme: { noteStyle } } = this.context

    return (
      <Dialog
        title={formatMessage({ id: 'oais.requests.confirm.delete.title' })}
        actions={<>
          <FlatButton
            key="cancel"
            id="confirm.dialog.cancel"
            label={formatMessage({ id: 'oais.requests.confirm.delete.close' })}
            primary
            keyboardFocused
            onClick={onClose}
          />
          <FlatButton
            key="deleteRequestsIrrevocably"
            className="selenium-confirmDialogButton"
            label={formatMessage({ id: 'oais.requests.confirm.delete' })}
            onClick={onConfirmDelete}
          />
        </>}
        modal={false}
        open={open}
      >
        <div>{formatMessage({ id: 'oais.requests.confirm.delete.message' })}</div>
        <div style={noteStyle}>{formatMessage({ id: 'oais.requests.confirm.delete.note' })}</div>
      </Dialog>
    )
  }
}

export default withI18n(messages)(RequestDeleteDialog)
