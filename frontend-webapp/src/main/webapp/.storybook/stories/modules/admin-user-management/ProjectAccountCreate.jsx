import { storiesOf } from '@kadira/storybook'
import { withKnobs, select } from '@kadira/storybook-addon-knobs'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { ProjectAccountCreateContainer } from '@regardsoss/admin-user-management/src/containers/ProjectAccountCreateContainer'
import { getThemeByName, themeList, defaultTheme } from '../../utils/decorators'

storiesOf('User Admin Management: Create ProjectAccount', module)
  .addDecorator(withKnobs)
  .add('', () => {
    const theme = getThemeByName(select('Theme', themeList, defaultTheme))
    return (
      <MuiThemeProvider muiTheme={theme}>
        <ProjectAccountCreateContainer />
      </MuiThemeProvider>
    )
  })
