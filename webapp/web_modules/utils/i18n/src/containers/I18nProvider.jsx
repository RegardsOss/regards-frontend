/** @module common */
/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { addLocaleData, IntlProvider } from 'react-intl'
import frLocaleData from 'react-intl/locale-data/fr'
import { UIDomain } from '@regardsoss/domain'
import I18nSelectors from '../model/I18nSelectors'
import i18nContextType from '../contextType'

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
 *
 * Note: for APIs components, it is a good idea, when component needs an enriched messages context, to use the
 * stackCallingContext true property. Indeed, when provided, if there is a calling messages context, it will get merged with new
 * context but IT WILL KEEP HIGER PRIORITY. IE: the calling context can override the component context and thus redefine its
 * messages
 */
export class I18nProvider extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    messages: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
    stackCallingContext: PropTypes.bool,
    // from mapStateToProps
    locale: PropTypes.oneOf(UIDomain.LOCALES).isRequired,
  }

  static defaultProps = {
    stackCallingContext: false,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { messages, stackCallingContext, locale } = this.props
    if (!messages) {
      throw new Error('You must provide messages when using I18N provider ')
    }
    const callingContextMessages = get(this.context, 'intl.messages', null)
    if (stackCallingContext && !callingContextMessages) {
      throw new Error('You must provide calling messages (through context) when using I18N provider with stackCallingContext=true')
    }

    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    const subContextMessages = { // eslint wont fix: context is provided only during runtime, no workaround
      ...(messages[locale] || messages[keys(messages)[0]]),
      ...(stackCallingContext ? callingContextMessages : {}),
    }

    return (
      <IntlProvider
        locale={locale}
        messages={subContextMessages}
      >
        {this.props.children}
      </IntlProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  locale: I18nSelectors.getLocale(state),
})

export default connect(mapStateToProps)(I18nProvider)
