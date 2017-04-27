/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import NumberRangeFacetSelectorComponent from '../../src/components/NumberRangeFacetSelectorComponent'
import FacetSelectorComponent from '../../src/components/FacetSelectorComponent'
import styles from '../../src/styles/styles'

import facetsNetworkDump from '../network-dump/search-results-dump'

const aFacetModel = facetsNetworkDump.facets[2]

describe('[SEARCH FACETS] Testing NumberRangeFacetSelectorComponent', () => {
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
    assert.isDefined(NumberRangeFacetSelectorComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {
      },
    },
    moduleTheme: styles({}),
  }
  it('should render properly', () => {
    const props = {
      facet: aFacetModel,
      applyFilter: () => { },
    }
    const enzymeWrapper = shallow(<NumberRangeFacetSelectorComponent {...props} />, { context })
    // We assert here that the rendering is correctly delegated to FacetSelectorComponent
    assert.equal(enzymeWrapper.find(FacetSelectorComponent).length, 1, 'Rendering should be delegated to RangeFacetSelectorComponent')
  })
})
