/** @module common */

import { connect } from 'react-redux'
import { addLocaleData, IntlProvider } from 'react-intl'
import * as fr from 'react-intl/locale-data/fr'
import { updateMessages } from './I18nActions'

addLocaleData(fr)


/**
 * React provider to enable messages internationalisation.
 * Under this provider, use the react-intl <FormatedMessage id='...' /> to display message
 * in the current language. The curent language is stored in the redux store common.i18n.locale.
 * By default the locale is the navigator langugage.
 * Under this provider, we can also use the below syntaxe du get the localise messages :
 *  this.context.intl.formatMessage({id:"..."})
 * To do so, the react component must be configured with :
 * context
 * static contextTypes = {
 *     intl: intlShape
 * }
 */
export class I18nProvider extends React.Component {

  componentWillMount() {
    // Get messages associated to this Prodiver via the messageDir
    const localMessages = this.props.messages.find(message => message.messagesDir === this.props.messageDir)

    // init messages if not set
    if (!localMessages) {
      this.props.updateMessages(this.props.messageDir, this.props.locale)
    }
  }

  render() {
    // Get messages associated to this Prodiver via the messageDir
    const localMessages = this.props.messages.find(message => message.messagesDir === this.props.messageDir)
    if (localMessages) {
      return (
        <IntlProvider
          locale={this.props.locale}
          messages={localMessages.messages}
        >
          {this.props.children}
        </IntlProvider>
      )
    }
    return null
  }
}
I18nProvider.propTypes = {
  messageDir: React.PropTypes.string.isRequired,
  locale: React.PropTypes.string,
  updateMessages: React.PropTypes.func,
  messages: React.PropTypes.arrayOf(React.PropTypes.string),
  children: React.PropTypes.element,
}

const mapStateToProps = state => ({
  locale: state.common.i18n.locale,
  messages: state.common.i18n.messages,
})

const mapDispatchToProps = dispatch => ({
  updateMessages: (messageDir, locale) => dispatch(updateMessages(messageDir, locale)),
})

export default connect(mapStateToProps, mapDispatchToProps)(I18nProvider)
