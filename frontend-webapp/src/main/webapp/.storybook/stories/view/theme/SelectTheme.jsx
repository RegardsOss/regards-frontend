import { SelectTheme } from '@regardsoss/theme/src/containers/SelectTheme'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, select } from '@kadira/storybook-addon-knobs'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { StoreDecorator, getThemeByName, themeList, defaultTheme } from '../../utils/decorators'
import { I18nProvider } from '@regardsoss/i18n'

storiesOf('Theme', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('Select another theme', () => {
    const theme = getThemeByName(select('Theme', themeList, defaultTheme))
    return (
      <MuiThemeProvider muiTheme={theme}>
        <I18nProvider messageDir="modules/admin/src/authentication/i18n">
          <SelectTheme
            setTheme={action('clicked')}
            theme="darkBaseTheme"
          />
        </I18nProvider>
      </MuiThemeProvider>
    )
  })
