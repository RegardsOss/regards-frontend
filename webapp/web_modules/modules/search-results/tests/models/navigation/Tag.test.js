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
import { TAG_TYPES_ENUM } from '@regardsoss/domain/catalog'
import { Tag } from '../../../src/models/navigation/Tag'


const tags = [
  new Tag(TAG_TYPES_ENUM.COLLECTION, 'a collection', 'URN:COLLECTION:1'),
  new Tag(TAG_TYPES_ENUM.DATASET, 'a dataset', 'URN:DATASET:1'),
  new Tag(TAG_TYPES_ENUM.WORD, 'a word', 'a word'),
]

const paramValue = 'URN:COLLECTION:1,URN:DATASET:1,a word'

/**
* Test  Component name
* @author Raphaël Mechali
*/
describe('[Search Results] Testing Tag model and utils', () => {
  it('should exists', () => {
    assert.isDefined(Tag)
  })
  it('should export URL value correctly', () => {
    assert.equal(Tag.toURLParameterValue(tags), paramValue, 'URL parameter value (not encoded) should be built from search keys in tags')
  })
  it('should parse tags from URL value correctly', () => {
    assert.deepEqual(Tag.fromURLParameterValue(paramValue), tags.map(t => t.searchKey), 'Tags should be correctly parsed from URL parameter value')
  })
  it('should call resolve entities and auto resolve simple tags', () => {
    const testData = [
      {
        key: 'URN:COLLECTION1',
        shouldCallFetcher: true,
      },
      {
        key: 'URN:D1',
        shouldCallFetcher: true,
      },
      {
        key: 'Simple word',
        shouldCallFetcher: false,
      },
      {
        key: 'urn/d',
        shouldCallFetcher: false,
      },
    ]

    testData.forEach(({ key, shouldCallFetcher }) => {
      let called = false
      const spyFetch = () => {
        called = true
        return new Promise((resolve, reject) => { })
      }
      Tag.getTagPromise(spyFetch, key)
      assert.equal(called, shouldCallFetcher, 'It did call / not call on error')
    })

    //assert.equal(Tag.fromURLParameterValue(paramValue), tags, 'Tags should be correctly rebuilt from URL parameter value')
  })
})
