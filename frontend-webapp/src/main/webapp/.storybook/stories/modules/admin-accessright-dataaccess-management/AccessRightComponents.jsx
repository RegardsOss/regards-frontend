import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import AccessRightListComponent from '@regardsoss/admin-accessright-dataaccess-management/src/components/AccessRightListComponent'
import AccessGroupDump from '@regardsoss/admin-accessright-dataaccess-management/tests/model/dump/AccessGroupDump'
import PluginMetaDataDump from '@regardsoss/admin-accessright-dataaccess-management/tests/model/dump/PluginMetaDataDump'
import PluginConfigurationDump from '@regardsoss/admin-accessright-dataaccess-management/tests/model/dump/PluginConfigurationDump'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale } from '../../decorators/index'

storiesOf('Project admin - Access Right', module)
  .addDecorator(withLocale('modules/admin-account-management/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .addDecorator(withStore)
  .add('List', () => {
    const pluginMetaDataList = object('Plugin Metadata list', PluginMetaDataDump)
    const pluginConfigurationList = object('Plugin Configuration list', PluginConfigurationDump)
    return (
      <AccessRightListComponent
        accessGroupList={AccessGroupDump.AG1}
        pluginMetaDataList={pluginMetaDataList}
        pluginConfigurationList={pluginConfigurationList}
        onSubmit={action('onSubmit')}
        onDelete={action('onDelete')}
      />
    )
  })
