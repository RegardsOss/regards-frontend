/** @module common */
/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { addLocaleData, IntlProvider } from 'react-intl'
import frLocaleData from 'react-intl/locale-data/fr'
import * as I18nActions from './model/I18nActions'
import I18nSelectors from './model/I18nSelectors'

addLocaleData(frLocaleData)


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

  static propTypes = {
    children: React.PropTypes.element,
    messageDir: React.PropTypes.string.isRequired,
    // from mapStateToProps
    messages: React.PropTypes.objectOf(React.PropTypes.string),
    locale: React.PropTypes.string,
    // from mapDispatchToProps
    updateMessages: React.PropTypes.func,
  }

  componentWillMount() {
    const { updateMessages, messages, locale, messageDir } = this.props

    // init messages if not set
    if (!messages) {
      updateMessages(messageDir, locale)
    }
  }

  render() {
    const { messages, locale } = this.props
    // Get messages associated to this Prodiver via the messageDir
    if (messages) {
      return (
        <IntlProvider
          locale={locale}
          messages={messages}
        >
          {this.props.children}
        </IntlProvider>
      )
    }
    return null
  }
}


const mapStateToProps = (state, ownProps) => ({
  locale: I18nSelectors.getLocale(state),
  messages: I18nSelectors.getMessagesByMessageDir(state, ownProps.messageDir),
})

const mapDispatchToProps = dispatch => ({
  updateMessages: (messageDir, locale) => dispatch(I18nActions.updateMessages(messageDir, locale)),
})

export default connect(mapStateToProps, mapDispatchToProps)(I18nProvider)
