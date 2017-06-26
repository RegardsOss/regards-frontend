/**
 * LICENSE_PLACEHOLDER
 **/
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { LazyModuleComponent } from '@regardsoss/modules'
import styles from '@regardsoss-modules/news/src/styles/styles'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withModuleTheme } from '../../decorators/index'

storiesOf('News module', module)
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(withModuleTheme({ styles }))
  .addDecorator(muiTheme())
  .add('', () => {
    const module = {
      name: 'news',
      active: true,
      conf: {},
    }
    return (
      <LazyModuleComponent appName={'test'} module={module} />
    )
  })
