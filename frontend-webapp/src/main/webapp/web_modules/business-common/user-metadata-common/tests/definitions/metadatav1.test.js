/**
 * LICENSE_PLACEHOLDER
 */
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import * as metadatav1 from '../../src/definitions/metadatav1'


// metadata model as returned by server
const modelUser = {
  content: {
    metaData: [{
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
    metadataArray.forEach(({ key, labelKey, editor, mandatory, onlyAtRegistration }) => {
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
    metadataArray.forEach(({ key, labelKey, currentValue, editor, mandatory, onlyAtRegistration }) => {
      assert.isDefined(key, `The metadata key should be defined for ${key}`)
      assert.isDefined(labelKey, `The metadata labelKey should be defined for ${key}`)
      assert.isDefined(editor, `The metadata editor should be defined for ${key}`)
      assert.isDefined(mandatory, `The metadata mandatory field should be defined for ${key}`)
      assert.isDefined(onlyAtRegistration, `The metadata onlyAtRegistration field should be defined for ${key}`)
      // verify value is retrieved in user
      const userMeta = modelUser.content.metaData.find(({ key: modelKey }) => modelKey === key)
      assert.equal(currentValue, userMeta.value, `The metadata value field should be retrieved in user model for ${key}`)
    })
  })
  it('should pack metadata for user from form values', () => {
    // simulating edition
    const editionData = {
      address: '15 rue du Marsupilami',
      country: 'AF',
    }
    const metaDataDTO = metadatav1.packMetaDataField(modelUser, editionData)
    metaDataDTO.forEach(({ id, key, value }) => {
      // 1 - Id should be retrieved from user DTO
      const initialMetaDataDTO = modelUser.content.metaData.find(({ key: initialKey }) => initialKey === key)
      assert.equal(id, initialMetaDataDTO.id, `Id should of meta ${key} be retrived from initial DTO`)
      // 2 - Value should either be the latest edited one or the DTO one if not present in edition data
      if (editionData[key]) {
        assert.equal(value, editionData[key], `Edited value should be used for ${key}`)
      } else {
        assert.equal(value, initialMetaDataDTO.value, `Initial value should be used for ${key}`)
      }
    })
  })
})
