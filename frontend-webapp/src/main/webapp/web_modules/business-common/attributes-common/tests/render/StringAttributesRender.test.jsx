/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import StringAttributesRender from '../../src/render/StringAttributesRender'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing StringAttributesRender', () => {
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
