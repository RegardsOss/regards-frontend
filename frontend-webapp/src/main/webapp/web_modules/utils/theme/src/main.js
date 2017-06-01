/**
 * LICENSE_PLACEHOLDER
 **/
import themeContextType from './contextType'
import ThemeInjector from './ThemeInjector'
import SelectThemeContainer from './containers/SelectThemeContainer'
import injectTheme from './ThemeInjectionDecorator'
import reducers from './model/reducers'
import getCurrentTheme from './model/selectors/getCurrentTheme'
import ThemeProvider from './containers/ThemeProvider'
import defaultCustomConfiguration from './custom/defaultCustomConfiguration'
import {
  themeSelectors as ThemeSelectors,
  themeActions as ThemeActions,
} from './clients/ThemeClient'
import {
  themeInstanceActions as ThemeInstanceActions,
} from './clients/ThemeInstanceClient'
import defaultTheme from './model/defaultTheme'

export {
  themeContextType,
  ThemeInjector,
  SelectThemeContainer,
  injectTheme,
  reducers,
  ThemeSelectors,
  getCurrentTheme,
  ThemeProvider,
  ThemeActions,
  ThemeInstanceActions,
  defaultCustomConfiguration,
  defaultTheme,
}
