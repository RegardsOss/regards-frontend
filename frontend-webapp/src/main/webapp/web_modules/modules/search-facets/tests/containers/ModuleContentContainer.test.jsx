/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { BasicFacetsPageableSelectors } from '@regardsoss/store-utils'
import ModuleContentComponent from '../../src/components/ModuleContentComponent'
import { ModuleContentContainer } from '../../src/containers/ModuleContentContainer'

import styles from '../../src/styles/styles'
import facetsNetworkDump from '../network-dump/search-results-dump'

describe('[SEARCH FACETS] Testing ModuleContentContainer', () => {
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
    assert.isDefined(ModuleContentContainer)
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
      facets: facetsNetworkDump.facets,
      filters: [],
      resultsSelectors: new BasicFacetsPageableSelectors(),
      applyFilter: () => { },
      deleteFilter: () => { },
    }
    const enzymeWrapper = shallow(<ModuleContentContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(ModuleContentComponent).length, 1, 'The corresponding component should be rendered')
  })
})
