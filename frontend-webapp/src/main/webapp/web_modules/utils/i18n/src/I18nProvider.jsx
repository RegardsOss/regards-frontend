/** @module common */
/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from 'react-redux'
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
    children: PropTypes.element,
    messageDir: PropTypes.string.isRequired,
    // from mapStateToProps
    messages: PropTypes.objectOf(PropTypes.string),
    locale: PropTypes.string,
    // from mapDispatchToProps
    updateMessages: PropTypes.func,
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
