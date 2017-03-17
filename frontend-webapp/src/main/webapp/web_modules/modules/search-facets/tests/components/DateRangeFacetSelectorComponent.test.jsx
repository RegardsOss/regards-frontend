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

const aFacetModel = {
  attributeName: 'MISC_INFO.PUBLICATION_DATE',
  type: 'DATE',
  values: [
    {
      lowerBound: null,
      upperBound: '1960-04-30T18:20:02.056',
      count: 8,
      openSearchQuery: 'MISC_INFO.PUBLICATION_DATE: (*..1960-04-30T18:20:02.056)',
    },
    {
      lowerBound: '1960-04-30T18:20:02.056',
      upperBound: '1972-04-30T01:00:00.000',
      count: 9,
      openSearchQuery: 'MISC_INFO.PUBLICATION_DATE: [1960-04-30T18:20:02.056..1972-04-30T01:00:00.000)',
    },
    {
      lowerBound: '1972-04-30T01:00:00.000',
      upperBound: '1982-06-22T06:45:30.000',
      count: 7,
      openSearchQuery: 'MISC_INFO.PUBLICATION_DATE: [1972-04-30T01:00:00.000..1982-06-22T06:45:30.000)',
    },
    {
      lowerBound: '1982-06-22T06:45:30.033',
      upperBound: '1988-09-11T06:45:30.428',
      count: 7,
      openSearchQuery: 'MISC_INFO.PUBLICATION_DATE: [1982-06-22T06:45:30.033..1988-09-11T06:45:30.428)',
    },
    {
      lowerBound: '1988-09-11T06:45:30.428',
      upperBound: '1995-03-04T08:10:00.998',
      count: 8,
      openSearchQuery: 'MISC_INFO.PUBLICATION_DATE: [1988-09-11T06:45:30.428..1995-03-04T08:10:00.998)',
    },
    {
      lowerBound: '1995-03-04T08:10:00.998',
      upperBound: '1999-11-09T06:10:00.152',
      count: 9,
      openSearchQuery: 'MISC_INFO.PUBLICATION_DATE: [1995-03-04T08:10:00.998..1999-11-09T06:10:00.152)',
    },
    {
      lowerBound: '1999-11-09T06:10:00.152',
      upperBound: '2002-09-21T01:00:00.000',
      count: 8,
      openSearchQuery: 'MISC_INFO.PUBLICATION_DATE: [1999-11-09T06:10:00.152..2002-09-21T01:00:00.00)',
    },
    {
      lowerBound: '2004-04-01T05:38:22.025',
      upperBound: '2006-01-01T00:30:12.038',
      count: 8,
      openSearchQuery: 'MISC_INFO.PUBLICATION_DATE: [2004-04-01T05:38:22.025..2006-01-01T00:30:12.038)',
    },
    {
      lowerBound: '2006-01-01T00:30:12.038',
      upperBound: '2009-02-28T11:59:59.999',
      count: 7,
      openSearchQuery: 'MISC_INFO.PUBLICATION_DATE: [2006-01-01T00:30:12.038..2009-02-28T11:59:59.999)',
    },
    {
      lowerBound: '2009-02-28T11:59:59.999',
      upperBound: null,
      count: 9,
      openSearchQuery: 'MISC_INFO.PUBLICATION_DATE: [2009-02-28T11:59:59.999..*)',
    },
  ],
}

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
