import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub, spy } from 'sinon'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { HateoasIconAction } from '@regardsoss/display-control'
import DeleteButton from '../../src/components/DeleteButton'

const options = {
  context: buildTestContext(),
}

describe('[ADMIN UI THEME MANAGEMENT] Testing delete button component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DeleteButton)
    assert.isDefined(HateoasIconAction)
  })

  it('should render a ThemeCreateComponent', () => {
    const props = {
      onDelete: spy(),
      entityHateoasLinks: [],
    }
    const enzymeWrapper = shallow(<DeleteButton {...props} />, options)
    const subComponent = enzymeWrapper.find(HateoasIconAction)
    expect(subComponent).to.have.length(1)
  })
})
