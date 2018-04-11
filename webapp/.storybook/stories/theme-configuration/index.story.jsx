import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { muiTheme } from '@regardsoss/vendors'
import withStore from '../decorators/withStore'

storiesOf('Theme configuration', module)
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .add('storybook-addon-material-ui theme configurer', () => (
    muiTheme()(() => (<div />))
  ))

