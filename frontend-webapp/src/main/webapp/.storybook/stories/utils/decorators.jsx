import { Provider } from 'react-redux'
import { ThemeHelper } from '@regardsoss/theme'
import { configureStore } from '@regardsoss/store'
import rootReducer from '../../../src/rootReducer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { I18nProvider } from '@regardsoss/i18n'
import * as I18nActions from '@regardsoss/i18n/src/model/I18nActions'
import { withKnobs, select, object } from '@kadira/storybook-addon-knobs'

const store = configureStore(rootReducer)
export const lightTheme = ThemeHelper.getByName('Light')
export const darkTheme = ThemeHelper.getByName('Dark')


export const themeList = ['Light', 'Dark']

export const getThemeByName = function (themeName) {
  switch (themeName) {
    case 'Light':
      return lightTheme
    case 'Dark':
      return darkTheme
    default:
      throw new Error('Unknown theme name', themeName)
  }
}

export const defaultTheme = 'Light'


export const StoreDecorator = story => (
  <Provider store={store}>
    {story()}
  </Provider>
)


export const ThemeDecorator = ({ theme, children }) => (
  <MuiThemeProvider muiTheme={theme}>
    {children}
  </MuiThemeProvider>
)

export const localeList = ['', 'Français', 'English']

export const LocaleDecorator = ({ messageDir, children }) => (
  <I18nProvider messageDir={messageDir}>
    {children}
  </I18nProvider>
)

export function setLocale(locale) {
  switch (locale) {
    case 'Français':
      store.dispatch(I18nActions.updateLocale('fr'))
      break
    case 'English':
      store.dispatch(I18nActions.updateLocale('en'))
      break
  }
}


export function addLocaleAndThemeSelectors() {
  const theme = getThemeByName(select('Theme', themeList, defaultTheme))
  const locale = select('Locale', localeList, '')
  setLocale(locale)
  return theme
}
export const ThemeAndLocaleDecorator = ({ theme, messageDir, children }) => (
  <ThemeDecorator theme={theme}>
    <LocaleDecorator messageDir={messageDir}>
      {children}
    </LocaleDecorator>
  </ThemeDecorator>
)
