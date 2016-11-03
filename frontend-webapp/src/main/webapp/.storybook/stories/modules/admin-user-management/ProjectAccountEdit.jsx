import { storiesOf } from '@kadira/storybook'
import { withKnobs, select } from '@kadira/storybook-addon-knobs'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { ProjectAccountEditContainer } from '@regardsoss/admin-user-management/src/containers/ProjectAccountEditContainer'
import { getThemeByName, themeList, defaultTheme } from '../../utils/decorators'

storiesOf('User Admin Management: Edit ProjectAccount', module)
  .addDecorator(withKnobs)
  .add('', () => {
    const theme = getThemeByName(select('Theme', themeList, defaultTheme))
    return (
      <MuiThemeProvider muiTheme={theme}>
        <ProjectAccountEditContainer />
      </MuiThemeProvider>
    )
  })
