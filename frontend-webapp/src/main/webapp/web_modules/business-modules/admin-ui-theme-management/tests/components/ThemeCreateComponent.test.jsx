import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { spy } from 'sinon'
import Dialog from 'material-ui/Dialog'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { ThemeCreateComponent } from '../../src/components/ThemeCreateComponent'

describe('[ADMIN UI THEME MANAGEMENT] Testing theme create component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

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
      context: buildTestContext(),
    }
    const enzymeWrapper = shallow(<ThemeCreateComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Dialog)
    expect(subComponent).to.have.length(1)
  })
})
