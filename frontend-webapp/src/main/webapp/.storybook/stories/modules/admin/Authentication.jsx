import { storiesOf, action } from '@kadira/storybook'
import LoginComponent from '@regardsoss/admin/src/authentication/components/LoginComponent'
import { withKnobs, text } from '@kadira/storybook-addon-knobs'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

storiesOf('Authentication', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const themeName = addLocaleAndThemeSelectors()
    const errorMessage = text('Message error', '')
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin/src/authentication/i18n">
        <LoginComponent
          errorMessage={errorMessage}
          onLogin={action('login')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
