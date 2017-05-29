import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import TextField from 'material-ui/TextField'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import RenderTextField from '../src/RenderTextField'

// Test a components rendering
describe('[FORM UTILS] Testing RenderSelectField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RenderTextField)
  })
  it('should retrive the right child', () => {
    const props = {
      label: 'Some label',
      input: {
        name: 'isItInteresting',
        value: 'test',
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
