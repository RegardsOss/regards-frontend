/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { Stepper } from 'material-ui/Stepper'
import CollectionStepperComponent from '../../src/components/CollectionStepperComponent'

describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing CollectionStepperComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CollectionStepperComponent)
  })
  const context = buildTestContext()

  it('Render properly', () => {
    const props = {}
    const enzymeWrapper = shallow(<CollectionStepperComponent {...props} />, { context })
    expect(enzymeWrapper.find(Stepper)).to.have.length(1)
  })
})
