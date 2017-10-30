/**
* LICENSE_PLACEHOLDER
**/
import isFunction from 'lodash/isFunction'
import intlStub from './IntlStub'
import themeStub from './MuiThemeStub'

/**
 * Builds test module styles
 * @param {function|{styles: {function}}} moduleStyles modules styles provided (may be a function of an object like {styles: function})
 * @return {*} test module styles
 */
function buildStyles(moduleStyles) {
  const stylesBuilder = isFunction(moduleStyles) ? moduleStyles : moduleStyles.styles
  return stylesBuilder(themeStub)
}

/**
 * Builds context stub
 * @param {function|{styles: {function}}} styles module styles function or object with styles function (not mandatory)
 * @param {*} otherFields other field in context (not mandatory)
 * @return {*} appliable context
 */
export default function buildTestContext(moduleStyles = () => { }, otherFields = {}) {
  return {
    intl: intlStub,
    muiTheme: themeStub,
    moduleTheme: buildStyles(moduleStyles),
    ...otherFields,
  }
}
