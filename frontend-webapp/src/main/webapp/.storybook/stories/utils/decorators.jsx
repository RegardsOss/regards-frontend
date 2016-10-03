import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider } from "react-redux";
import { configureStore } from "@regardsoss/store";
import rootReducer from "../../../src/rootReducer";
import { ThemeHelper } from "@regardsoss/theme";
const store = configureStore(rootReducer)

export const lightTheme = ThemeHelper.getByName("Light")
export const darkTheme = ThemeHelper.getByName("Dark")

export const themeList = ['Light', 'Dark'];

export const getThemeByName = function (themeName) {
  switch (themeName) {
    case 'Light':
      return lightTheme;
    case 'Dark':
      return darkTheme;
  }
}

export const defaultTheme = 'Light'


export const StoreDecorator = (story) => (
  <Provider store={store}>
    {story()}
  </Provider>
);
