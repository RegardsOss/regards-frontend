/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import Avatar from 'material-ui/Avatar'
import { ObjectLinkedFileTypes } from '@regardsoss/model'
import ThumbmailAttributesRender from '../../src/render/ThumbmailAttributesRender'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing ThumbmailAttributesRender', () => {
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

  it('Should render a Thumbmail value', () => {
    const props = {
      attributes: {
        files: [
          { type: ObjectLinkedFileTypes.THUMBMAIL, uri: 'http://test.fr' },
          { type: ObjectLinkedFileTypes.RAWDATA, uri: 'http://error.fr' },
        ],
      },
      lineHeight: 150,
    }
    const wrapper = shallow(<ThumbmailAttributesRender {...props} />)

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
    const wrapper = shallow(<ThumbmailAttributesRender {...props} />)

    const value = wrapper.find(Avatar)
    assert.lengthOf(value, 0, 'Avatar should not be rendered')
  })
})
