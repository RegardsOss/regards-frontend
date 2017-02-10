import { storiesOf, action } from '@kadira/storybook'
import { ModuleThemeProvider } from '@regardsoss/modules'
import { values } from 'lodash'
import AccountRequestFormComponent, { requestFormIds } from '@regardsoss/authentication/src/components/AccountRequestFormComponent'
import AccountOperationMessage, { operationIds } from '@regardsoss/authentication/src/components/AccountOperationMessage'
import CompleteResetPasswordFormComponent from '@regardsoss/authentication/src/components/ChangePasswordFormComponent'
import AuthenticationFormComponent from '@regardsoss/authentication/src/components/AuthenticationFormComponent'
import styles from '@regardsoss/authentication/src/styles/styles'
import { withKnobs, text, boolean, select } from '@kadira/storybook-addon-knobs'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

storiesOf('Authentication', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('Login', () => {
    const themeName = addLocaleAndThemeSelectors()
    const moduleTheme = { styles }
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/authentication/src/i18n">
        <ModuleThemeProvider module={moduleTheme}>
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
        </ModuleThemeProvider>
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Account operation requests', () => {
    const themeName = addLocaleAndThemeSelectors()
    const moduleTheme = { styles }

    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/authentication/src/i18n">
        <ModuleThemeProvider module={moduleTheme}>
          <AccountRequestFormComponent
            sendFailed={boolean('Send failed')}
            requestFormId={select('Operation type', values(requestFormIds), requestFormIds.resetPasswordRequest)}
            onRequestAction={action('form action')}
            onBack={action('Back clicked')}
          />
        </ModuleThemeProvider>
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Account operation message', () => {
    const themeName = addLocaleAndThemeSelectors()
    const moduleTheme = { styles }

    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/authentication/src/i18n">
        <ModuleThemeProvider module={moduleTheme}>
          <AccountOperationMessage
            operationId={select('Message type', values(operationIds), operationIds.askUnlockAccountSent)}
            operationAction={action('done click')}
          />
        </ModuleThemeProvider>
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Complete password update', () => {
    const themeName = addLocaleAndThemeSelectors()
    const moduleTheme = { styles }

    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/authentication/src/i18n">
        <ModuleThemeProvider module={moduleTheme}>
          <CompleteResetPasswordFormComponent onChangePassword={action('done click')} />
        </ModuleThemeProvider>
      </ThemeAndLocaleDecorator>
    )
  })

