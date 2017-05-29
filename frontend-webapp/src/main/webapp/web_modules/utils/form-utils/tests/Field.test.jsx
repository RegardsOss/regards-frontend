import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Field as ReduxField } from 'redux-form'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import RenderTextFiled from '../src/RenderTextField'
import Field from '../src/Field'

const context = buildTestContext()
// Test a components rendering
describe('[FORM UTILS] Testing FieldWithIntl', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(Field)
  })
  it('should retrieve the right child.', () => {
    const props = {
      name: 'test',
      meta: {
        error: false,
      },
      component: RenderTextFiled,
    }
    const enzymeWrapper = shallow(<Field {...props} />, { context })
    const subComponent = enzymeWrapper.find(ReduxField)
    expect(subComponent).to.have.length(1)
  })
})
