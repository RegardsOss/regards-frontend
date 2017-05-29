/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import IntegerAttributesRender from '../../src/render/IntegerAttributesRender'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing IntegerAttributesRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should render an integer value', () => {
    const props = {
      attributes: {
        'test.attribute': 156,
      },
    }
    const wrapper = shallow(<IntegerAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '156', 'There should be an integer value rendered')
  })

  it('Should render an empty value', () => {
    const props = {
      attributes: {
        'test.attribute': 'plop',
      },
    }
    const wrapper = shallow(<IntegerAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '', 'There should be an empty value rendered')
  })

  it('Should render two integer values', () => {
    const props = {
      attributes: {
        'test.attribute': 156,
        'test.attribute2': 568,
      },
    }

    const wrapper = shallow(<IntegerAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '156568', 'There should be two integer value rendered')
  })
})
