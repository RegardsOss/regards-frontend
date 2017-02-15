/**
 * LICENSE_PLACEHOLDER
 **/
import { configure } from '@kadira/storybook'

function loadStories() {
  require('./stories/NumericalComparatorComponent')
  require('./stories/NumericalCriteriaComponent')
}

configure(loadStories, module)

