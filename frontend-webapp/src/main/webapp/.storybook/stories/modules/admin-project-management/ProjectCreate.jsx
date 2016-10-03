import { storiesOf, action } from "@kadira/storybook";
import { ProjectCreateContainer } from "@regardsoss/admin-project-management/src/containers/ProjectCreateContainer";
import { withKnobs, select } from "@kadira/storybook-addon-knobs";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { StoreDecorator, getThemeByName, themeList, defaultTheme } from "../../utils/decorators";

storiesOf('Project Admin Management: Create Project', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const theme = getThemeByName(select("Theme", themeList, defaultTheme))
    return (
      <MuiThemeProvider muiTheme={theme}>
        <ProjectCreateContainer
          project=""
          theme=""
          createProject={action("createProject")}
        />
      </MuiThemeProvider>
    )
  })

