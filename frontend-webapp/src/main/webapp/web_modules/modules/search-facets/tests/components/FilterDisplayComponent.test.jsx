/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import FilterDisplayComponent from '../../src/components/FilterDisplayComponent'

import styles from '../../src/styles/styles'

describe('[SEARCH FACETS] Testing FilterDisplayComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FilterDisplayComponent)
  })
  const context = buildTestContext(styles)

  it('should render properly', () => {
    const props = {
      filter: {
        filterLabel: 'any',
        filterKey: 'any',
        openSearchQuery: ' any',
      },
      deleteFilter: () => { },
    }
    // simple render test (nothing static to test here)
    shallow(<FilterDisplayComponent {...props} />, { context })
  })
})
