/**
 * LICENSE_PLACEHOLDER
 */
import size from 'lodash/size'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import MenuItem from 'material-ui/MenuItem'
import FacetSelectorComponent from '../../src/components/FacetSelectorComponent'

import styles from '../../src/styles/styles'
import facetsNetworkDump from '../network-dump/search-results-dump'

const aFacetModel = facetsNetworkDump.facets[2]

describe('[SEARCH FACETS] Testing FacetSelectorComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FacetSelectorComponent)
  })
  const context = buildTestContext(styles)

  it('should render properly', () => {
    const props = {
      facet: aFacetModel,
      facetValueFormatterForMenu: () => '',
      facetValueFormatterForFilter: () => '',
      applyFilter: () => { },
    }

    const enzymeWrapper = shallow(<FacetSelectorComponent {...props} />, { context })
    // verify there is one item per facet value
    assert.equal(enzymeWrapper.find(MenuItem).length, size(aFacetModel.values), 'There should be one item for each facet value')
  })
})
