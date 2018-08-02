/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { assert } from 'chai'
import { TableSortOrders } from '@regardsoss/components'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import QueriesHelper from '../../src/definitions/QueriesHelper'

/**
 * Queries helper test
 * @author Raphaël Mechali
 */
describe('[Search Results] Testing QueriesHelper', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should display correctly the url search with open search query', () => {
    const openSearchQuery = QueriesHelper.getOpenSearchQuery(
      'meta:false', // root query
      [{ value: { openSearchQuery: 'anyBlblblbl' } }], // selected facets
      [QueriesHelper.getDatasetIdParameter('mimi-c-mati')],
    ) // other parameters
    assert.equal(openSearchQuery.toQueryString(), 'meta:false AND anyBlblblbl AND tags:"mimi-c-mati"', 'Open search query should be correctly generated')

    const urlQuery = QueriesHelper.getURLQuery(
      openSearchQuery.toQueryString(), // open search query
      [{ // sorting array
        attributePath: 'taille',
        type: TableSortOrders.ASCENDING_ORDER,
      }], [{ // requested facets
        attributes: [{ name: 'attr1' }],
      }, {
        attributes: [{ name: 'attr2' }],
      }], 'jeveuxlesquicklooks=oui')
    assert.equal(
      urlQuery.toQueryString(),
      'q=(meta:false AND anyBlblblbl AND tags:"mimi-c-mati")&sort=taille,ASC&facets=attr1,attr2&jeveuxlesquicklooks=oui',
      'The URL query be correctly genereted',
    )
  })

  it('Should display correclty the url search with an empty open search query', () => {
    const openSearchQuery = QueriesHelper.getOpenSearchQuery('')
    assert.equal(openSearchQuery.toQueryString(), '', 'Open search query should be empty')

    const urlQuery = QueriesHelper.getURLQuery(openSearchQuery.toQueryString(),
      [{ attributePath: 'taille', type: TableSortOrders.DESCENDING_ORDER }], [], 'jeveuxlesfacettes=oui')
    assert.equal(urlQuery.toQueryString(), 'sort=taille,DESC&jeveuxlesfacettes=oui', 'The URL query should be correctly generated without q param')
  })
})

