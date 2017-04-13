/**
* LICENSE_PLACEHOLDER
**/
import intlStub from './IntlStub'
import themeStub from './MuiThemeStub'

/**
 * Builds context stub
 * @param styles module styles function (not mandatory)
 * @param otherFields other field in context (not mandatory)
 * @return appliable context
 */
export default function buildTestContext(moduleStyles = () => { }, otherFields = {}) {
  return {
    intl: intlStub,
    muiTheme: themeStub,
    moduleTheme: moduleStyles(themeStub),
    ...otherFields,
  }
}
