/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import metadatav1 from '../../src/definitions/metadatav1'

// metadata model as returned by server
const modelUser = {
  content: {
    metadata: [{
      id: 1,
      key: 'address',
      value: '10 rue des Schtroumpf',
    }, {
      id: 2,
      key: 'country',
      value: 'FR',
    }, {
      id: 3,
      key: 'organization',
      value: 'Ninja... Ninja!',
    }, {
      id: 4,
      key: 'reason',
      value: 'To have a secret look!',
    }],
  },
}

describe('[User Metadata Common] Testing metadatav1', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(metadatav1)
  })

  // test that each known metadata model is correctly rendered
  it('should return metadata models with user', () => {
    const metadataArray = metadatav1.getMetadataArray()
    assert.isAbove(metadataArray.length, 0, 'The metadata array should not be empty')
    metadataArray.forEach(({
      key, labelKey, editor, mandatory, onlyAtRegistration,
    }) => {
      assert.isDefined(key, `The metadata key should be defined for ${key}`)
      assert.isDefined(labelKey, `The metadata labelKey should be defined for ${key}`)
      assert.isDefined(editor, `The metadata editor should be defined for ${key}`)
      assert.isDefined(mandatory, `The metadata mandatory field should be defined for ${key}`)
      assert.isDefined(onlyAtRegistration, `The metadata onlyAtRegistration field should be defined for ${key}`)
    })
  })
  it('should retrieve metadata values in user', () => {
    const metadataArray = metadatav1.getMetadataArray(modelUser)
    assert.isAbove(metadataArray.length, 0, 'The metadata array should not be empty')
    metadataArray.forEach(({
      key, labelKey, currentValue, editor, mandatory, onlyAtRegistration,
    }) => {
      assert.isDefined(key, `The metadata key should be defined for ${key}`)
      assert.isDefined(labelKey, `The metadata labelKey should be defined for ${key}`)
      assert.isDefined(editor, `The metadata editor should be defined for ${key}`)
      assert.isDefined(mandatory, `The metadata mandatory field should be defined for ${key}`)
      assert.isDefined(onlyAtRegistration, `The metadata onlyAtRegistration field should be defined for ${key}`)
      // verify value is retrieved in user
      const userMeta = modelUser.content.metadata.find(({ key: modelKey }) => modelKey === key)
      assert.equal(currentValue, userMeta.value, `The metadata value field should be retrieved in user model for ${key}`)
    })
  })
  it('should pack metadata for user from form values', () => {
    // simulating edition
    const editionData = {
      address: '15 rue du Marsupilami',
      country: 'AF',
    }
    const metadataDTO = metadatav1.packMetadataField(modelUser, editionData)
    metadataDTO.forEach(({ id, key, value }) => {
      // 1 - Id should be retrieved from user DTO
      const initialMetadataDTO = modelUser.content.metadata.find(({ key: initialKey }) => initialKey === key)
      assert.equal(id, initialMetadataDTO.id, `Id should of meta ${key} be retrived from initial DTO`)
      // 2 - Value should either be the latest edited one or the DTO one if not present in edition data
      if (editionData[key]) {
        assert.equal(value, editionData[key], `Edited value should be used for ${key}`)
      } else {
        assert.equal(value, initialMetadataDTO.value, `Initial value should be used for ${key}`)
      }
    })
  })
})
