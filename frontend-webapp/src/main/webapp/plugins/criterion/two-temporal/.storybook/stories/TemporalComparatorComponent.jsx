/**
 * LICENSE_PLACEHOLDER
 **/
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
import TemporalComparatorComponent from '../../src/components/TemporalComparatorComponent'

storiesOf('TemporalComparatorComponent', module)
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .add('Default', () => (
    <TemporalComparatorComponent onChange={action('onChange')} />
    ))
