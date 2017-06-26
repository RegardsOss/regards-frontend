import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import ReactTransitionGroupDemo from '@regardsoss/components/src/transitions/ReactTransitionGroupDemo'
import { muiTheme } from 'storybook-addon-material-ui'
import Colors from './Colors'
import withStore from '../../decorators/withStore'

storiesOf('Material Design', module)
  .addDecorator(withKnobs)
  .addDecorator(withStore)
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
  .add('Colors', () => (
    <Colors />
    ))
  .add('Motion', () => (
    <ReactTransitionGroupDemo />
    ))
