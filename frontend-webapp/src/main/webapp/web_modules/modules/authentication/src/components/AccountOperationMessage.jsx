/**
 * LICENSE_PLACEHOLDER
 */
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { values } from 'lodash'


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
    operationId: React.PropTypes.oneOf(values(operationIds)).isRequired,
    operationAction: React.PropTypes.func.isRequired,
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
            onTouchTap={operationAction}
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
