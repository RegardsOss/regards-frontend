/**
 * LICENSE_PLACEHOLDER
 **/
import { defaultTheme } from '@regardsoss/model'
import ThemeSelectors from './ThemeSelectors'

export default state => ThemeSelectors.getById(state, state.common.theme.current) || defaultTheme
