import { storiesOf } from '@kadira/storybook'
import { withKnobs, select, object } from '@kadira/storybook-addon-knobs'
import { ProjectAccountCreateContainer } from '@regardsoss/admin-user-management/src/containers/ProjectAccountCreateContainer'
import { ProjectAccountEditContainer } from '@regardsoss/admin-user-management/src/containers/ProjectAccountEditContainer'
import { ProjectAccountsContainer } from '@regardsoss/admin-user-management/src/containers/ProjectAccountsContainer'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

storiesOf('ProjectAdmin - ProjectAccount', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('List', () => {
    const themeName = addLocaleAndThemeSelectors()
    const accounts = object('Accounts', [{
      login: 'john',
      firstName: 'john',
      lastName: 'doe',
      email: 'john.doe@yopmail.com',
      status: 1,
    }])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-project-management/src/i18n">
        <ProjectAccountsContainer
          params={{ projectName: 'cdpp' }}
          accounts={accounts}
          fetchProjectAccounts={action('fetchProjectAccounts')}
          deleteProjectAccount={action('deleteProjectAccount')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Create', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-project-management/src/i18n">
        <ProjectAccountCreateContainer />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Edit', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-project-management/src/i18n">
        <ProjectAccountEditContainer />
      </ThemeAndLocaleDecorator>
    )
  })
