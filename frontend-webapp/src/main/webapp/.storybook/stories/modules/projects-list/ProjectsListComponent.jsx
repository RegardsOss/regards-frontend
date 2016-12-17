/**
 * LICENSE_PLACEHOLDER
 **/
import { LazyModuleComponent } from '@regardsoss/modules'
import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

storiesOf('Projects list', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/projects-list/src/i18n">
        <LazyModuleComponent appName={'test'} module={{ id: 'projects-list' }} />
      </ThemeAndLocaleDecorator>
    )
  })
