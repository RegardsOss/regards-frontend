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
})

// Schemas for API responses.
export default {
  THEME: themeSchema,
  THEME_ARRAY: arrayOf(themeSchema),
  ThemeConfiguration,
}
