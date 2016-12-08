import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import DbConnectionTester  from '@regardsoss/admin-database-management/src/components/DbConnectionTester'
import { ProjectListComponent } from '@regardsoss/admin-project-management/src/components/ProjectListComponent'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

storiesOf('InstanceAdmin - Database', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('Connection tester', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <DbConnectionTester />
      </ThemeAndLocaleDecorator>
    )
  })
