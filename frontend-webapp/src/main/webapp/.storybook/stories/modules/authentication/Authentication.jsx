import { storiesOf } from '@kadira/storybook'
import { LazyModuleComponent, ModuleThemeProvider } from '@regardsoss/modules'
import ResetPasswordComponent from '@regardsoss/authentication/src/components/ResetPasswordComponent'
import styles from '@regardsoss/authentication/src/styles/styles'
import { withKnobs, text } from '@kadira/storybook-addon-knobs'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

storiesOf('Authentication', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('Without cancel', () => {
    const themeName = addLocaleAndThemeSelectors()
    const module = {
      name: 'authentication',
      active: true,
      conf: {
        cancelButton: false,
        title: 'Authentication form',
        errorMessage: text('Message error', ''),
      },
    }
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/authentication/src/i18n">
        <LazyModuleComponent appName={'test'} module={module} />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('With cancel', () => {
    const themeName = addLocaleAndThemeSelectors()
    const module = {
      name: 'authentication',
      active: true,
      conf: {
        cancelButton: true,
        title: 'Authentication form',
        errorMessage: text('Message error', ''),
      },
    }
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/authentication/src/i18n">
        <LazyModuleComponent appName={'test'} module={module} />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Reset password', () => {
    const themeName = addLocaleAndThemeSelectors()
    const moduleTheme = { styles }

    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/authentication/src/i18n">
        kaka ici
        <ModuleThemeProvider module={moduleTheme}>
          <ResetPasswordComponent />
        </ModuleThemeProvider>
      </ThemeAndLocaleDecorator>
    )
  })

