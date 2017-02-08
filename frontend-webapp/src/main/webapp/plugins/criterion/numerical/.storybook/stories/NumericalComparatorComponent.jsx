import { storiesOf, addDecorator, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
// import { StoreDecorator, addLocaleAndThemeSelectors, ThemeDecorator } from '../../../../../.storybook/stories/utils/decorators'
import NumericalComparatorComponent from '../../src/components/NumericalComparatorComponent'

storiesOf('NumericalComparatorComponent', module)
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .add('Default', () => {
    return (
      <NumericalComparatorComponent onChange={action('onChange')}/>
    )
  })
