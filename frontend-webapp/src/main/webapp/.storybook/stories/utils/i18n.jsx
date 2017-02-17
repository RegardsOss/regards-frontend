/**
 * LICENSE_PLACEHOLDER
 **/
import { IntlProvider } from 'react-intl'
import { I18nProvider } from '@regardsoss/i18n'

const i18n = messageDir => (
  story => (
    <IntlProvider messages={messageDir}>
      {story()}
    </IntlProvider>
  )
)
export default i18n