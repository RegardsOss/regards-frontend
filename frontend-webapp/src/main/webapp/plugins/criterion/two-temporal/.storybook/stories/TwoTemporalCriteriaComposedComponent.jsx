/**
 * LICENSE_PLACEHOLDER
 **/
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
import reactIntl from '../decorators/reactIntl'
import TwoTemporalCriteriaComposedComponent from '../../src/components/TwoTemporalCriteriaComposedComponent'

storiesOf('TwoTemporalCriteriaComposedComponent', module)
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .addDecorator(reactIntl)
  .add('Default', () => {
    const attributes = object('Attributes', {
      firstField: {
        name: 'attribute',
        description: 'First and unique attribute to search',
        type: 'temporal',
      },
    })
    return (
      <TwoTemporalCriteriaComposedComponent attributes={attributes} onChange={action('onChange')} pluginInstanceId={42} />
    )
  })
