import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { OnHoverSwitchFlatButton, OnHoverSwitchRaisedButton, OnHoverSwitchIconButton } from '@regardsoss/components'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import Check from 'material-ui/svg-icons/navigation/check'
import { muiTheme } from 'storybook-addon-material-ui'
import { StoreDecorator } from '../../utils/decorators'

storiesOf('Generic components - Buttons', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .addDecorator(muiTheme())
  .add('On hover switch FlatButton', () => {
    return (
      <OnHoverSwitchFlatButton
        label={['not hovered', 'hovered']}
        icon={[<Check />, <PlayArrow />]}
        primary={[true, false]}
        secondary={[false, true]}
      />
    )
  })
  .add('On hover switch RaisedButton', () => {
    return (
      <OnHoverSwitchRaisedButton
        label={['not hovered', 'hovered']}
        icon={[<Check />, <PlayArrow />]}
        primary={[true, false]}
        secondary={[false, true]}
      />
    )
  })
  .add('On hover switch IconButton', () => {
    return (
      <OnHoverSwitchIconButton tooltip={[null, 'Hovered']}>
        <Check />
        <PlayArrow />
      </OnHoverSwitchIconButton>
    )
  })
