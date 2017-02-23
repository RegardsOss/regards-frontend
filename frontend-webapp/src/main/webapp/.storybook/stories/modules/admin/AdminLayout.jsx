import { storiesOf, action } from '@kadira/storybook'
import { AdminLayout } from '@regardsoss/admin/src/containers/AdminLayout'
import Paper from 'material-ui/Paper'
import { withKnobs, select } from '@kadira/storybook-addon-knobs'
import { indigo900 } from 'material-ui/styles/colors'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale } from '../../decorators/index'

storiesOf('Admin layout', module)
  .addDecorator(withLocale('modules/admin/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(muiTheme())
  .add('', () => {
    const isInstance = select('Type of menu', ['Instance', 'Project'], 'Project')
    const params = isInstance === 'Instance' ? {} : { project: 'cdpp' }
    return (
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
    )
  })
