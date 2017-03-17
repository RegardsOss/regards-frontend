/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import WordFacetSelectorComponent from '../../src/components/WordFacetSelectorComponent'

import styles from '../../src/styles/styles'

const aFacetModel = {
  attributeName: 'default.FORMAT',
  type: 'STRING',
  values: [
    {
      word: 'vhs',
      count: 6,
      openSearchQuery: 'default.FORMAT:vhs',
    },
    {
      word: 'dvd',
      count: 9,
      openSearchQuery: 'default.FORMAT:dvd',
    },
    {
      word: 'blueray',
      count: 66,
      openSearchQuery: 'default.FORMAT:blueray',
    },
  ],
}

describe('[SEARCH FACETS] Testing WordFacetSelectorComponent', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => { throw new Error(warning) })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(WordFacetSelectorComponent)
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
    }
    const enzymeWrapper = shallow(<WordFacetSelectorComponent {...props} />, { context })
    // TODO something like that
    // assert.equal(enzymeWrapper.find(AComponent).length, ALENGTH)
    // TODO or something like that
    // assert.isFalse(enzymeWrapper.find(AComponent).props().isLoading, 'Loading should be false')
  })
})
