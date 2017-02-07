import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, onChange, object } from '@kadira/storybook-addon-knobs'
import { BoardComponent, BaseBoardItemComponent } from '@regardsoss/components'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeDecorator } from '../utils/decorators'
import NumericalCriteriaComponent from '../../../plugins/criterion/numerical/src/components/NumericalCriteriaComponent'
import NumericalComparatorComponent from '../../../plugins/criterion/numerical/src/components/NumericalComparatorComponent'

storiesOf('Plugins', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('Criterion - Numerical', () => {
    const themeName = addLocaleAndThemeSelectors()
    const attributes = object('Attributes', {
      searchField: {
        name: 'searchField',
        description: 'Attribute to search',
        type: 'numerical',
      },
    })
    return (
      <ThemeDecorator theme={themeName}>
        <NumericalCriteriaComponent attributes={attributes} onChange={action('onChange')} pluginInstanceId={42} />
      </ThemeDecorator>
    )
  })
  .add('Criterion - Numerical comparator', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeDecorator theme={themeName}>
        <NumericalComparatorComponent onChange={action('onChange')} />
      </ThemeDecorator>
    )
  })
