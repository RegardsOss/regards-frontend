/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import { getOpenSearchQuery, getURLQuery } from '../../src/definitions/query/QueriesHelper'

describe('[RESULTS MODULE] Testing QueriesHelper', () => {
  it('Should display correctly the url search with open search query', () => {
    // TODO now wrong, handle navigation level parameters

    const openSearchQuery = getOpenSearchQuery('meta:false', 'mimi-c-mati', [{ openSearchQuery: 'xxxBlblblbl' }], 'kikou')
    assert.equal(openSearchQuery.toQueryString(), 'meta:false AND xxxBlblblbl AND tags:mimi\\-c\\-mati AND tags:kikou', 'Open search query should be correctly generated')

    const urlQuery = getURLQuery(openSearchQuery, [{ attributePath: 'taille', type: 'ascending' }], 'jeveuxlesfacettes=oui')
    assert.equal(urlQuery.toQueryString(),
      'q=(meta:false AND xxxBlblblbl AND tags:mimi\\-c\\-mati AND tags:kikou)&sort=taille,ascending&jeveuxlesfacettes=oui',
      'The URL query be correctly genereted',
    )
  })

  it('Should display correclty the url search with an empty open search query', () => {
    const openSearchQuery = getOpenSearchQuery('')
    assert.equal(openSearchQuery.toQueryString(), '', 'Open search query should be empty')

    const urlQuery = getURLQuery(openSearchQuery, [{ attributePath: 'taille', type: 'ascending' }], 'jeveuxlesfacettes=oui')
    assert.equal(urlQuery.toQueryString(), 'sort=taille,ascending&jeveuxlesfacettes=oui', 'The URL query should be correctly generated without q param')
  })
})

