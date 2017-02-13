/**
 * LICENSE_PLACEHOLDER
 **/
import { configure } from '@kadira/storybook'

function loadStories() {
  require('./stories/NumericalComparatorComponent')
  require('./stories/TwoNumericalCriteriaSimpleComponent')
  require('./stories/TwoNumericalCriteriaComposedComponent')
  require('./stories/TwoNumericalCriteriaComponent')
}

configure(loadStories, module)

