import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import AccountListComponent from '@regardsoss/admin-account-management/src/components/AccountListComponent'
import AccountFormComponent from '@regardsoss/admin-account-management/src/components/AccountFormComponent'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

const defaultAccountList = {
  1: {
    content: {
      id: 1,
      email: 'admin@cnes.com',
      firstName: 'Jose',
      lastName: 'Thierry',
      status: 'PENDING',
    },
    links: [],
  },
}

storiesOf('InstanceAdmin - Account', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('List', () => {
    const themeName = addLocaleAndThemeSelectors()
    const accountList = object('Account list', defaultAccountList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-account-management/src/i18n">
        <AccountListComponent
          accountList={accountList}
          createUrl="dfjgisjdf"
          onDelete={action('delete account')}
          onEdit={action('edit account')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Create', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-account-management/src/i18n">
        <AccountFormComponent
          backUrl="/some/url"
          onSubmit={action('onCreate')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Edit', () => {
    const themeName = addLocaleAndThemeSelectors()
    const accountList = object('Account list', defaultAccountList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-account-management/src/i18n">
        <AccountFormComponent
          currentAccount={accountList[1]}
          backUrl="/some/url"
          onSubmit={action('onEdit')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
