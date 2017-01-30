/**
 * LICENSE_PLACEHOLDER
 */
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Possible Ids for this message displayer, corresponds to the message / stage to show
 */
export const operationIds = [
  'unlock.request.sent',
  'unlock.request.done',
  'unlock.request.token.expired',
  'reset.password.sent',
  'reset.password.done',
  'reset.password.token.expired',
]

/**
 * Shows the user the 'operation complete' view, for account operations
 */
class AccountOperationMessage extends React.Component {

  static propTypes = {
    operationId: React.PropTypes.oneOf(operationIds).isRequired,
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
