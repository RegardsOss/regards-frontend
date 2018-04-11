import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object, boolean } from '@storybook/addon-knobs'
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
      status: 'ACTIVE',
    },
    links: [],
  },
  2: {
    content: {
      id: 2,
      email: 'backup@cnes.com',
      firstName: 'Jean-Pierre',
      lastName: 'Moulines',
      status: 'PENDING',
    },
    links: [],
  },
}

const waitinAccountList = {
  2: {
    content: {
      id: 2,
      email: 'backup@cnes.com',
      firstName: 'Jean-Pierre',
      lastName: 'Moulines',
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
        accountList
        allAccounts={object('All users ({} for none)', accountList)}
        waitingAccounts={object('New user ({} for none)', waitinAccountList)}
        onAccept={action('onAccept')}
        onEdit={action('onEdit')}
        onDelete={action('onDelete')}
        initialFecthing={boolean('Initial fetching', false)}
        isFetchingActions={boolean('Actions fetching', false)}
        createUrl="dfjgisjdf"
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
