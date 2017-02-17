import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import ReactTransitionGroupDemo from '@regardsoss/components/src/transitions/ReactTransitionGroupDemo'
import Colors from './Colors'
import { StoreDecorator } from '../../utils/decorators'
import { muiTheme } from 'storybook-addon-material-ui'

storiesOf('Material Design', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .addDecorator(muiTheme())
  .addDecorator((story) => {
    const storyKind = story()
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            minWidth: 600,
          }}
        >
          {storyKind}
        </div>
      </div>)
  })
  .add('Colors', () => {
    return (
        <Colors />
    )
  })
  .add('Motion', () => {
    return (
        <ReactTransitionGroupDemo />
    )
  })
