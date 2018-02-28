import isObject from 'lodash/isObject'
import has from 'lodash/has'
import set from 'lodash/set'
import forEach from 'lodash/forEach'
import secondaryThemeStub from './secondaryThemeStub'

/**
 * Return the subset that is configurable in the ThemeForm
 * @param {*Object} baseTheme a working theme
 */
module.exports = (baseTheme) => {
  const result = {}
  forEach(baseTheme, (subProperty, key) => {
    if (isObject(subProperty) && has(secondaryThemeStub, key)) {
      forEach(subProperty, (themeValue, themeProperty) => {
        if (has(secondaryThemeStub, `${key}.${themeProperty}`)) {
          set(result, `${key}.${themeProperty}`, themeValue)
        }
      })
    }
  })
  return result
}
