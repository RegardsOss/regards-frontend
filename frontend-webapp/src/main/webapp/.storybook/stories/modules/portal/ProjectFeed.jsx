import { storiesOf, action } from "@kadira/storybook";
import ProjectFeedContainer from "@regardsoss/portal/src/projects/containers/ProjectFeedContainer";
import { StoreDecorator } from "../../utils/decorators";
import { getThemeByName, themeList, defaultTheme } from "../../utils/decorators";
import { withKnobs, text, select, object } from "@kadira/storybook-addon-knobs";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";


storiesOf('Portal projects', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const theme = getThemeByName(select("Theme", themeList, defaultTheme))
    const projects = object("Project list", [{
      name: "CDPP",
      projectId: "azertyuio",
      description: "Viking was the first Swedish satellite. It was successfully launched from Kourou (French Guiana) by Ariane 1 on February 22, 1986. The satellite was placed into a final 817 km x 13,527 km polar orbit with an inclination of 98.8° and a period of 262 mn. This orbit thus allowed the spacecraft to spend 208 mn in the region between 4000 and 14000 km above the Earth's surface on the geomagnetic field lines leading down to the northern auroral zone. The satellite spinned at a rate of about 3 rpm with its spin axis perpendicular to the orbital plane (cartwheel mode).   The nominal life time of the satellite was 8 months ; it sent data for about 15 months, until May 1987. There is one data taking period per orbit ; its duration is up to 160 minutes.",
      isPublic: true,
      isAccessible: false,
      icon: "http://lorempicsum.com/futurama/350/350/1"
    }, {
      name: "CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP",
      projectId: "azertyuio",
      description: "There is one data taking period per orbit ; its duration is up to 160 minutes.",
      isPublic: true,
      isAccessible: false,
      icon: "http://lorempicsum.com/simpsons/350/350/5"
    }])
    return (
      <MuiThemeProvider muiTheme={theme}>
        <ProjectFeedContainer
          projects={projects}
        />
      </MuiThemeProvider>
    )
  })
