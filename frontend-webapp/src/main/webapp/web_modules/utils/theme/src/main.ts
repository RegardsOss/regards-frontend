import { ThemeContextType } from "./ThemeContainerInterface"
import ThemeInjector from "./ThemeInjector"
import ThemeHelper from "./ThemeHelper"
import SelectThemeContainer from "./containers/SelectTheme"
import injectTheme from "./ThemeInjectionDecorator"
import themeReducers from "./reducers/ThemeReducers"

/**
 *  Provides component interfaces to retrieve mui style
 */
export interface ThemeContextInterface {
    muiTheme: any
}

/**
 * A React component which can receive or not
 * a muiTheme prop implement this interface
 */
export interface MuiThemeInjectable {
    muiTheme?: any
}

export {
  ThemeContextType, ThemeInjector, SelectThemeContainer, ThemeHelper, injectTheme, themeReducers
}
