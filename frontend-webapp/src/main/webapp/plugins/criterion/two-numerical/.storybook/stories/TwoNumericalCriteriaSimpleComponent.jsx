/**
 * LICENSE_PLACEHOLDER
 **/
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
import TwoNumericalCriteriaSimpleComponent from '../../src/components/TwoNumericalCriteriaSimpleComponent'

storiesOf('TwoNumericalCriteriaSimpleComponent', module)
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .add('Default', () => {
    const attributes = object('Attributes', {
      firstAttribute: {
        name: 'firstAttribute',
        description: 'First attribute to search',
        type: 'numerical',
      },
      secondAttribute: {
        name: 'secondAttribute',
        description: 'Second attribute to search',
        type: 'numerical',
      },
    })
    return (
      <TwoNumericalCriteriaSimpleComponent attributes={attributes} onChange={action('onChange')} pluginInstanceId={42} />
    )
  })
