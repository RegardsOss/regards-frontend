import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import AccessGroupFormComponent from '@regardsoss/admin-user-accessgroup-management/src/components/AccessGroupFormComponent'
import AccessGroupListComponent from '@regardsoss/admin-user-accessgroup-management/src/components/AccessGroupListComponent'
import AccessGroupList from '@regardsoss/admin-user-accessgroup-management/tests/model/dump/AccessGroupList'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

const defaultAccessGroupList = AccessGroupList


storiesOf('Project admin - Access group', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('List', () => {
    const themeName = addLocaleAndThemeSelectors()
    const accessGroupList = object('Access group', defaultAccessGroupList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-user-accessgroup-management/src/i18n">
        <AccessGroupListComponent
          accessGroupList={accessGroupList}
          createUrl="#"
          backUrl="#"
          handleEdit={action('handleEdit')}
          handleDelete={action('handleDelete')}
          handleDuplicate={action('handleDuplicate')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Create', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-user-accessgroup-management/src/i18n">
        <AccessGroupFormComponent
          onSubmit={action('submit')}
          backUrl="#"
          isDuplicating={false}
          isCreating
          isEditing={false}
        />
      </ThemeAndLocaleDecorator>
    )
  })

  .add('Edit', () => {
    const themeName = addLocaleAndThemeSelectors()
    const accessGroup = object('Access group', defaultAccessGroupList.AG1)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-user-accessgroup-management/src/i18n">
        <AccessGroupFormComponent
          onSubmit={action('submit')}
          currentAccessGroup={accessGroup}
          backUrl="#"
          isDuplicating={false}
          isCreating={false}
          isEditing
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Duplicate', () => {
    const themeName = addLocaleAndThemeSelectors()
    const accessGroup = object('Access group', defaultAccessGroupList.AG1)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-user-accessgroup-management/src/i18n">
        <AccessGroupFormComponent
          onSubmit={action('submit')}
          currentAccessGroup={accessGroup}
          backUrl="#"
          isDuplicating
          isCreating={false}
          isEditing={false}
        />
      </ThemeAndLocaleDecorator>
    )
  })
