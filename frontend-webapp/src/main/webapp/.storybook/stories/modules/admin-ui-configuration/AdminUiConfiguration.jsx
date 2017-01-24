/**
 * LICENSE_PLACEHOLDER
 **/
import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { ApplicationLayoutComponent } from '@regardsoss/admin-ui-configuration/src/components/ApplicationLayoutComponent'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeDecorator } from '../../utils/decorators'

storiesOf('Project admin - UI Configuration', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const module = {
      name: 'news',
      active: true,
      conf: {},
    }
    const themeName = addLocaleAndThemeSelectors()
    const layout = "{\n  \"id\": \"main\",\n  \"type\": \"FormMainContainer\",\n  \"classes\": [],\n  \"styles\": {},\n  \"containers\": [{\n    \"id\": \"row\",\n    \"type\": \"RowContainer\",\n    \"classes\": [],\n    \"styles\": {\"minHeight\":\"50px\",\"backgroundColor\":\"Red\"},\n    \"containers\": [{\n      \"id\": \"block1\",\n      \"type\": \"LargeColumnContainer\",\n      \"classes\": [],\n      \"styles\": {\"minHeight\":\"50px\",\"backgroundColor\":\"White\"},\n      \"containers\": []\n    }, {\n      \"id\": \"block2\",\n      \"type\": \"SmallColumnContainer\",\n      \"classes\": [],\n      \"styles\": {\"minHeight\":\"50px\",\"backgroundColor\":\"White\"},\n      \"containers\": []\n    }]\n  }, {\n    \"id\": \"row2\",\n    \"type\": \"RowContainer\",\n    \"styles\": {\"minHeight\":\"50px\",\"backgroundColor\":\"Blue\"},\n    \"classes\": [],\n    \"containers\": [{\n      \"id\": \"block21\",\n      \"type\": \"SmallColumnContainer\",\n      \"classes\": [],\n      \"styles\": {\"minHeight\":\"50px\",\"backgroundColor\":\"White\"},\n      \"containers\": []\n    }, {\n      \"id\": \"block22\",\n      \"type\": \"LargeColumnContainer\",\n      \"classes\": [],\n      \"styles\": {\"minHeight\":\"50px\",\"backgroundColor\":\"White\"},\n      \"containers\": []\n    }]\n  }]\n}\n"
    return (
      <ThemeDecorator theme={themeName}>
        <ApplicationLayoutComponent
          layout={layout}
        />
      </ThemeDecorator>
    )
  })
