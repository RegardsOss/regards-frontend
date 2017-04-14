/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import BooleanAttributesRender from '../../src/render/BooleanAttributesRender'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing BooleanAttributesRender', () => {
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

  it('Should render an empty value', () => {
    const props = {
      attributes: {
        'test.attribute': 'plop',
      },
    }
    const wrapper = shallow(<BooleanAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '', 'There should be an empty value rendered')
  })

  it('Should render an empty value', () => {
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
