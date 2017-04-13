/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import UrlAttributesRender from '../../src/render/UrlAttributesRender'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing UrlAttributesRender', () => {
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

  it('Should render an url html link', () => {
    const props = {
      attributes: {
        'test.attribute': 'http://plop.test',
      },
    }
    const wrapper = shallow(<UrlAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, 'http://plop.test', 'There should be an url value rendered')

    const link = wrapper.find('a')
    assert.lengthOf(link, 1, 'There should be an html link rendered')
  })
})
