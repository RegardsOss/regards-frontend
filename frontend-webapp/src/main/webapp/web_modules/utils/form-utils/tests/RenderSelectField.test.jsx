import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import RenderSelectField from '../src/RenderSelectField'

// Test a components rendering
describe('[FORM UTILS] Testing RenderSelectField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RenderSelectField)
  })
  it('should retrieve the right child', () => {
    const props = {
      label: 'Some label',
      input: {
        name: 'isItInteresting',
        value: 'value1',
      },
      meta: {
        touched: true,
        error: '',
      },
      children: [<MenuItem key="0" value="value0" />, <MenuItem key="1" value="value1" />],
    }
    const enzymeWrapper = shallow(<RenderSelectField {...props} />)
    const subComponent = enzymeWrapper.find(SelectField)
    expect(subComponent).to.have.length(1)
  })
})
