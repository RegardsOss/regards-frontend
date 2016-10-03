import { CardActionsComponent } from "@regardsoss/components";
import { storiesOf } from "@kadira/storybook";
import { getThemeByName, themeList, defaultTheme } from "../../utils/decorators";
import { withKnobs, text, select } from "@kadira/storybook-addon-knobs";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

storiesOf('Generic components - Card Actions', module)
  .addDecorator(withKnobs)
  .add('main button', () => {
    const mainButtonText = text("Main button text", "Main button")
    const theme = getThemeByName(select("Theme", themeList, defaultTheme))
    return (
      <MuiThemeProvider muiTheme={theme}>
        <CardActionsComponent
          mainButtonLabel={mainButtonText}
          mainButtonUrl="#"
        />
      </MuiThemeProvider>
    )
  })
  .add('main button & secondary button', () => {
    const mainButtonText = text("Main button text", "Main button")
    const secondaryButtonText = text("Secondary button text", "Secondary button")
    const theme = getThemeByName(select("Theme", themeList, defaultTheme))
    return (
      <MuiThemeProvider muiTheme={theme}>
        <CardActionsComponent
          mainButtonLabel={mainButtonText}
          mainButtonUrl="#"
          secondaryButtonLabel={secondaryButtonText}
          secondaryButtonUrl="#"
        />
      </MuiThemeProvider>
    )
  })
