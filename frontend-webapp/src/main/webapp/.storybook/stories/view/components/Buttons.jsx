import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { OnHoverSwitchFlatButton, OnHoverSwitchRaisedButton, OnHoverSwitchIconButton } from '@regardsoss/components'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import Check from 'material-ui/svg-icons/navigation/check'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

storiesOf('Generic components - Buttons', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('On hover switch FlatButton', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <OnHoverSwitchFlatButton
          label={['not hovered', 'hovered']}
          icon={[<Check />, <PlayArrow />]}
          primary={[true, false]}
          secondary={[false, true]}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('On hover switch RaisedButton', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <OnHoverSwitchRaisedButton
          label={['not hovered', 'hovered']}
          icon={[<Check />, <PlayArrow />]}
          primary={[true, false]}
          secondary={[false, true]}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('On hover switch IconButton', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <OnHoverSwitchIconButton tooltip={[null, 'Hovered']}>
          <Check />
          <PlayArrow />
        </OnHoverSwitchIconButton>
      </ThemeAndLocaleDecorator>
    )
  })
