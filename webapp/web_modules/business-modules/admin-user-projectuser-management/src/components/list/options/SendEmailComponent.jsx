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
import EmailIcon from 'mdi-material-ui/Email'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { HateoasIconAction } from '@regardsoss/components'
import { HateoasKeys } from '@regardsoss/display-control'

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
    const { isLoading, entity } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <HateoasIconAction
        disabled={isLoading}
        title={formatMessage({ id: 'projectUser.list.table.action.send.email' })}
        onClick={this.onClick}
        // HATOAS control
        entityLinks={entity.links}
        hateoasKey={HateoasKeys.SEND_VERIFICATION_EMAIL}
        disableInsteadOfHide
      >
        <EmailIcon />
      </HateoasIconAction>
    )
  }
}
export default SendEmailComponent
