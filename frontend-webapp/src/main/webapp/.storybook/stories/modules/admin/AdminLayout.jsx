import { storiesOf, action } from '@kadira/storybook'
import { AdminLayout } from '@regardsoss/admin/src/containers/AdminLayout'
import Paper from 'material-ui/Paper'
import { withKnobs, select } from '@kadira/storybook-addon-knobs'
import { indigo900 } from 'material-ui/styles/colors'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

storiesOf('Admin template', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const themeName = addLocaleAndThemeSelectors()
    const isInstance = select('Type of menu', ['Instance', 'Project'], 'Project')
    const params = isInstance === 'Instance' ? {} : { project: 'cdpp' }
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir={'modules/admin/src/i18n'} >
        <AdminLayout
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
          params={params}
          onLogout={action('onLogout')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
