/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import { getOpenSearchQuery, getURLQuery, getDatasetIpIdParameter } from '../../../src/definitions/query/QueriesHelper'

describe('[Search Results] Testing QueriesHelper', () => {
  it('Should display correctly the url search with open search query', () => {
    // TODO now wrong, handle navigation level parameters

    const openSearchQuery = getOpenSearchQuery('meta:false', // root query
      [{ openSearchQuery: 'xxxBlblblbl' }], // facettes selected
      [getDatasetIpIdParameter('mimi-c-mati')]) // other parameters
    assert.equal(openSearchQuery.toQueryString(), 'meta:false AND xxxBlblblbl AND tags:mimi\\-c\\-mati', 'Open search query should be correctly generated')

    const urlQuery = getURLQuery(openSearchQuery, [{ attributePath: 'taille', type: 'ascending' }], 'jeveuxlesfacettes=oui')
    assert.equal(urlQuery.toQueryString(),
      'q=(meta:false AND xxxBlblblbl AND tags:mimi\\-c\\-mati)&sort=taille,ascending&jeveuxlesfacettes=oui',
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

