import { storiesOf } from '@kadira/storybook'
import { LazyModuleComponent } from '@regardsoss/modules'
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
