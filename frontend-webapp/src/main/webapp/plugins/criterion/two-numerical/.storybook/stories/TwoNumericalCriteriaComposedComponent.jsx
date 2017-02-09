/**
 * LICENSE_PLACEHOLDER
 **/
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
import reactIntl from '../decorators/reactIntl'
import TwoNumericalCriteriaComposedComponent from '../../src/components/TwoNumericalCriteriaComposedComponent'

storiesOf('TwoNumericalCriteriaComposedComponent', module)
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .addDecorator(reactIntl)
  .add('Default', () => {
    const attributes = object('Attributes', {
      firstAttribute: {
        name: 'firstAttribute',
        description: 'First and unique attribute to search',
        type: 'numerical',
      },
    })
    return (
      <TwoNumericalCriteriaComposedComponent attributes={attributes} onChange={action('onChange')} pluginInstanceId={42} />
    )
  })
