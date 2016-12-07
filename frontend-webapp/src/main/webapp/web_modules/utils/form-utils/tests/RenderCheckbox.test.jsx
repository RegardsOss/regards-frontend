import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import Checkbox from 'material-ui/Checkbox'
import RenderCheckbox from '../src/RenderCheckbox'

// Test a component rendering
describe('[FORM UTILS] Testing RenderCheckbox', () => {
  it('should exists', () => {
    assert.isDefined(RenderCheckbox)
  })
  it('should retrive the right child', () => {
    const props = {
      label: 'Some label',
      input: {
        name: 'isItInteresting',
        value: false,
        onChange: () => {},
      },
    }
    const enzymeWrapper = shallow(<RenderCheckbox {...props} />)
    const subComponent = enzymeWrapper.find(Checkbox)
    expect(subComponent).to.have.length(1)
  })
})
