import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Field as ReduxField } from 'redux-form'
import Field from '../src/Field'

// Test a component rendering
describe('[FORM UTILS] Testing FieldWithIntl', () => {
  it('should exists', () => {
    assert.isDefined(Field)
  })
  it('should retrive the right child', () => {
    const options = {
      context: {
        i18n: {

        },
      },
    }
    const enzymeWrapper = shallow(<Field />, options)
    const subComponent = enzymeWrapper.find(ReduxField)
    expect(subComponent).to.have.length(1)
  })
})
