import { storiesOf, action } from "@kadira/storybook";
import LoginComponent from "@regardsoss/admin/src/authentication/components/LoginComponent";
import { StoreDecorator, getThemeByName, themeList, defaultTheme } from "../../utils/decorators";
import { withKnobs, text, select } from "@kadira/storybook-addon-knobs";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { I18nProvider } from "@regardsoss/i18n";

storiesOf('Authentication', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const theme = getThemeByName(select("Theme", themeList, defaultTheme))
    const errorMessage = text("Message error", "")
    return (
      <MuiThemeProvider muiTheme={theme}>
        <I18nProvider messageDir="modules/admin/src/authentication/i18n">
          <LoginComponent
            errorMessage={errorMessage}
            onLogin={action("onLogin")}
          />
        </I18nProvider>
      </MuiThemeProvider>
    )
  })
