/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import RangeAttributesRender from '../../src/render/RangeAttributesRender'


/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing RangeAttributesRender', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })

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

  it('Should render an empty value', () => {
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
