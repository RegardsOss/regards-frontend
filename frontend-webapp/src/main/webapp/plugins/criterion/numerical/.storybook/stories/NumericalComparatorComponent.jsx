/**
 * LICENSE_PLACEHOLDER
 **/
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
import NumericalComparatorComponent from '../../src/components/NumericalComparatorComponent'

storiesOf('NumericalComparatorComponent', module)
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .add('Default', () => (
    <NumericalComparatorComponent onChange={action('onChange')} />
    ))
