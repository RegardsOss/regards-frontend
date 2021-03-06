import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { OnHoverSwitchFlatButton, OnHoverSwitchRaisedButton, OnHoverSwitchIconButton } from '@regardsoss/components'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import Check from 'material-ui/svg-icons/navigation/check'
import { muiTheme } from 'storybook-addon-material-ui'
import withStore from '../../decorators/withStore'

storiesOf('Generic components - Buttons', module)
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(muiTheme())
  .add('On hover switch FlatButton', () => (
    <OnHoverSwitchFlatButton
      label={['not hovered', 'hovered']}
      icon={[<Check />, <PlayArrow />]}
      primary={[true, false]}
      secondary={[false, true]}
    />
    ))
  .add('On hover switch RaisedButton', () => (
    <OnHoverSwitchRaisedButton
      label={['not hovered', 'hovered']}
      icon={[<Check />, <PlayArrow />]}
      primary={[true, false]}
      secondary={[false, true]}
    />
    ))
  .add('On hover switch IconButton', () => (
    <OnHoverSwitchIconButton tooltip={[null, 'Hovered']}>
      <Check />
      <PlayArrow />
    </OnHoverSwitchIconButton>
    ))
