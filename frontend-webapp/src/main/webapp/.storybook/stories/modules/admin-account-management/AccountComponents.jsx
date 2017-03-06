import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import AccountListComponent from '@regardsoss/admin-account-management/src/components/AccountListComponent'
import AccountFormComponent from '@regardsoss/admin-account-management/src/components/AccountFormComponent'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale } from '../../decorators/index'

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
  .addDecorator(withLocale('modules/admin-account-management/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(muiTheme())
  .add('List', () => {
    const accountList = object('Account list', defaultAccountList)
    return (
      <AccountListComponent
        accountList={accountList}
        createUrl="dfjgisjdf"
        onDelete={action('delete account')}
        onEdit={action('edit account')}
      />
    )
  })
  .add('Edit', () => {
    const accountList = object('Account list', defaultAccountList)
    return (
      <AccountFormComponent
        currentAccount={accountList[1]}
        backUrl="/some/url"
        onSubmit={action('onEdit')}
      />
    )
  })
