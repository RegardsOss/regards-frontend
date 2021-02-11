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
 */
import { FormattedMessage } from 'react-intl'
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import values from 'lodash/values'

/**
 * Possible Ids for this message displayer, corresponds to the message / stage to show
 */
export const operationIds = {
  askResetPasswordSent: 'ask.reset.password.sent',
  askResetPasswordTokenExpired: 'ask.reset.password.token.expired',
  resetPasswordDone: 'reset.password.done',
  askUnlockAccountSent: 'ask.unlock.account.sent',
  askUnlockAccountTokenExpired: 'ask.unlock.account.token.expired',
  unlockAccountDone: 'unlock.account.done',
  askProjectAccessSent: 'ask.project.access.sent',
  createAccountSent: 'create.account.sent',
  newAccountValidated: 'new.account.validated',
  newAccountTokenExpired: 'new.account.token.expired',
}

/**
 * Shows the user the 'operation complete' view, for account operations
 */
class AccountOperationMessage extends React.Component {
  static propTypes = {
    operationId: PropTypes.oneOf(values(operationIds)).isRequired,
    operationAction: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType, ...i18nContextType,
  }

  render() {
    const { operationId, operationAction } = this.props
    const { moduleTheme } = this.context

    return (
      <Card>
        <CardTitle title={<FormattedMessage id={`${operationId}.title`} />} />
        <CardText>
          <FormattedMessage id={`${operationId}.message`} />
        </CardText>
        <CardActions style={moduleTheme.action}>
          <RaisedButton
            onClick={operationAction}
            label={<FormattedMessage id={`${operationId}.option`} />}
            primary
            type="submit"
          />
        </CardActions>
      </Card>
    )
  }
}

export default AccountOperationMessage
