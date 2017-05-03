/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { metadataV1 } from '../../src/definitions/metadatav1'
import MetadataField from '../../src/components/MetadataField'

const context = buildTestContext()

describe('[User Metadata Common] Testing MetadataField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MetadataField)
  })

  // test that each known metadata model is correctly rendered
  metadataV1.forEach(metadata => it(`should render a field properly for ${metadata.key}`, () => {
    const props = {
      metadata,
    }
    const metadataWrapper = shallow(<MetadataField {...props} />, { context })
    const fieldWrapper = metadataWrapper.find(Field)
    assert.lengthOf(fieldWrapper, 1, 'There should be a display field')
    assert.equal(fieldWrapper.props().name, metadata.key, 'The field should use metadata key as name, so that using form can retrieve value')
  }))
})
