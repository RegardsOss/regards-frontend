/**
 * LICENSE_PLACEHOLDER
 **/
import { ModuleContainer } from '@regardsoss/news'
import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeDecorator } from '../../utils/decorators'

storiesOf('News module', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeDecorator theme={themeName}>
        <ModuleContainer />
      </ThemeDecorator>
    )
  })
