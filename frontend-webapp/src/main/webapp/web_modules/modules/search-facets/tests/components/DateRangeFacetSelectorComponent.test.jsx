/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import DateRangeFacetSelectorComponent from '../../src/components/DateRangeFacetSelectorComponent'
import RangeFacetSelectorComponent from '../../src/components/RangeFacetSelectorComponent'

import styles from '../../src/styles/styles'
import facetsNetworkDump from '../network-dump/search-results-dump'

const aFacetModel = facetsNetworkDump.facets[1]

describe('[SEARCH FACETS] Testing DateRangeFacetSelectorComponent', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(DateRangeFacetSelectorComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {
      },
    },
    moduleTheme: styles({}),
  }
  // TODO test some rendering
  it('should render properly', () => {
    const props = {
      facet: aFacetModel,
    }
    const enzymeWrapper = shallow(<DateRangeFacetSelectorComponent {...props} />, { context })
    // We assert here that the rendering is delegated to RangeFacetSelectorComponent
    assert.equal(enzymeWrapper.find(RangeFacetSelectorComponent).length, 1, 'Rendering should be delegated to RangeFacetSelectorComponent')
  })
})
