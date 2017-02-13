/**
 * LICENSE_PLACEHOLDER
 **/
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
import reactIntl from '../decorators/reactIntl'
import TwoTemporalCriteriaComponent from '../../src/components/TwoTemporalCriteriaComponent'

storiesOf('TwoTemporalCriteriaComponent', module)
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .addDecorator(reactIntl)
  .add('with two different attributes', () => {
    const attributes = object('Attributes', {
      firstField: {
        name: 'firstAttribute',
        description: 'First attribute to search',
        type: 'temporal',
      },
      secondField: {
        name: 'secondAttribute',
        description: 'Second attribute to search',
        type: 'temporal',
      },
    })
    return (
      <TwoTemporalCriteriaComponent attributes={attributes} onChange={action('onChange')} pluginInstanceId={42} />
    )
  })
  .add('with the same attribute', () => {
    const attributes = object('Attributes', {
      firstField: {
        name: 'attribute',
        description: 'First attribute to search',
        type: 'temporal',
      },
      secondField: {
        name: 'attribute',
        description: 'Second attribute to search',
        type: 'temporal',
      },
    })
    return (
      <TwoTemporalCriteriaComponent attributes={attributes} onChange={action('onChange')} pluginInstanceId={42} />
    )
  })
