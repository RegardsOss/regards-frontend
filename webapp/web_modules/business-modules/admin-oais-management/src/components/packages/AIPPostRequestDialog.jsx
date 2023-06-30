/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
export class AIPPostRequestDialog extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    deletionErrors: PropTypes.arrayOf(PropTypes.string),
    modifyErrors: PropTypes.arrayOf(PropTypes.string),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { onClose } = this.props
    const { intl: { formatMessage } } = this.context
    const { deletionErrors, modifyErrors } = this.props

    return (
      <Dialog
        title={formatMessage({ id: 'oais.packages.post.title' })}
        actions={<>
          <FlatButton
            key="cancel"
            id="confirm.dialog.cancel"
            label={formatMessage({ id: 'oais.packages.close' })}
            primary
            keyboardFocused
            onClick={onClose}
          />
        </>}
        modal={false}
        open
      >
        {deletionErrors}
        {modifyErrors}
        {formatMessage({ id: 'oais.packages.post.message' })}
      </Dialog>
    )
  }
}

export default withI18n(messages)(AIPPostRequestDialog)
