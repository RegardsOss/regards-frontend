/**
 * LICENSE_PLACEHOLDER
 **/
import { configure } from '@kadira/storybook'

function loadStories() {
  require('./stories/TemporalComparatorComponent')
  require('./stories/TwoTemporalCriteriaSimpleComponent')
  require('./stories/TwoTemporalCriteriaComposedComponent')
  require('./stories/TwoTemporalCriteriaComponent')
}

configure(loadStories, module)

