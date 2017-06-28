/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { Stepper } from 'material-ui/Stepper'
import { DatasetStepperContainer } from '../../src/containers/DatasetStepperContainer'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetStepperComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetStepperContainer)
  })
  it('Render properly', () => {
    const props = {
      stepIndex: 1,
      currentDatasetIpId: 'URN:AIP:DATASET:project1:40b703e9-e463-4821-8c4b-f77e2f7be8b6:V1',
      currentDatasetId: '503',
      projectName: 'project1',
    }
    const enzymeWrapper = shallow(<DatasetStepperContainer {...props} />, { context })
    expect(enzymeWrapper.find(Stepper)).to.have.length(1)
  })
})