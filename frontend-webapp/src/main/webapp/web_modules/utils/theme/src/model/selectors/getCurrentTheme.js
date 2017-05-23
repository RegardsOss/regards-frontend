/**
 * LICENSE_PLACEHOLDER
 **/
import { has } from 'lodash'
import { themeSelectors } from '../../client/ThemeClient'
import defaultTheme from '../defaultTheme'

export default (state) => {
  if (has(state, 'common.theme.current') && Number.isInteger(state.common.theme.current)) {
    return themeSelectors.getById(state, state.common.theme.current) || defaultTheme
  }
  return defaultTheme
}
