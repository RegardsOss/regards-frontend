/**
 * LICENSE_PLACEHOLDER
 */
import size from 'lodash/size'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import MenuItem from 'material-ui/MenuItem'
import FacetSelectorComponent from '../../src/components/FacetSelectorComponent'

import styles from '../../src/styles/styles'
import facetsNetworkDump from '../network-dump/search-results-dump'

const aFacetModel = facetsNetworkDump.facets[2]

describe('[SEARCH FACETS] Testing FacetSelectorComponent', () => {
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
    assert.isDefined(FacetSelectorComponent)
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
      facetValueFormatter: () => '',
      applyFilter: () => { },
    }

    const enzymeWrapper = shallow(<FacetSelectorComponent {...props} />, { context })
    // verify there is one item per facet value
    assert.equal(enzymeWrapper.find(MenuItem).length, size(aFacetModel.values), 'There should be on item for each facet value')
  })
})
