import { storiesOf, action } from "@kadira/storybook";
import { MainAdminLayout } from "@regardsoss/admin/src/MainAdminLayout";
import { StoreDecorator } from "../../utils/decorators";
import Paper from "material-ui/Paper";
import { getThemeByName, themeList, defaultTheme } from "../../utils/decorators";
import { withKnobs, text, select } from "@kadira/storybook-addon-knobs";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { indigo900 } from "material-ui/styles/colors";

storiesOf('Admin template', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const theme = getThemeByName(select("Theme", themeList, defaultTheme))
    return (
      <MuiThemeProvider muiTheme={theme}>
        <MainAdminLayout
          content={
            <Paper
              className="col-sm-100"
              style={{
                height: 450,
                textAlign: 'center',
                display: 'inline-block',
                fontSize: 'small',
                backgroundColor: indigo900
              }}
            >
            </Paper>}
          location=""
          onLogout={action("onLogout")}
        />
      </MuiThemeProvider>
    )
  })
