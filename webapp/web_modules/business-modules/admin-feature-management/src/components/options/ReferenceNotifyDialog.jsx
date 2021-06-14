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
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import messages from '../../i18n'

/**
  * Confirm action dialog component.
  */
export class ReferenceNotifyDialog extends React.Component {
  static propTypes = {
    onConfirmNotify: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { onClose, onConfirmNotify } = this.props
    const { intl: { formatMessage } } = this.context

    return (
      <Dialog
        title={formatMessage({ id: 'feature.references.notify.title' })}
        actions={<>
          <FlatButton
            key="cancel"
            id="confirm.dialog.cancel"
            label={formatMessage({ id: 'feature.close' })}
            keyboardFocused
            onClick={onClose}
          />
          <FlatButton
            key="deleteReference"
            className="selenium-confirmDialogButton"
            primary
            keyboardFocused
            label={formatMessage({ id: 'feature.references.notify' })}
            onClick={onConfirmNotify}
          />
        </>}
        modal={false}
        open
      >
        {formatMessage({ id: 'feature.references.notify.message' })}
      </Dialog>
    )
  }
}

export default withI18n(messages)(ReferenceNotifyDialog)
