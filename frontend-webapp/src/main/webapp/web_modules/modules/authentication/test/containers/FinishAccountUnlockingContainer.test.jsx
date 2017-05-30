/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadingPaneComponent } from '@regardsoss/components'
import { FinishAccountUnlockingContainer } from '../../src/containers/FinishAccountUnlockingContainer'

const options = {
  context: buildTestContext(),
}

describe('[AUTHENTICATION] Testing FinishAccountUnlockingContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(FinishAccountUnlockingContainer)
  })
  it('should render properly', () => {
    const props = {
      mail: 'tiki@tokyo.jp',
      token: '1',
      onDone: () => { },
      onTokenExpired: () => { },
    }
    // very small tests for component rendering
    const enzymeWrapper = shallow(<FinishAccountUnlockingContainer {...props} />, options)
    assert.equal(enzymeWrapper.find(LoadingPaneComponent).length, 1, 'There should be the rendered component!')
  })
})
