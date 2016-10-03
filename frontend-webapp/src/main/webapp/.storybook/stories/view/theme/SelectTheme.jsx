import { SelectTheme } from "@regardsoss/theme/src/containers/SelectTheme";
import { storiesOf, action } from "@kadira/storybook";
import { getThemeByName, themeList, defaultTheme } from "../../utils/decorators";
import { withKnobs, text, select } from "@kadira/storybook-addon-knobs";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

storiesOf('Theme', module)
  .addDecorator(withKnobs)
  .add('Select another theme', () => {
    const theme = getThemeByName(select("Theme", themeList, defaultTheme))
    return (
      <MuiThemeProvider muiTheme={theme}>
        <SelectTheme
          setTheme={action("clicked")}
          theme="darkBaseTheme"
        />
      </MuiThemeProvider>
    )
  })
