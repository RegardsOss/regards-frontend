import { ModuleThemeProvider } from '@regardsoss/modules'

/**
 * Storybook decorator providing a moduleTheme in the context of the decorated story
 *
 * WARNING: Must be registered in the decorators BEFORE the muiTheme decorator, like so:
 * ....
 *   .addDecorator(withModuleTheme()
 *   .addDecorator(muiTheme())
 * .....
 *
 * @param moduleTheme
 */
const withModuleTheme = moduleTheme => (
  story => (
    <ModuleThemeProvider module={moduleTheme}>
      {story()}
    </ModuleThemeProvider>
  )
)
export default withModuleTheme
