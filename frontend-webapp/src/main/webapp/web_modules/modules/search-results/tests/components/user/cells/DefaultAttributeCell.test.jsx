/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { IntlStub } from '@regardsoss/tests-helpers'
import Styles from '../../../../src/styles/styles'
import DefaultCell from '../../../../src/components/user/cells/DefaultCell'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[RESULTS MODULE] Testing Default string Table cell renderer', () => {
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

  it('Should render a string value', () => {
    const props = {
      attributes: {
        'test.attribute': 'render test string',
      },
    }
    const wrapper = shallow(
      <DefaultCell {...props} />, options,
    )

    const value = wrapper.text()
    assert.equal(value, 'render test string', 'There should be a string value rendered')
  })

  it('Should render a string value', () => {
    const props = {
      attributes: {
        'test.attribute': true,
      },
    }
    const wrapper = shallow(
      <DefaultCell {...props} />, options,
    )

    const value = wrapper.text()
    assert.equal(value, 'true', 'There should be a string value rendered')
  })
})
