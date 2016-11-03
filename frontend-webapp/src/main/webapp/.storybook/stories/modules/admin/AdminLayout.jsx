import { storiesOf, action } from '@kadira/storybook'
import { MainAdminLayout } from '@regardsoss/admin/src/MainAdminLayout'
import Paper from 'material-ui/Paper'
import { withKnobs, select } from '@kadira/storybook-addon-knobs'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { indigo900 } from 'material-ui/styles/colors'
import { StoreDecorator, getThemeByName, themeList, defaultTheme } from '../../utils/decorators'

storiesOf('Admin template', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const theme = getThemeByName(select('Theme', themeList, defaultTheme))
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
                backgroundColor: indigo900,
              }}
            />}
          location=""
          onLogout={action('onLogout')}
        />
      </MuiThemeProvider>
    )
  })
