import { SelectTheme } from '@regardsoss/theme/src/containers/SelectTheme'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, select } from '@kadira/storybook-addon-knobs'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { getThemeByName, themeList, defaultTheme } from '../../utils/decorators'

storiesOf('Theme', module)
  .addDecorator(withKnobs)
  .add('Select another theme', () => {
    const theme = getThemeByName(select('Theme', themeList, defaultTheme))
    return (
      <MuiThemeProvider muiTheme={theme}>
        <SelectTheme
          setTheme={action('clicked')}
          theme="darkBaseTheme"
        />
      </MuiThemeProvider>
    )
  })
