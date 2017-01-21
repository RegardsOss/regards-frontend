import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import SexyBoardItemComponent from './SexyBoardItemComponent'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeDecorator } from '../../utils/decorators'

storiesOf('Board', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('Sexy board item', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeDecorator theme={themeName}>
        <SexyBoardItemComponent />
      </ThemeDecorator>
    )
  })
