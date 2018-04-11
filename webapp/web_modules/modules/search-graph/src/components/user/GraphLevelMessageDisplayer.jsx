/**
* LICENSE_PLACEHOLDER
**/
import { themeContextType } from '@regardsoss/theme'
import { FormattedMessage } from 'react-intl'

/**
* Level message displayer
*/
class GraphLevelFetchErrorDisplayer extends React.Component {
  static propTypes = {
    // internationalized message key
    messageKey: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { messageKey } = this.props
    const { moduleTheme: { user } } = this.context
    return (
      <div style={user.levelMessage.styles}><FormattedMessage id={messageKey} /></div>
    )
  }
}
export default GraphLevelFetchErrorDisplayer
