/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Avatar from 'material-ui/Avatar'
import { ObjectLinkedFileTypes } from '@regardsoss/model'
import ThumbnailAttributesRender from '../../src/render/ThumbnailAttributesRender'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing ThumbmailAttributesRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should render a Thumbmail value', () => {
    const props = {
      attributes: {
        files: [
          { type: ObjectLinkedFileTypes.THUMBNAIL, uri: 'http://test.fr' },
          { type: ObjectLinkedFileTypes.RAWDATA, uri: 'http://error.fr' },
        ],
      },
      lineHeight: 150,
    }
    const wrapper = shallow(<ThumbnailAttributesRender {...props} />)

    const value = wrapper.find(Avatar)
    assert.lengthOf(value, 1, 'There should be one Avatar rendered')
  })

  it('Should render an empty value', () => {
    const props = {
      attributes: {
        files: [
          { type: ObjectLinkedFileTypes.RAWDATA, uri: 'http://test.fr' },
          { type: ObjectLinkedFileTypes.RAWDATA, uri: 'http://error.fr' },
        ],
      },
      lineHeight: 150,
    }
    const wrapper = shallow(<ThumbnailAttributesRender {...props} />)

    const value = wrapper.find(Avatar)
    assert.lengthOf(value, 0, 'Avatar should not be rendered')
  })
})
