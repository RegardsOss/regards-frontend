declare module "@regardsoss/theme" {

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

  export const ThemeInjector: any
  export const ThemeHelper: any
  export const SelectThemeContainer: any
  export const ThemeContextInterface: any
  export const ThemeContextType: any
  export const injectTheme: any
  export const themeReducers: any
}

