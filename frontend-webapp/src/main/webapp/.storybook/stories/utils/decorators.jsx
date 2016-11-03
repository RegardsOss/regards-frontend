import { Provider } from 'react-redux'
import { ThemeHelper } from '@regardsoss/theme'
import { configureStore } from '@regardsoss/store'
import rootReducer from '../../../src/rootReducer'

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
