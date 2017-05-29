import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import TextField from 'material-ui/TextField'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import Field from '../../src/Field'
import EnumInputsComponent from '../../src/EnumInputs/EnumInputsComponent'

const context = buildTestContext()
// Test a components rendering
describe('[FORM UTILS] Testing EnumInputsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EnumInputsComponent)
  })
  it('should retrive the right child', () => {
    const props = {
      nbIntialFields: 0,
      inputName: 'somename',
      change: () => {},
    }

    const enzymeWrapper = shallow(<EnumInputsComponent {...props} />, { context })
    const subComponent = enzymeWrapper.find(TextField)
    expect(subComponent).to.have.length(1)
    const subComponentField = enzymeWrapper.find(Field)
    expect(subComponentField).to.have.length(0)
  })
})
