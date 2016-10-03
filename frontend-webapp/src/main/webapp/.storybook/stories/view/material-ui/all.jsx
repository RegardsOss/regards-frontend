import { storiesOf } from "@kadira/storybook";
import { getThemeByName, themeList, defaultTheme } from "../../utils/decorators";
import { withKnobs, select } from "@kadira/storybook-addon-knobs";
import RaisedButton from "./RaisedButton";
import AppBar from "./AppBar";
import Palette from "./Palette";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ColorBoxes from "./colors"
storiesOf('Material UI', module)
  .addDecorator(withKnobs)
  .add('Palette', () => {
    const theme = getThemeByName(select("Theme", themeList, defaultTheme))
    return (
      <MuiThemeProvider muiTheme={theme}>
        <Palette theme={theme}/>
      </MuiThemeProvider>
    )
  })
  .add('RaisedButton', () => {
    const theme = getThemeByName(select("Theme", themeList, defaultTheme))
    return (
      <MuiThemeProvider muiTheme={theme}>
        <RaisedButton theme={theme}/>
      </MuiThemeProvider>
    )
  })
  .add('AppBar', () => {
    const theme = getThemeByName(select("Theme", themeList, defaultTheme))
    return (
      <MuiThemeProvider muiTheme={theme}>
        <AppBar theme={theme}/>
      </MuiThemeProvider>
    )
  })
  .add('Colors', () => {
    const theme = getThemeByName(select("Theme", themeList, defaultTheme))
    return (
      <MuiThemeProvider muiTheme={theme}>
        <ColorBoxes theme={theme}/>
      </MuiThemeProvider>
    )
  })
