import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import Field from '../../src/Field'
import EnumInputsComponent from '../../src/EnumInputs/EnumInputsComponent'
import TextField from 'material-ui/TextField'

// Test a components rendering
describe('[FORM UTILS] Testing EnumInputsComponent', () => {
  it('should exists', () => {
    assert.isDefined(EnumInputsComponent)
  })
  it('should retrive the right child', () => {
    const options = {
      context: {
        i18n: {

        },
      },
    }
    const props = {
      nbIntialFields: 0,
      inputName: 'somename',
      change: () => {},
    }

    const enzymeWrapper = shallow(<EnumInputsComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(TextField)
    expect(subComponent).to.have.length(1)
    const subComponentField = enzymeWrapper.find(Field)
    expect(subComponentField).to.have.length(0)
  })
})
