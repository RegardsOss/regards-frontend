import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Colors from './Colors'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeDecorator } from '../../utils/decorators'

storiesOf('Material Design', module)
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
