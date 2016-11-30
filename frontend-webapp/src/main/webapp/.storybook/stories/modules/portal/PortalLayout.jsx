import { storiesOf, action } from '@kadira/storybook'
import PortalLayout from '@regardsoss/portal/src/containers/PortalLayout'
import Paper from 'material-ui/Paper'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { indigo900 } from 'material-ui/styles/colors'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

storiesOf('Portal template', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-project-management/src/i18n">
        <PortalLayout
          location=""
          onLogout={action('onLogout')}
        >
          <Paper
            className="col-sm-100"
            style={{
              height: 450,
              textAlign: 'center',
              display: 'inline-block',
              fontSize: 'small',
              backgroundColor: indigo900,
            }}
          />
        </PortalLayout>
      </ThemeAndLocaleDecorator>
    )
  })
