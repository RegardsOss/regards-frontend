import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import SelectField from 'material-ui/SelectField'
import RenderSelectField from '../src/RenderSelectField'

// Test a component rendering
describe('[FORM UTILS] Testing RenderSelectField', () => {
  it('should exists', () => {
    assert.isDefined(RenderSelectField)
  })
  it('should retrive the right child', () => {
    const props = {
      label: 'Some label',
      input: {
        name: 'isItInteresting',
        value: false,
      },
      meta: {
        touched: true,
        error: '',
      },
      children: (<span />),
    }
    const enzymeWrapper = shallow(<RenderSelectField {...props} />)
    const subComponent = enzymeWrapper.find(SelectField)
    expect(subComponent).to.have.length(1)
  })
})
