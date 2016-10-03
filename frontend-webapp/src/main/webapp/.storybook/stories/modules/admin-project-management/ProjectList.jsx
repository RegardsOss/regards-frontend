import { storiesOf, action } from "@kadira/storybook";
import { ProjectsContainer } from "../../../../web_modules/modules/admin-project-management/src/containers/ProjectsContainer";
import { withKnobs, select, object } from "@kadira/storybook-addon-knobs";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { StoreDecorator, getThemeByName, themeList, defaultTheme } from "../../utils/decorators";

storiesOf('Project Admin Management: List Project', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const theme = getThemeByName(select("Theme", themeList, defaultTheme))
    const knownProjects = object("Known projects", {
      "cdpp": {
        name: "john",
        projectId: "cdpp",
        description: "doe",
        isPublic: false,
        links: [],
        icon: "http://lorempicsum.com/futurama/200/200/1"
      }
    })
    return (
      <MuiThemeProvider muiTheme={theme}>
        <ProjectsContainer
          project={knownProjects}
          theme=""
          createProject={action("createProject")}
          fetchProjects={action("fetchProjects")}
          deleteProject={action("deleteProject")}
        />
      </MuiThemeProvider>
    )
  })
