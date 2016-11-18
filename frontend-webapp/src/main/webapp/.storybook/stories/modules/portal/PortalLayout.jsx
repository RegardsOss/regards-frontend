import { storiesOf, action } from '@kadira/storybook'
import PortalLayout from '@regardsoss/portal/src/containers/HomepageContainer'
import Paper from 'material-ui/Paper'
import { withKnobs, select } from '@kadira/storybook-addon-knobs'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { indigo900 } from 'material-ui/styles/colors'
import { getThemeByName, themeList, defaultTheme, StoreDecorator } from '../../utils/decorators'

storiesOf('Portal template', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const theme = getThemeByName(select('Theme', themeList, defaultTheme))
    return (
      <MuiThemeProvider muiTheme={theme}>
        <PortalLayout
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
