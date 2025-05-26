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
import EmailIcon from 'mdi-material-ui/Email'
import { AdminInstanceShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { HateoasIconAction } from '@regardsoss/components'
import { HateoasKeys } from '@regardsoss/display-control'
import { AdminInstanceDomain } from '@regardsoss/domain'

/**
 * @author Théo Lasserre
 */
class SendEmailComponent extends React.Component {
  static propTypes = {
    entity: AdminInstanceShapes.Account,
    isFetchingActions: PropTypes.bool.isRequired,
    onSendEmailConfirmation: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * @return {boolean} true if administrator can resend a confirmation email
   */
  static canSendConfirmationEmail(account) {
    return AdminInstanceDomain.ACCOUNT_STATUS_ENUM.EMAIL_VERIFICATION === account.content.status
  }

  onClick = () => {
    const { entity, onSendEmailConfirmation } = this.props
    onSendEmailConfirmation(entity)
  }

  render() {
    const { isFetchingActions, entity } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <HateoasIconAction
        disabled={isFetchingActions || !SendEmailComponent.canSendConfirmationEmail(entity)}
        title={formatMessage({ id: 'account.list.table.action.send.email.tooltip' })}
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
