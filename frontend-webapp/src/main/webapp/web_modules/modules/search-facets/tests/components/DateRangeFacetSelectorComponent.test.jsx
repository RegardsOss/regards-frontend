/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import DateRangeFacetSelectorComponent from '../../src/components/DateRangeFacetSelectorComponent'
import FacetSelectorComponent from '../../src/components/FacetSelectorComponent'

import styles from '../../src/styles/styles'
import facetsNetworkDump from '../network-dump/search-results-dump'

const aFacetModel = facetsNetworkDump.facets[1]

describe('[SEARCH FACETS] Testing DateRangeFacetSelectorComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DateRangeFacetSelectorComponent)
  })
  const context = buildTestContext(styles)

  it('should render properly', () => {
    const props = {
      facet: aFacetModel,
      applyFilter: () => { },
    }
    const enzymeWrapper = shallow(<DateRangeFacetSelectorComponent {...props} />, { context })
    // We assert here that the rendering is correctly delegated to FacetSelectorComponent
    assert.equal(enzymeWrapper.find(FacetSelectorComponent).length, 1, 'Rendering should be delegated to RangeFacetSelectorComponent')
  })
})
