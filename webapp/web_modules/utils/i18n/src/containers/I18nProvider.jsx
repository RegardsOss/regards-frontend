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
import get from 'lodash/get'
import keys from 'lodash/keys'
import { connect } from 'react-redux'
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl'
import { UIDomain } from '@regardsoss/domain'
import isEqual from 'lodash/isEqual'
import I18nSelectors from '../model/I18nSelectors'

/**
 * React provider to enable messages internationalisation.
 * Under this provider, use the react-intl context this.context.intl.formatMessage('...') to display message
 * in the current language. The curent language is stored in the redux store common.i18n.locale.
 * By default the locale is the navigator language.
 * To do so, the react component must be configured with :
 * context
 * static contextTypes = {
 *     intl: intlShape
 * }
 *
 * Note: for APIs components, it is a good idea, when component needs an enriched messages context, to use the
 * stackCallingContext true property. Indeed, when provided, if there is a calling messages context, it will get merged with new
 * context but IT WILL KEEP HIGER PRIORITY. IE: the calling context can override the component context and thus redefine its
 * messages
 *
 * This component also creates a context property named messagesByLocale to compute the list of messages for a specific
 * language. This context variable is only use by I18nProviders
 */
export class I18nProvider extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    children: PropTypes.element,
    // eslint-disable-next-line react/no-unused-prop-types
    messages: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    stackCallingContext: PropTypes.bool,
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    locale: PropTypes.oneOf(UIDomain.LOCALES).isRequired,
  }

  static defaultProps = {
    stackCallingContext: false,
  }

  /**
   *
   * @type {{moduleTheme: *}}
   */
  static contextTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    intl: PropTypes.any,
    // eslint-disable-next-line react/forbid-prop-types
    messagesByLocale: PropTypes.any,
  }

  /**
   *
   * @type {{moduleTheme: *}}
   */
  static childContextTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    intl: PropTypes.any,
    // eslint-disable-next-line react/forbid-prop-types
    messagesByLocale: PropTypes.any,
  }

  state = {
    // The react-intl object
    intl: null,
    // An object used to save messages by locale. Required by the stackCallingContext functionnality
    messagesByLocale: null,
  }

  /**
   * Return child contexts
   * @returns {{intl: *}}
   */
  getChildContext() {
    const { intl, messagesByLocale } = this.state
    return {
      intl,
      messagesByLocale,
    }
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount() {
    this.onPropertiesUpdated({}, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  /**
   * Properties change detected: update current options on context change and selected option on list change
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      messages, locale, stackCallingContext,
    } = newProps

    if (!isEqual(oldProps.messages, messages) || !isEqual(oldProps.locale, locale) || !isEqual(oldProps.stackCallingContext, stackCallingContext)) {
      if (!messages) {
        throw new Error('You must provide messages when using I18N provider ')
      }

      // Build all languages messages to save them on the context
      const messagesByLocale = {
        fr: this.buildMessagesByLocale(messages, 'fr', stackCallingContext),
        en: this.buildMessagesByLocale(messages, 'en', stackCallingContext),
      }

      const cache = createIntlCache()
      // Create the intl context for current locale.
      // Use messagesByLocale dictionnary to retrieve messages using current locale
      const intl = createIntl(
        {
          locale,
          messages: messagesByLocale[locale],
        },
        cache,
      )

      this.setState({
        intl,
        messagesByLocale,
      })
    }
  }

  /**
   * Build the list of i18n messages for a specific locale
   */
  buildMessagesByLocale = (messages, locale, stackCallingContext) => {
    const callingContextMessages = get(this.context, `messagesByLocale.${locale}`, null)
    if (stackCallingContext && !callingContextMessages) {
      throw new Error('You must provide calling messages (through context) when using I18N provider with stackCallingContext=true')
    }
    return {
      ...(messages[locale] || messages[keys(messages)[0]]),
      ...(stackCallingContext ? callingContextMessages : {}),
    }
  }

  render() {
    const { intl } = this.state
    return (
      <RawIntlProvider value={intl}>{this.props.children}</RawIntlProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  locale: I18nSelectors.getLocale(state),
})

export default connect(mapStateToProps)(I18nProvider)
