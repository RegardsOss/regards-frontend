import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import Components from './ComponentsExample'
import Card from './CardExampleControlled'
import Palette from './Palette'

const reqThemes = require.context('./.themes/', true, /.json/)
const themesList = []
reqThemes.keys().forEach((filename) => {
  themesList.push(reqThemes(filename))
})

storiesOf('Material-UI', module)
  .addDecorator(muiTheme(themesList))
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
  .add('Components', () => (
    <Components />
  ))
  .add('Card', () => (
    <Card />
  ))
  .add('Palette', () => (
    <Palette />
  ))
