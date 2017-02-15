/**
 * LICENSE_PLACEHOLDER
 **/
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
import reactIntl from '../decorators/reactIntl'
import TwoTemporalCriteriaSimpleComponent from '../../src/components/TwoTemporalCriteriaSimpleComponent'

storiesOf('TwoTemporalCriteriaSimpleComponent', module)
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .addDecorator(reactIntl)
  .add('Default', () => {
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
      <TwoTemporalCriteriaSimpleComponent attributes={attributes} onChange={action('onChange')} pluginInstanceId={42} />
    )
  })
