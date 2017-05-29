import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import Checkbox from 'material-ui/Checkbox'
import { testSuiteHelpers, buildTestContext} from '@regardsoss/tests-helpers'
import RenderCheckbox from '../src/RenderCheckbox'

const context = buildTestContext()
// Test a components rendering
describe('[FORM UTILS] Testing RenderCheckbox', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

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
      meta: {
        error: "false",
      },
    }
    const enzymeWrapper = shallow(<RenderCheckbox {...props}/>, {context})
    const subComponent = enzymeWrapper.find(Checkbox)
    expect(subComponent).to.have.length(1)
  })
})
