/**
 * LICENSE_PLACEHOLDER
 **/
import { LazyModuleComponent } from '@regardsoss/modules'
import { storiesOf } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

storiesOf('Menu', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('Simple', () => {
    const themeName = addLocaleAndThemeSelectors()
    const module = object('Menu module', {
      id: 'menu',
      conf: {
        title: 'Menu Component',
        displayAuthentication: false,
      },
    })
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir={'modules/menu/src/i18n'}>
        <LazyModuleComponent appName={'test'} module={module} />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('With authentication', () => {
    const themeName = addLocaleAndThemeSelectors()
    const module = object('Menu module', {
      id: 'menu',
      conf: {
        title: 'Menu Component with authentication',
        displayAuthentication: true,
      },
    })
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir={'modules/menu/src/i18n'}>
        <LazyModuleComponent appName={'test'} module={module} />
      </ThemeAndLocaleDecorator>
    )
  })
