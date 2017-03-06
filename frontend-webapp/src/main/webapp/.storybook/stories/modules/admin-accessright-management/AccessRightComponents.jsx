import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import AccessRightComponent from '@regardsoss/admin-accessright-management/src/components/AccessRightComponent'
import AccessGroupDump from '@regardsoss/admin-accessright-management/tests/model/dump/AccessGroupDump'
import PluginMetaDataDump from '@regardsoss/admin-accessright-management/tests/model/dump/PluginMetaDataDump'
import PluginConfigurationDump from '@regardsoss/admin-accessright-management/tests/model/dump/PluginConfigurationDump'
import { withStore, withLocale } from '../../decorators/index'
import { muiTheme } from 'storybook-addon-material-ui'

storiesOf('Project admin - Access Right', module)
  .addDecorator(withLocale('modules/admin-account-management/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .addDecorator(withStore)
  .add('List', () => {
    const accessGroupList = object('Access group list', AccessGroupDump)
    const pluginMetaDataList = object('Plugin Metadata list', PluginMetaDataDump)
    const pluginConfigurationList = object('Plugin Configuration list', PluginConfigurationDump)
    return (
      <AccessRightComponent
        accessGroupList={accessGroupList}
        pluginMetaDataList={pluginMetaDataList}
        pluginConfigurationList={pluginConfigurationList}
        onSubmit={action('onSubmit')}
        onDelete={action('onDelete')}
      />
    )
  })
