/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub, spy } from 'sinon'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import RaisedButton from 'material-ui/RaisedButton'
import { Container } from '@regardsoss/layout'
import FormComponent from '../../../src/components/user/FormComponent'
import Styles from '../../../src/styles/styles'

/**
 * Tests form FomComponent
 * @author Sébastien binda
 */
describe('[FORM MODULE] Testing Form User component', () => {
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
    },
  }
  it('Should render form configured layout with given plugins', () => {
    const handleSearchCallback = spy()
    const props = {
      description: 'Test',
      layout: {
        id: 'main',
        type: 'type',
      },
      handleSearch: handleSearchCallback,
    }

    const wrapper = shallow(
      <FormComponent {...props} />, options,
    )

    const button = wrapper.find(RaisedButton)
    assert.isTrue(wrapper.find(Container).length === 1, 'Form module should render configured layout')
    assert.isTrue(button.length === 1, 'There should be a button to run search')

    assert(handleSearchCallback.notCalled)
    button.simulate('touchTap')
    assert(handleSearchCallback.calledOnce)
  })
})

