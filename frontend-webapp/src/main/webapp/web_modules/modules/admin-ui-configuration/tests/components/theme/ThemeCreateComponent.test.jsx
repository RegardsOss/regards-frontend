import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import Dialog from 'material-ui/Dialog'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { IntlStub } from '@regardsoss/tests-helpers'
import { ThemeCreateComponent } from '../../../src/components/theme/ThemeCreateComponent'

describe('[ADMIN UI MANAGEMENT] Testing theme create component', () => {
  it('should exists', () => {
    assert.isDefined(ThemeCreateComponent)
    assert.isDefined(Dialog)
  })

  it('should render a Field', () => {
    const props = {
      open: true,
      onRequestClose: sinon.spy(),
      onSubmit: sinon.spy(),
      submitting: sinon.spy(),
      invalid: sinon.spy(),
      handleSubmit: sinon.spy(),
      reset: sinon.spy(),
    }
    const options = {
      context: {
        muiTheme: getMuiTheme(),
        intl: IntlStub,
      },
    }
    const enzymeWrapper = shallow(<ThemeCreateComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Dialog)
    expect(subComponent).to.have.length(1)
  })
})
