import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub, spy } from 'sinon'
import Dialog from 'material-ui/Dialog'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { IntlStub } from '@regardsoss/tests-helpers'
import { ThemeCreateComponent } from '../../../src/components/theme/ThemeCreateComponent'

describe('[ADMIN UI MANAGEMENT] Testing theme create component', () => {
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
  it('should exists', () => {
    assert.isDefined(ThemeCreateComponent)
    assert.isDefined(Dialog)
  })

  it('should render a Field', () => {
    const props = {
      open: true,
      onRequestClose: spy(),
      onSubmit: spy(),
      submitting: false,
      invalid: false,
      handleSubmit: spy(),
      reset: spy(),
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
