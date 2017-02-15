/**
 * LICENSE_PLACEHOLDER
 **/
import { IntlProvider } from 'react-intl'
import messages from '../../src/i18n/messages.en.i18n'

const reactInlt = story => (
  <IntlProvider locale="en" messages={messages}>
    {story()}
  </IntlProvider>
)

export default reactInlt
