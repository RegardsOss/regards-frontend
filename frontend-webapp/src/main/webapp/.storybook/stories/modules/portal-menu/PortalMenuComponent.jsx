/**
 * LICENSE_PLACEHOLDER
 **/
import { ModuleContainer } from '@regardsoss/portal-menu'
import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeDecorator } from '../../utils/decorators'

storiesOf('Portal menu', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeDecorator theme={themeName}>
        <ModuleContainer appName="portalApp" />
      </ThemeDecorator>
    )
  })
