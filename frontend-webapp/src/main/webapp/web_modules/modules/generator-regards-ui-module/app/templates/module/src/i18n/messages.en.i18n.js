/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'
import { Locales as MetadataLocales } from '@regardsoss/user-metadata-common'

/**
 * i18n messages english language
 * @author <%= author %>
 */
const messages = {
  exampleMessage: 'Message example',
  ...Locales.en,
  ...MetadataLocales.en,
}

export default messages
