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
import messages from '../../i18n'

/**
 * Confirm action dialog component. Switches dialog mode,
 */
export class AIPDeleteDialog extends React.Component {
  static propTypes = {
    onConfirmDelete: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static DELETION_MODE = {
    BY_STATE: 'BY_STATE',
    IRREVOCABLY: 'IRREVOCABLY',
  }

  /** User callback: delete by state */
  onConfirmDeleteByState = () => {
    const { onConfirmDelete } = this.props
    onConfirmDelete(AIPDeleteDialog.DELETION_MODE.BY_STATE)
  }

  /** User callback: delete by state */
  onConfirmDeleteIrrevocably = () => {
    const { onConfirmDelete } = this.props
    onConfirmDelete(AIPDeleteDialog.DELETION_MODE.IRREVOCABLY)
  }

  render() {
    const { onClose } = this.props
    const { intl: { formatMessage, formatHTMLMessage } } = this.context

    return (
      <Dialog
        title={formatMessage({ id: 'oais.packages.delete.title' })}
        actions={<>
          <FlatButton
            key="cancel"
            id="confirm.dialog.cancel"
            label={formatMessage({ id: 'oais.packages.close' })}
            primary
            keyboardFocused
            onClick={onClose}
          />
          <FlatButton
            key="deleteSipsIrrevocably"
            className="selenium-confirmDialogButton"
            label={formatMessage({ id: 'oais.packages.delete.irrevocably' })}
            onClick={this.onConfirmDeleteIrrevocably}
          />
          <FlatButton
            key="deleteSipsByState"
            className="selenium-confirmDialogButton"
            label={formatMessage({ id: 'oais.packages.delete.by_state' })}
            onClick={this.onConfirmDeleteByState}
          />
        </>}
        modal={false}
        open
      >
        {formatHTMLMessage({ id: 'oais.packages.confirm.delete.message' })}
      </Dialog>
    )
  }
}

export default withI18n(messages)(AIPDeleteDialog)
