import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@storybook/addon-knobs'
import AccessGroupFormComponent from '@regardsoss/admin-accessright-accessgroup-management/src/components/AccessGroupFormComponent'
import AccessGroupListComponent from '@regardsoss/admin-accessright-accessgroup-management/src/components/AccessGroupListComponent'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale } from '../../decorators/index'

const defaultAccessGroupList = []

storiesOf('Project admin - Access group', module)
  .addDecorator(withLocale('modules/admin-user-accessgroup-management/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(muiTheme())
  .add('List', () => {
    const accessGroupList = object('Access group', defaultAccessGroupList)
    return (
      <AccessGroupListComponent
        accessGroup={accessGroupList}
        createUrl="#"
        backUrl="#"
        handleEdit={action('handleEdit')}
        handleDelete={action('handleDelete')}
        handleDuplicate={action('handleDuplicate')}
      />
    )
  })
  .add('Create', () => (
    <AccessGroupFormComponent
      onSubmit={action('submit')}
      backUrl="#"
      isDuplicating={false}
      isCreating
      isEditing={false}
    />
    ))

  .add('Edit', () => {
    const accessGroup = object('Access group', defaultAccessGroupList.AG1)
    return (
      <AccessGroupFormComponent
        onSubmit={action('submit')}
        currentAccessGroup={accessGroup}
        backUrl="#"
        isDuplicating={false}
        isCreating={false}
        isEditing
      />
    )
  })
  .add('Duplicate', () => {
    const accessGroup = object('Access group', defaultAccessGroupList.AG1)
    return (
      <AccessGroupFormComponent
        onSubmit={action('submit')}
        currentAccessGroup={accessGroup}
        backUrl="#"
        isDuplicating
        isCreating={false}
        isEditing={false}
      />
    )
  })
