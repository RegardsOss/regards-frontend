/**
 * LICENSE_PLACEHOLDER
 **/
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
import { StringCriteriaComponent } from '../../src/components/StringCriteriaComponent'

storiesOf('StringCriteriaComponent', module)
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .add('Default', () => {
    const attributes = object('Attributes', {
      searchField: {
        name: 'searchField',
        description: 'Attribute to search',
        type: 'string',
      },
    })
    return (
      <StringCriteriaComponent attributes={attributes} onChange={action('onChange')} pluginInstanceId={42} />
    )
  })
