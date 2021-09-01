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
import EmailIcon from 'mdi-material-ui/Email'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import IconButton from 'material-ui/IconButton'

/**
 * @author Théo Lasserre
 */
class SendEmailComponent extends React.Component {
  static propTypes = {
    entity: AccessShapes.ProjectUser.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onSendEmailConfirmation: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  onClick = () => {
    const { entity, onSendEmailConfirmation } = this.props
    const userEmail = entity.content.email
    onSendEmailConfirmation(userEmail)
  }

  render() {
    const { isLoading } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        disabled={isLoading}
        title={formatMessage({ id: 'projectUser.list.table.action.send.email' })}
        onClick={this.onClick}
        className="selectium-sendEmail"
      >
        <EmailIcon />
      </IconButton>
    )
  }
}
export default SendEmailComponent
