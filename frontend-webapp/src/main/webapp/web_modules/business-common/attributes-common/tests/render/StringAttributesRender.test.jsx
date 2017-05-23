/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import StringAttributesRender from '../../src/render/StringAttributesRender'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing StringAttributesRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should render a string value', () => {
    const props = {
      attributes: {
        'test.attribute': 'render test string',
      },
    }
    const wrapper = shallow(<StringAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, 'render test string', 'There should be a string value rendered')
  })

  it('Should render a string value', () => {
    const props = {
      attributes: {
        'test.attribute': true,
      },
    }
    const wrapper = shallow(<StringAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, 'true', 'There should be a string value rendered')
  })
})
