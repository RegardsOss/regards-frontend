import { storiesOf, action } from '@kadira/storybook'
import { values } from 'lodash'
import AccountRequestFormComponent, { requestFormIds } from '@regardsoss/authentication/src/components/AccountRequestFormComponent'
import AccountOperationMessage, { operationIds } from '@regardsoss/authentication/src/components/AccountOperationMessage'
import CompleteResetPasswordFormComponent from '@regardsoss/authentication/src/components/ChangePasswordFormComponent'
import AuthenticationFormComponent from '@regardsoss/authentication/src/components/AuthenticationFormComponent'
import AskProjectAccessFormComponent from '@regardsoss/authentication/src/components/AskProjectAccessFormComponent'
import styles from '@regardsoss/authentication/src/styles/styles'
import { withKnobs, text, boolean, select } from '@kadira/storybook-addon-knobs'
import { withStore, withLocale, withModuleTheme } from '../../decorators/index'
import { muiTheme } from 'storybook-addon-material-ui'

storiesOf('Authentication', module)
  .addDecorator(withLocale('modules/authentication/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(withModuleTheme({ styles }))
  .addDecorator(muiTheme())
  .addDecorator(withStore)
  .add('Login', () => (
    <AuthenticationFormComponent
      title="Authentication form"
      showCreateAccount={boolean('create account', true)}
      onLogin={action('Login')}
      onSubmit={action('reset password')}
      errorMessage={text('Message error', '')}
      showCancel={boolean('Cancel button', true)}
      onCancelAction={action('cancel')}
      onGotoResetPassword={action('goto reset account')}
      onGotoUnlockAccount={action('goto unlock account')}
      onGotoCreateAccount={action('goto create account')}
    />
  ))
  .add('Create account', () => (
    <AskProjectAccessFormComponent
      onRequestAction={action('done click')}
      onBack={action('done click')}
      project="any"
    />
  ))
  .add('Account operation requests', () => (
    <AccountRequestFormComponent
      sendFailed={boolean('Send failed')}
      requestFormId={select('Operation type', values(requestFormIds), requestFormIds.resetPasswordRequest)}
      onRequestAction={action('form action')}
      onBack={action('Back clicked')}
    />
  ))
  .add('Account operation message', () => (
    <AccountOperationMessage
      operationId={select('Message type', values(operationIds), operationIds.askUnlockAccountSent)}
      operationAction={action('done click')}
    />
  ))
  .add('Complete password update', () => (
    <CompleteResetPasswordFormComponent onChangePassword={action('done click')} />
  ))

