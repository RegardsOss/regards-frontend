/** @module common */
import * as React from "react"
import { connect } from "react-redux"
import { addLocaleData, IntlProvider } from "react-intl"
import * as fr from "react-intl/locale-data/fr"
import { updateMessages } from "./I18nActions"
import { LocaleMessagesStore } from "./I18nTypes"

addLocaleData(fr)

interface I18nProps {
  messageDir: string,
  // Properties set by react redux connection
  locale?: string,
  updateMessages?: (messagesDir: string, locale: string) => void,
  messages?: Array<LocaleMessagesStore>,
  children?: any
}


/**
 * React provider to enable messages internationalisation.
 * Under this provider, use the react-intl <FormatedMessage id='...' /> to display message
 * in the current language. The curent language is stored in the redux store common.i18n.locale.
 * By default the locale is the navigator langugage.
 * Under this provider, we can also use the below syntaxe du get the localise messages :
 *  this.context.intl.formatMessage({id:"..."})
 * To do so, the react component must be configured with :
 * context: any
 * static contextTypes = {
 *     intl: intlShape
 * }
 */
export class I18nProvider extends React.Component<I18nProps, any> {

  componentWillMount (): any {
    // Get messages associated to this Prodiver via the messageDir
    let localMessages = this.props.messages.find((message) => message.messagesDir === this.props.messageDir)

    // init messages if not set
    if (!localMessages) {
      this.props.updateMessages(this.props.messageDir, this.props.locale)
    }
  }

  render (): JSX.Element {

    // Get messages associated to this Prodiver via the messageDir
    let localMessages = this.props.messages.find((message) => message.messagesDir === this.props.messageDir)
    if (localMessages) {
      return (
        <IntlProvider
          locale={this.props.locale}
          messages={localMessages.messages}>
          {this.props.children}
        </IntlProvider>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    locale: state.common.i18n.locale,
    messages: state.common.i18n.messages
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  updateMessages: (messageDir: string, locale: string) => dispatch(updateMessages(messageDir, locale))
})

export default connect<{}, {}, I18nProps>(mapStateToProps, mapDispatchToProps)(I18nProvider)
