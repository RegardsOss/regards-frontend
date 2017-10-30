/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import { TableSortOrders } from '@regardsoss/components'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { getOpenSearchQuery, getURLQuery, getDatasetIpIdParameter } from '../../src/definitions/QueriesHelper'

describe('[Search Results] Testing QueriesHelper', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should display correctly the url search with open search query', () => {
    const openSearchQuery = getOpenSearchQuery('meta:false', // root query
      [{ openSearchQuery: 'anyBlblblbl' }], // facettes selected
      [getDatasetIpIdParameter('mimi-c-mati')]) // other parameters
    assert.equal(openSearchQuery.toQueryString(), 'meta:false AND anyBlblblbl AND tags:"mimi-c-mati"', 'Open search query should be correctly generated')

    const urlQuery = getURLQuery(openSearchQuery.toQueryString(), [{ attributePath: 'taille', type: TableSortOrders.ASCENDING_ORDER }], 'jeveuxlesfacettes=oui')
    assert.equal(urlQuery.toQueryString(),
      'q=(meta:false AND anyBlblblbl AND tags:"mimi-c-mati")&sort=taille,ASC&jeveuxlesfacettes=oui',
      'The URL query be correctly genereted',
    )
  })

  it('Should display correclty the url search with an empty open search query', () => {
    const openSearchQuery = getOpenSearchQuery('')
    assert.equal(openSearchQuery.toQueryString(), '', 'Open search query should be empty')

    const urlQuery = getURLQuery(openSearchQuery.toQueryString(), [{ attributePath: 'taille', type: TableSortOrders.DESCENDING_ORDER }], 'jeveuxlesfacettes=oui')
    assert.equal(urlQuery.toQueryString(), 'sort=taille,DESC&jeveuxlesfacettes=oui', 'The URL query should be correctly generated without q param')
  })
})

