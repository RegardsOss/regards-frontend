/**
 * LICENSE_PLACEHOLDER
 */
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { values } from 'lodash'

const unlockRequestSent = 'unlock.request.sent'
const unlockRequestDone = 'unlock.request.done'
const unlockRequestTokenExpired = 'unlock.request.token.expired'
const resetPasswordSent = 'reset.password.sent'
const resetPasswordDone = 'reset.password.done'
const resetPaswordTokenExpired = 'reset.password.token.expired'
const createAccountSent = 'create.account.sent'

/**
 * Possible Ids for this message displayer, corresponds to the message / stage to show
 */
export const operationIds = {
  unlockRequestSent,
  unlockRequestDone,
  unlockRequestTokenExpired,
  resetPasswordSent,
  resetPasswordDone,
  resetPaswordTokenExpired,
  createAccountSent,
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
