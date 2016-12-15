import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import TextField from 'material-ui/TextField'
import RenderTextField from '../src/RenderTextField'

// Test a components rendering
describe('[FORM UTILS] Testing RenderSelectField', () => {
  it('should exists', () => {
    assert.isDefined(RenderTextField)
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
      fullWidth: true,
      type: 'password',
      intl: {
        formatMessage: () => {},
      },
    }
    const enzymeWrapper = shallow(<RenderTextField {...props} />)
    const subComponent = enzymeWrapper.find(TextField)
    expect(subComponent).to.have.length(1)
  })
})
