/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Confirm action dialog component. Switches dialog mode,
 */
class RelaunchSelectedSIPsDialogComponent extends React.Component {
  static propTypes = {
    onRelaunch: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  renderActions = () => {
    const { onClose, onRelaunch } = this.props
    const { intl: { formatMessage } } = this.context
    return [
      <FlatButton
        key="cancel"
        id="confirm.dialog.cancel"
        label={formatMessage({ id: 'oais.sip.cancel.relaunch' })}
        primary
        keyboardFocused
        onClick={onClose}
      />,
      <FlatButton
        key="relaunchsip"
        className="selenium-confirmDialogButton"
        label={formatMessage({ id: 'oais.sip.confirm.relaunch' })}
        onClick={onRelaunch}
      />,
    ]
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <Dialog
        title={formatMessage({ id: 'oais.sip.confirm.relaunch.title' })}
        actions={this.renderActions()}
        modal
        open
      >
        {formatMessage({ id: 'oais.sip.confirm.relaunch.message' }) }
      </Dialog>

    )
  }
}

export default RelaunchSelectedSIPsDialogComponent
