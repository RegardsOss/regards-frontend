import { storiesOf, action } from '@kadira/storybook'
import { ModuleThemeProvider } from '@regardsoss/modules'
import AccountRequestFormComponent, {requestFormIds} from '@regardsoss/authentication/src/components/AccountRequestFormComponent'
import AccountOperationMessage, {operationIds} from '@regardsoss/authentication/src/components/AccountOperationMessage'
import LoginComponent from '@regardsoss/authentication/src/components/LoginComponent'
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
        <LoginComponent
          title="Authentication form"
          onLogin={action('Login')}
          onSubmit={action('reset password')}
          errorMessage={text('Message error', '')}
          cancelButton={boolean('Cancel button',true)}
          onCancelAction={action('cancel')}
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
            requestFormId={select('Operation type', requestFormIds, requestFormIds[0])}
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
            operationId={select('Message type', operationIds, operationIds[0])}
            operationAction={action('done click')}
          />
        </ModuleThemeProvider>
      </ThemeAndLocaleDecorator>
    )
  })

