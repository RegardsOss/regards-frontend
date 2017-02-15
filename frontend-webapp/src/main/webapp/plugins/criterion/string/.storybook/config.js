/**
 * LICENSE_PLACEHOLDER
 **/
import { configure } from '@kadira/storybook'

function loadStories() {
  require('./stories/StringCriteriaComponent')
}

configure(loadStories, module)

