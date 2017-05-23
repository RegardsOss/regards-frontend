/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { LinkComponent } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import UrlAttributesRender from '../../src/render/UrlAttributesRender'

const options = {
  context: buildTestContext(),
}

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing UrlAttributesRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should render an url html link', () => {
    const props = {
      attributes: {
        'test.attribute': 'http://plop.test',
      },
    }
    const wrapper = shallow(<UrlAttributesRender {...props} />, options)

    const link = wrapper.find(LinkComponent)
    assert.lengthOf(link, 1, 'There should be a LinkComponent rendered')

    const linkWrapper = link.dive(options)
    const linkHref = linkWrapper.find('a')
    const value = linkHref.text()
    assert.equal(value, 'http://plop.test', 'Error rendering href link')
    assert.lengthOf(linkHref, 1, 'There should be an html link rendered')
  })
})
