/**
 * LICENSE_PLACEHOLDER
 **/
import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { LazyModuleComponent } from '@regardsoss/modules'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeDecorator } from '../../utils/decorators'

storiesOf('News module', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const module = {
      name: 'news',
      active: true,
      conf: {},
    }
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeDecorator theme={themeName}>
        <LazyModuleComponent appName={'test'} module={module} />
      </ThemeDecorator>
    )
  })
