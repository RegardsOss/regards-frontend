/**
 * LICENSE_PLACEHOLDER
 **/
import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { LazyModuleComponent } from '@regardsoss/modules-manager'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeDecorator } from '../../utils/decorators'

storiesOf('News module', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeDecorator theme={themeName}>
        <LazyModuleComponent appName={'test'} module={{ id: 'news' }} />
      </ThemeDecorator>
    )
  })
