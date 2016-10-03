import { ProjectAccountCreateContainer } from "../../../../web_modules/modules/admin-user-management/src/containers/ProjectAccountCreateContainer";
import { storiesOf } from "@kadira/storybook";
import { withKnobs, select } from "@kadira/storybook-addon-knobs";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { StoreDecorator, getThemeByName, themeList, defaultTheme } from "../../utils/decorators";

storiesOf('User Admin Management: Create ProjectAccount', module)
  .addDecorator(withKnobs)
  .add('', () => {
    const theme = getThemeByName(select("Theme", themeList, defaultTheme))
    return (
      <MuiThemeProvider muiTheme={theme}>
        <ProjectAccountCreateContainer
        />
      </MuiThemeProvider>
    )
  })
