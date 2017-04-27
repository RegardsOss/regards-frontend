/**
 * LICENSE_PLACEHOLDER
 **/
import { themeSelectors } from '../../client/ThemeClient'
import defaultTheme from '../defaultTheme'

export default (state) => {
  if (state.common && state.common.theme && state.common.theme.current &&
    Number.isInteger(state.common.theme.current)) {
    return themeSelectors.getById(state, state.common.theme.current) || defaultTheme
  }
  return defaultTheme
}
