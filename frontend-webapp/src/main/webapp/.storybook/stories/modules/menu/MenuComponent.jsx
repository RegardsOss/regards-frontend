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
      name: 'menu',
      active: true,
      conf: {
        title: 'Menu Component',
        displayAuthentication: false,
        displayLocaleSelector: false,
        displayThemeSelector: false,
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
      name: 'menu',
      active: true,
      conf: {
        title: 'Menu Component with authentication',
        displayAuthentication: true,
        displayLocaleSelector: true,
        displayThemeSelector: true,
      },
    })
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir={'modules/menu/src/i18n'}>
        <LazyModuleComponent appName={'test'} module={module} />
      </ThemeAndLocaleDecorator>
    )
  })
