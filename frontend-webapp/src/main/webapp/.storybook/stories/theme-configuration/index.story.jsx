import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { StoreDecorator } from '../utils/decorators'
import {muiTheme} from '@regardsoss/components/src/storybook-addon-material-ui'

storiesOf('Theme configuration', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('storybook-addon-material-ui theme configurer', () => (
    muiTheme()(() => (<div></div>))
  ))

