import { storiesOf } from '@kadira/storybook'
import { withKnobs, text, select } from '@kadira/storybook-addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
import { CardActionsComponent } from '@regardsoss/components'

storiesOf('Generic components - Card Actions', module)
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .add('main button', () => {
    const mainButtonText = text('Main button text', 'Main button')
    return (
      <CardActionsComponent
        mainButtonLabel={mainButtonText}
        mainButtonUrl="#"
      />
    )
  })
  .add('main button & secondary button', () => {
    const mainButtonText = text('Main button text', 'Main button')
    const secondaryButtonText = text('Secondary button text', 'Secondary button')
    return (
      <CardActionsComponent
        mainButtonLabel={mainButtonText}
        mainButtonUrl="#"
        secondaryButtonLabel={secondaryButtonText}
        secondaryButtonUrl="#"
      />
    )
  })
