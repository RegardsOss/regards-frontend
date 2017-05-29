/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import BooleanAttributesRender from '../../src/render/BooleanAttributesRender'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing BooleanAttributesRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(BooleanAttributesRender)
  })
  it('Should render a boolean value', () => {
    const props = {
      attributes: {
        'test.attribute': true,
      },
    }
    const wrapper = shallow(<BooleanAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, 'true', 'There should be a boolean value renderedee')
  })

  it('Should render an empty value for a string', () => {
    const props = {
      attributes: {
        'test.attribute': 'plop',
      },
    }
    const wrapper = shallow(<BooleanAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '', 'There should be an empty value rendered')
  })

  it('Should render two boolean values', () => {
    const props = {
      attributes: {
        'test.attribute': true,
        'test.attribute2': false,
      },
    }
    const wrapper = shallow(<BooleanAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, 'truefalse', 'There should be two boolean value rendered')
  })
})
