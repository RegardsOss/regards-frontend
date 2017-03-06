import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import DatasourceCreateOrPickConnectionComponent from '@regardsoss/admin-data-datasource-management/src/components/DatasourceCreateOrPickConnectionComponent'
import DatasourceFormAttributesComponent from '@regardsoss/admin-data-datasource-management/src/components/DatasourceFormAttributesComponent'
import DatasourceFormMappingComponent from '@regardsoss/admin-data-datasource-management/src/components/DatasourceFormMappingComponent'
import DatasourceListComponent from '@regardsoss/admin-data-datasource-management/src/components/DatasourceListComponent'
import ConnectionTableDump from '@regardsoss/admin-data-datasource-management/tests/model/dump/ConnectionTableDump'
import ConnectionTableAttributeDump from '@regardsoss/admin-data-datasource-management/tests/model/dump/ConnectionTableAttributeDump'
import ConnectionDump from '@regardsoss/admin-data-datasource-management/tests/model/dump/ConnectionDump'
import ModelAttributeDump from '@regardsoss/admin-data-datasource-management/tests/model/dump/ModelAttributeDump'
import DatasourceDump from '@regardsoss/admin-data-datasource-management/tests/model/dump/DatasourceDump'
import ModelDump from '@regardsoss/admin-data-datasource-management/tests/model/dump/ModelDump'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

storiesOf('Project admin - Datasource', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('List', () => {
    const themeName = addLocaleAndThemeSelectors()
    const datasourceList = object('Datasource', DatasourceDump)

    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-datasource-management/src/i18n">
        <DatasourceListComponent
          datasourceList={datasourceList}
          handleDelete={action('handleDelete')}
          handleEdit={action('handleEdit')}
          createUrl="#"
          backUrl="#"
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Create (first step)', () => {
    const themeName = addLocaleAndThemeSelectors()
    const connectionList = object('Connection list', ConnectionDump)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-datasource-management/src/i18n">
        <DatasourceCreateOrPickConnectionComponent
          handleDone={action('handleDone')}
          backUrl="#"
          createConnectionUrl="#"
          connectionList={connectionList}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Edit (second step)', () => {
    const themeName = addLocaleAndThemeSelectors()
    const modelList = object('Plugin metadata list', ModelDump)
    const currentDatasource = object('Plugin metadata list', DatasourceDump[4])
    const currentConnection = object('Plugin metadata list', ConnectionDump[1352])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-datasource-management/src/i18n">
        <DatasourceFormAttributesComponent
          onSubmit={action('onSubmit')}
          backUrl="#"
          currentDatasource={currentDatasource}
          currentConnection={currentConnection}
          modelList={modelList}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Edit (last step)', () => {
    const themeName = addLocaleAndThemeSelectors()
    const tableAttributeList = object('Plugin metadata list', ConnectionTableAttributeDump)
    const modelAttributeList = object('Plugin metadata list', ModelAttributeDump)
    const tableList = object('Plugin metadata list', ConnectionTableDump)
    const currentDatasource = object('Datasource', DatasourceDump[4])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-datasource-management/src/i18n">
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
      </ThemeAndLocaleDecorator>
    )
  })
