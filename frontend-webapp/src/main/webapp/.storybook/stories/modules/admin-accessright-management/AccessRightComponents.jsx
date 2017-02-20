import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import AccessRightComponent from '@regardsoss/admin-accessright-management/src/components/AccessRightComponent'
import AccessGroupDump from '@regardsoss/admin-accessright-management/tests/model/dump/AccessGroupDump'
import PluginMetaDataDump from '@regardsoss/admin-accessright-management/tests/model/dump/PluginMetaDataDump'
import PluginConfigurationDump from '@regardsoss/admin-accessright-management/tests/model/dump/PluginConfigurationDump'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

storiesOf('Project admin - Access Right', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('List', () => {
    const themeName = addLocaleAndThemeSelectors()
    const accessGroupList = object('Account list', AccessGroupDump)
    const pluginMetaDataList = object('Account list', PluginMetaDataDump)
    const pluginConfigurationList = object('Account list', PluginConfigurationDump)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-account-management/src/i18n">
        <AccessRightComponent
          accessGroupList={accessGroupList}
          pluginMetaDataList={pluginMetaDataList}
          pluginConfigurationList={pluginConfigurationList}
          onSubmit={action('onSubmit')}
          onDelete={action('onDelete')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
