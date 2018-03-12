import isObject from 'lodash/isObject'
import has from 'lodash/has'
import set from 'lodash/set'
import forEach from 'lodash/forEach'
import alternativeThemeStub from './alternativeThemeStub'

/**
 * Return the subset that is configurable in the ThemeForm
 * @param {*Object} baseTheme a working theme
 * @returns the subset configurable on the admin form
 */
module.exports = (baseTheme) => {
  const result = {}
  forEach(baseTheme, (subProperty, key) => {
    if (isObject(subProperty) && has(alternativeThemeStub, key)) {
      forEach(subProperty, (themeValue, themeProperty) => {
        if (has(alternativeThemeStub, `${key}.${themeProperty}`)) {
          set(result, `${key}.${themeProperty}`, themeValue)
        }
      })
    }
  })
  return result
}
