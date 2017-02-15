/**
 * LICENSE_PLACEHOLDER
 **/
import ThemeSelectors from './ThemeSelectors'

export default state => ThemeSelectors.getById(state, state.common.theme.current)
