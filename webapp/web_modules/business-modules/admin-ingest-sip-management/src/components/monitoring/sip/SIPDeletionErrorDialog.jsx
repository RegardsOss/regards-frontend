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
import map from 'lodash/map'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import messages from '../../../i18n'

/**
* Component to display a dialog containing errors during SIP deletion.
* @author Sébastien Binda
*/
class SIPDeletionErrorDialog extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    sipId: PropTypes.string, // provided only when there are errors
    errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
  }

  renderActions = () => {
    const { onClose } = this.props
    const { intl: { formatMessage } } = this.context
    return [
      <FlatButton
        key="cancel"
        id="confirm.dialog.cancel"
        label={formatMessage({ id: 'sip.delete.error.dialog.close' })}
        primary
        keyboardFocused
        onClick={onClose}
      />,
    ]
  }

  render() {
    const { errors, sipId } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <Dialog
        title={formatMessage({ id: 'sip.delete.error.title' }, { id: sipId })}
        actions={this.renderActions()}
        modal={false}
        open={errors.length > 0}
      >
        <ul>
          {map(errors, error => <li>{error}<br /></li>)}
        </ul>
      </Dialog>

    )
  }
}
export default withI18n(messages)(SIPDeletionErrorDialog)
