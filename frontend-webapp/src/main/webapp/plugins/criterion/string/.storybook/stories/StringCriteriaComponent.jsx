/**
 * LICENSE_PLACEHOLDER
 **/
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
import reactInlt from '../decorators/reactIntl'
import { StringCriteriaComponent } from '../../src/components/StringCriteriaComponent'

storiesOf('StringCriteriaComponent', module)
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .addDecorator(reactInlt)
  .add('Default', () => {
    const props = object('Props', {
      attributes: {
        searchField: {
          name: 'searchField',
          description: 'Attribute to search',
          type: 'string',
        },
      },
      onChange: action('onChange'),
      pluginInstanceId: 42,
      testDispatch: action('testDispatch'),
      test: '',
    })
    return (
      <StringCriteriaComponent {...props} />
    )
  })
