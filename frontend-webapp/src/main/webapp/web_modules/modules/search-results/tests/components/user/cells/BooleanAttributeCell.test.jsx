/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { IntlStub } from '@regardsoss/tests-helpers'
import Styles from '../../../../src/styles/styles'
import BooleanAttributeCell from '../../../../src/components/user/cells/BooleanAttributeCell'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[RESULTS MODULE] Testing Boolean Table cell renderer', () => {
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

  it('Should render a boolean value', () => {
    const props = {
      attributes: {
        'test.attribute': true,
      },
    }
    const wrapper = shallow(
      <BooleanAttributeCell {...props} />, options,
    )

    const value = wrapper.text()
    assert.equal(value, 'true', 'There should be a boolean value renderedee')
  })

  it('Should render an empty value', () => {
    const props = {
      attributes: {
        'test.attribute': 'plop',
      },
    }
    const wrapper = shallow(
      <BooleanAttributeCell {...props} />, options,
    )

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
    const wrapper = shallow(
      <BooleanAttributeCell {...props} />, options,
    )

    const value = wrapper.text()
    assert.equal(value, 'truefalse', 'There should be two boolean value rendered')
  })
})
