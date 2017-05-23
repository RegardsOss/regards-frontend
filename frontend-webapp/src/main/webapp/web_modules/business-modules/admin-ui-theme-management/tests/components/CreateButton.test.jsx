import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub, spy } from 'sinon'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import CreateButton from '../../src/components/CreateButton'
import ThemeCreateComponent from '../../src/components/ThemeCreateComponent'

const options = {
  context: buildTestContext(),
}

describe('[ADMIN UI THEME MANAGEMENT] Testing create button component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(CreateButton)
    assert.isDefined(ThemeCreateComponent)
  })

  it('should render a ThemeCreateComponent', () => {
    const props = {
      onCreate: spy(),
    }
    const enzymeWrapper = shallow(<CreateButton {...props} />, options)
    const subComponent = enzymeWrapper.find(ThemeCreateComponent)
    expect(subComponent).to.have.length(1)
  })
})
