/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import RangeAttributesRender from '../../src/render/RangeAttributesRender'


/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing RangeAttributesRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should render a range value', () => {
    const props = {
      attributes: {
        'test.attribute': {
          lowerBound: 156,
          upperBound: 'test',
        },
      },
    }
    const wrapper = shallow(<RangeAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '156 - test', 'There should be an integer value renderedee')
  })

  it('Should render an empty value', () => {
    const props = {
      attributes: {
        'test.attribute': 'plop',
      },
    }
    const wrapper = shallow(<RangeAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '', 'There should be an empty value rendered')
  })

  it('Should render two ranged values', () => {
    const props = {
      attributes: {
        'test.attribute': {
          lowerBound: 156,
          upperBound: 'test',
        },
        'test.attribute2': {
          lowerBound: 222,
          upperBound: 'other',
        },
      },
    }

    const wrapper = shallow(<RangeAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '156 - test222 - other', 'There should be two range value rendered')
  })
})
