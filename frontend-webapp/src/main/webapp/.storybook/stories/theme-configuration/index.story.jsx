import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { muiTheme } from '@regardsoss/vendors'
import { StoreDecorator } from '../utils/decorators'

storiesOf('Theme configuration', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('storybook-addon-material-ui theme configurer', () => (
    muiTheme()(() => (<div />))
  ))

