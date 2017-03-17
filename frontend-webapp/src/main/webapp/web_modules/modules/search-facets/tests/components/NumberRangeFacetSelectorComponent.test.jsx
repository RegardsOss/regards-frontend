/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import NumberRangeFacetSelectorComponent from '../../src/components/NumberRangeFacetSelectorComponent'
import RangeFacetSelectorComponent from '../../src/components/RangeFacetSelectorComponent'
import styles from '../../src/styles/styles'

const aFacetModel = {
  attributeName: 'MISC_INFO.SPECTATORS_COUNT',
  type: 'NUMERIC',
  values: [
    {
      upperBound: '10',
      count: 8,
      openSearchQuery: 'MISC_INFO.SPECTATORS_COUNT: (*..10)',
    },
    {
      lowerBound: '10',
      upperBound: '500560',
      count: 9,
      openSearchQuery: 'MISC_INFO.SPECTATORS_COUNT: [10..500560)',
    },
    {
      lowerBound: '500560',
      upperBound: '1022136',
      count: 7,
      openSearchQuery: 'MISC_INFO.SPECTATORS_COUNT: [500560..1022136)',
    },
    {
      lowerBound: '1022136',
      upperBound: '1865622',
      count: 7,
      openSearchQuery: 'MISC_INFO.SPECTATORS_COUNT: [1022136..1865622)',
    },
    {
      lowerBound: '1865622',
      upperBound: '3730021',
      count: 8,
      openSearchQuery: 'MISC_INFO.SPECTATORS_COUNT: [1865622..3730021)',
    },
    {
      lowerBound: '3730021',
      upperBound: '5001580',
      count: 9,
      openSearchQuery: 'MISC_INFO.SPECTATORS_COUNT: [3730021..5001580)',
    },
    {
      lowerBound: '5001580',
      upperBound: '6301455',
      count: 8,
      openSearchQuery: 'MISC_INFO.SPECTATORS_COUNT: [5001580:6301455)',
    },
    {
      lowerBound: '6301455',
      upperBound: '8881234',
      count: 8,
      openSearchQuery: 'MISC_INFO.SPECTATORS_COUNT: [6301455..8881234)',
    },
    {
      lowerBound: '8881234',
      upperBound: '10133423',
      count: 7,
      openSearchQuery: 'MISC_INFO.SPECTATORS_COUNT: [8881234..10133423)',
    },
    {
      lowerBound: '10133423',
      count: 9,
      openSearchQuery: 'MISC_INFO.SPECTATORS_COUNT: [10133423..*)',
    },
  ],
}

describe('[SEARCH FACETS] Testing NumberRangeFacetSelectorComponent', () => {
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
    }
    const enzymeWrapper = shallow(<NumberRangeFacetSelectorComponent {...props} />, { context })
    // We assert here that the rendering is delegated to RangeFacetSelectorComponent
    assert.equal(enzymeWrapper.find(RangeFacetSelectorComponent).length, 1, 'Rendering should be delegated to RangeFacetSelectorComponent')
  })
})
