import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import DatasourceCreateOrPickConnectionComponent from '@regardsoss/admin-data-datasource-management/src/components/DatasourceCreateOrPickConnectionComponent'
import DatasourceFormAttributesComponent from '@regardsoss/admin-data-datasource-management/src/components/DatasourceFormAttributesComponent'
import DatasourceFormMappingComponent from '@regardsoss/admin-data-datasource-management/src/components/DatasourceFormMappingComponent'
import DatasourceListComponent from '@regardsoss/admin-data-datasource-management/src/components/DatasourceListComponent'
import ConnectionTableDump from '@regardsoss/client/tests/rs-dam/ConnectionTable.dump'
import ConnectionTableAttributeDump from '@regardsoss/client/tests/rs-dam/ConnectionTableAttribute.dump'
import ConnectionDump from '@regardsoss/client/tests/rs-dam/Connection.dump'
import ModelAttributeDump from '@regardsoss/client/tests/rs-dam/ModelAttribute.dump'
import DatasourceDump from '@regardsoss/client/tests/rs-dam/Datasource.dump'
import ModelDump from '@regardsoss/client/tests/rs-dam/Model.dump'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale } from '../../decorators/index'

storiesOf('Project admin - Datasource', module)
  .addDecorator(withLocale('modules/admin-data-datasource-management/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .addDecorator(withStore)
  .add('List', () => {
    const datasourceList = object('Datasource list', DatasourceDump)
    return (
      <DatasourceListComponent
        datasourceList={datasourceList}
        handleDelete={action('handleDelete')}
        handleEdit={action('handleEdit')}
        createUrl="#"
        backUrl="#"
      />
    )
  })
  .add('Create (first step)', () => {
    const connectionList = object('Connection list', ConnectionDump)
    return (
      <DatasourceCreateOrPickConnectionComponent
        handleDone={action('handleDone')}
        backUrl="#"
        createConnectionUrl="#"
        connectionList={connectionList}
      />
    )
  })
  .add('Edit (second step)', () => {
    const modelList = object('Model list', ModelDump)
    const currentDatasource = object('Datasource', DatasourceDump[4])
    const currentConnection = object('Connection', ConnectionDump[1352])
    return (
      <DatasourceFormAttributesComponent
        onSubmit={action('onSubmit')}
        backUrl="#"
        currentDatasource={currentDatasource}
        currentConnection={currentConnection}
        modelList={modelList}
      />
    )
  })
  .add('Edit (last step)', () => {
    const tableAttributeList = object('Table attributes list', ConnectionTableAttributeDump)
    const modelAttributeList = object('Model attribute list', ModelAttributeDump)
    const tableList = object('Table list', ConnectionTableDump)
    const currentDatasource = object('Datasource', DatasourceDump[4])
    return (
      <DatasourceFormMappingComponent
        onSubmit={action('onSubmit')}
        handleBack={action('handleBack')}
        onTableSelected={action('onTableSelected')}
        isEditing
        isCreating={false}
        currentDatasource={currentDatasource}
        tableList={tableList}
        modelAttributeList={modelAttributeList}
        tableAttributeList={tableAttributeList}
      />
    )
  })
