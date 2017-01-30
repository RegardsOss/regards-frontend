/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import RaisedButton from 'material-ui/RaisedButton'
import { ApplicationLayout } from '@regardsoss/layout'
import FormComponent from '../../../src/components/user/FormComponent'
import Styles from '../../../src/styles/styles'


describe('[FORM MODULE] Testing Form User component', () => {
  const muiTheme = getMuiTheme({})
  const options = {
    context: {
      muiTheme,
      moduleTheme: Styles(muiTheme),
    },
  }
  it('Should render form configured layout with given plugins', () => {
    const handleSearchCallback = sinon.spy()
    const props = {
      handleSearch: handleSearchCallback,
    }

    const wrapper = shallow(
      <FormComponent {...props} />, options,
    )

    const button = wrapper.find(RaisedButton)
    assert.isTrue(wrapper.find(ApplicationLayout).length === 1, 'Form module should render configured layout')
    assert.isTrue(button.length === 1, 'There should be a button to run search')

    assert(handleSearchCallback.notCalled)
    button.simulate('touchTap')
    assert(handleSearchCallback.calledOnce)
  })
})

