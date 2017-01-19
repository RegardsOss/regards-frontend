import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import ReactTransitionGroupDemo from '@regardsoss/components/src/transitions/ReactTransitionGroupDemo'
import Colors from './Colors'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeDecorator } from '../../utils/decorators'
import ReactTransitionGroupDemo from '@regardsoss/components/src/transitions/ReactTransitionGroupDemo'

storiesOf('Material Design', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
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
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeDecorator theme={themeName}>
        <Colors />
      </ThemeDecorator>
    )
  })
  .add('Motion', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeDecorator theme={themeName}>
        <ReactTransitionGroupDemo />
      </ThemeDecorator>
    )
  })
