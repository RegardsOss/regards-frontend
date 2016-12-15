/**
 * LICENSE_PLACEHOLDER
 **/
import { ModuleContainer } from '@regardsoss/portal-projects'
import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

storiesOf('Portal projects', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/portal-projects/src/i18n">
        <ModuleContainer />
      </ThemeAndLocaleDecorator>
    )
  })
