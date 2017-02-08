/**
 * LICENSE_PLACEHOLDER
 **/
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
import NumericalCriteriaComponent from '../../src/components/NumericalCriteriaComponent'

storiesOf('NumericalCriteriaComponent', module)
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .add('Default', () => {
    const attributes = object('Attributes', {
      searchField: {
        name: 'searchField',
        description: 'Attribute to search',
        type: 'numerical',
      },
    })
    return (
      <NumericalCriteriaComponent attributes={attributes} onChange={action('onChange')} pluginInstanceId={42} />
    )
  })
