/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { LoadingPaneComponent } from '@regardsoss/components'
import { FinishAccountUnlockingContainer } from '../../src/containers/FinishAccountUnlockingContainer'

describe('[AUTHENTICATION] Testing FinishAccountUnlockingContainer', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(FinishAccountUnlockingContainer)
  })
  const context = {
    intl: IntlStub,
  }
  it('should render properly', () => {
    const props = {
      mail: 'tiki@tokyo.jp',
      token: '1',
      onDone: () => { },
      onTokenExpired: () => { },
    }
    // very small tests for component rendering
    const enzymeWrapper = shallow(<FinishAccountUnlockingContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(LoadingPaneComponent).length, 1, 'There should be the rendered component!')
  })
})
