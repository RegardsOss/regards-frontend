import { storiesOf } from "@kadira/storybook";
import { ProjectReadContainer } from "@regardsoss/admin-project-management/src/containers/ProjectReadContainer";
import { withKnobs, select, text, object } from "@kadira/storybook-addon-knobs";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { StoreDecorator, getThemeByName, themeList, defaultTheme } from "../../utils/decorators";

storiesOf('Project Admin Management: Read Project', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const theme = getThemeByName(select("Theme", themeList, defaultTheme))
    const project_id = text("Show project with id", "cdpp")
    const knownProjects = object("Known projects", {
      "cdpp": {
        name: "john",
        projectId: "cdpp",
        description: "doe",
        isPublic: false,
        links: [],
        icon: "http://lorempicsum.com/futurama/350/200/1"
      }
    })
    return (
      <MuiThemeProvider muiTheme={theme}>
        <ProjectReadContainer
          params={{project_id: project_id}}
          projects={knownProjects}
          theme={theme}
        />
      </MuiThemeProvider>
    )
  })
