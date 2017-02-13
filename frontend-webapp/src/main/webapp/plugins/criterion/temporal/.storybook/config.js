/**
 * LICENSE_PLACEHOLDER
 **/
import { configure } from '@kadira/storybook'

function loadStories() {
  require('./stories/TemporalComparatorComponent')
  require('./stories/TemporalCriteriaComponent')
}

configure(loadStories, module)

