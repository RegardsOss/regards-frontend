import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import ConnectionFormComponent from '@regardsoss/admin-data-connection-management/src/components/ConnectionFormComponent'
import ConnectionListComponent from '@regardsoss/admin-data-connection-management/src/components/ConnectionListComponent'
import ConnectionDump from '@regardsoss/client/tests/rs-dam/Connection.dump'
import PluginMetaDataDump from '@regardsoss/client/tests/rs-common/PluginMetaData.dump'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale } from '../../decorators/index'

storiesOf('Project admin - Connection', module)
  .addDecorator(withLocale('modules/admin-data-connection-management/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .addDecorator(withStore)
  .add('List', () => {
    const connectionList = object('Connection list', ConnectionDump)
    return (
      <ConnectionListComponent
        connectionList={connectionList}
        handleDelete={action('handleDelete')}
        handleEdit={action('handleEdit')}
        handleTestConnection={action('handleTestConnection')}
        createUrl="#"
        backUrl="#"
      />
    )
  })
  .add('Create', () => {
    const pluginMetaDataList = object('Plugin metadata list', PluginMetaDataDump)
    return (
      <ConnectionFormComponent
        pluginMetaDataList={pluginMetaDataList}
        onSubmit={action('onSubmit')}
        backUrl="#"
        isCreating
        isEditing={false}
      />
    )
  })
  .add('Edit', () => {
    const currentConnection = object('Connection', ConnectionDump[1353])
    const pluginMetaDataList = object('Plugin metadata list', PluginMetaDataDump)
    return (
      <ConnectionFormComponent
        currentConnection={currentConnection}
        pluginMetaDataList={pluginMetaDataList}
        onSubmit={action('onSubmit')}
        backUrl="#"
        isCreating={false}
        isEditing
      />
    )
  })
