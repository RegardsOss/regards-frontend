/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { Stepper } from 'material-ui/Stepper'
import DatasetStepperComponent from '../../src/components/DatasetStepperComponent'

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetStepperComponent', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(DatasetStepperComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  it('Render properly', () => {
    const props = {
      stepIndex: 1,
    }
    const enzymeWrapper = shallow(<DatasetStepperComponent {...props} />, { context })
    expect(enzymeWrapper.find(Stepper)).to.have.length(1)
  })
})
