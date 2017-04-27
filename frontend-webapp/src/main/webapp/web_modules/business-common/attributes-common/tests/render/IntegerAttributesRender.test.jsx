/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import IntegerAttributesRender from '../../src/render/IntegerAttributesRender'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing IntegerAttributesRender', () => {
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

  it('Should render an empty value', () => {
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
