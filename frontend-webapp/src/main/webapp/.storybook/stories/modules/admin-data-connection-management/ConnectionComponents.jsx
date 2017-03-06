import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import ConnectionFormComponent from '@regardsoss/admin-data-connection-management/src/components/ConnectionFormComponent'
import ConnectionListComponent from '@regardsoss/admin-data-connection-management/src/components/ConnectionListComponent'
import ConnectionDump from '@regardsoss/admin-data-connection-management/tests/model/dump/ConnectionDump'
import PluginMetaDataDump from '@regardsoss/admin-data-connection-management/tests/model/dump/PluginMetaDataDump'
import { muiTheme } from 'storybook-addon-material-ui'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'
import { withStore, withLocale } from '../../decorators/index'

storiesOf('Project admin - Connection', module)
  .addDecorator(withLocale('modules/admin-data-connection-management/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .addDecorator(withStore)
  .add('List', () => {
    const themeName = addLocaleAndThemeSelectors()
    const connectionList = object('Connection list', ConnectionDump)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-connection-management/src/i18n">
        <ConnectionListComponent
          connectionList={connectionList}
          handleDelete={action('handleDelete')}
          handleEdit={action('handleEdit')}
          handleTestConnection={action('handleTestConnection')}
          createUrl="#"
          backUrl="#"
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Create', () => {
    const themeName = addLocaleAndThemeSelectors()
    const pluginMetaDataList = object('Plugin metadata list', PluginMetaDataDump)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-connection-management/src/i18n">
        <ConnectionFormComponent
          pluginMetaDataList={pluginMetaDataList}
          onSubmit={action('onSubmit')}
          backUrl="#"
          isCreating
          isEditing={false}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Edit', () => {
    const themeName = addLocaleAndThemeSelectors()
    const currentConnection = object('Connection', ConnectionDump[1353])
    const pluginMetaDataList = object('Plugin metadata list', PluginMetaDataDump)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-connection-management/src/i18n">
        <ConnectionFormComponent
          currentConnection={currentConnection}
          pluginMetaDataList={pluginMetaDataList}
          onSubmit={action('onSubmit')}
          backUrl="#"
          isCreating={false}
          isEditing
        />
      </ThemeAndLocaleDecorator>
    )
  })
