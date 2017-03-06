/**
 * LICENSE_PLACEHOLDER
 **/
import { LazyModuleComponent } from '@regardsoss/modules'
import { storiesOf } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import styles from '@regardsoss/menu/src/styles/styles'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale, withModuleTheme } from '../../decorators/index'

storiesOf('Menu', module)
  .addDecorator(withLocale('modules/menu/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(withModuleTheme({ styles }))
  .addDecorator(muiTheme())
  .add('Simple', () => {
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
      <LazyModuleComponent appName={'test'} module={module} />
    )
  })
  .add('With authentication', () => {
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
      <LazyModuleComponent appName={'test'} module={module} />
    )
  })
