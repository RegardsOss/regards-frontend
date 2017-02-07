/**
 * LICENSE_PLACEHOLDER
 */
import { FormattedMessage } from 'react-intl'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import { themeContextType } from '@regardsoss/theme'

/**
 * Shows loading while finishing unlock account (when back from mail)
 */
class FinishUnlockAccountComponent extends React.Component {

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { moduleTheme } = this.context
    //
    return (
      <Card>
        <CardMedia
          overlay={
            <CardTitle
              title={<FormattedMessage id="finish.unlock.account.title" />}
              subtitle={<FormattedMessage id="finish.unlock.account.message" />}
            />}
        >
          <div style={moduleTheme.finishAccountUnlock.loadingContainer.style}>
            <CircularProgress size={moduleTheme.finishAccountUnlock.loadingContainer.loadingComponent.size} />
          </div>
        </CardMedia>
      </Card>
    )
  }
}

export default FinishUnlockAccountComponent
