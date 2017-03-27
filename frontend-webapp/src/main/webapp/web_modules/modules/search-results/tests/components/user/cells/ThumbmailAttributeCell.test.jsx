/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Avatar from 'material-ui/Avatar'
import { IntlStub } from '@regardsoss/tests-helpers'
import { ObjectLinkedFileTypes } from '@regardsoss/model'
import Styles from '../../../../src/styles/styles'
import ThumbmailCell from '../../../../src/components/user/cells/ThumbmailCell'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[RESULTS MODULE] Testing Thumbmail Table cell renderer', () => {
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
  const muiTheme = getMuiTheme({})
  const options = {
    context: {
      muiTheme,
      moduleTheme: Styles(muiTheme),
      intl: IntlStub,
    },
  }

  it('Should render a Thumbmail value', () => {
    const props = {
      attributes: {
        files: [
          { type: ObjectLinkedFileTypes.THUMBMAIL, uri: 'http://test.fr' },
          { type: ObjectLinkedFileTypes.RAWDATA, uri: 'http://error.fr' },
        ],
      },
      lineHeight: 150
    }
    const wrapper = shallow(
      <ThumbmailCell {...props} />, options,
    )

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
        lineHeight: 150
      },
    }
    const wrapper = shallow(
      <ThumbmailCell {...props} />, options,
    )

    const value = wrapper.find(Avatar)
    assert.lengthOf(value, 0, 'Avatar should not be rendered')
  })
})
