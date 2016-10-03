import { ProjectAccountsContainer } from "../../../../web_modules/modules/admin-user-management/src/containers/ProjectAccountsContainer";
import { storiesOf, action } from "@kadira/storybook";
import { withKnobs, select, object } from "@kadira/storybook-addon-knobs";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { StoreDecorator, getThemeByName, themeList, defaultTheme } from "../../utils/decorators";

storiesOf('User Admin Management: List ProjectAccounts', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const theme = getThemeByName(select("Theme", themeList, defaultTheme))
    const accounts = object("Accounts", [{
      login: "john",
      firstName: "john",
      lastName: "doe",
      email: "john.doe@yopmail.com",
      status: 1
    }])
    return (
      <MuiThemeProvider muiTheme={theme}>
        <ProjectAccountsContainer
          params={{projectName: "cdpp"}}
          accounts={accounts}
          fetchProjectAccounts={action("fetchProjectAccounts")}
          deleteProjectAccount={action("deleteProjectAccount")}
        />
      </MuiThemeProvider>
    )
  })
