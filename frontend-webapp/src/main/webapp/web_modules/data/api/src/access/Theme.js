/**
 * LICENSE_PLACEHOLDER
 **/
import { Schema, arrayOf } from 'normalizr'

const ThemeConfiguration = {
  entityKey: 'id',
  normalizrKey: 'theme',
}

// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const themeSchema = new Schema(ThemeConfiguration.normalizrKey, {
  idAttribute: theme => theme.content[ThemeConfiguration.entityKey],
  assignEntity(output, key, value, input) {
    if (value && value.configuration) {
      try {
        // eslint-disable-next-line no-param-reassign
        output.content.configuration = JSON.parse(value.configuration)
      } catch (e) {
        console.error(`Invalid Module configuration for module ${value.id}`)
        console.error(`Conf: ${value.configuration}`)
      }
    }
  },
})

// Schemas for API responses.
export default {
  THEME: themeSchema,
  THEME_ARRAY: arrayOf(themeSchema),
  ThemeConfiguration,
}
