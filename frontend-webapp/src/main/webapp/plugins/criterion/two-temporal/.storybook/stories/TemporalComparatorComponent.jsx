/**
 * LICENSE_PLACEHOLDER
 **/
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
import reactIntl from '../decorators/reactIntl'
import TemporalComparatorComponent from '../../src/components/TemporalComparatorComponent'

storiesOf('TemporalComparatorComponent', module)
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .addDecorator(reactIntl)
  .add('Default', () => (
    <TemporalComparatorComponent onChange={action('onChange')} />
    ))
