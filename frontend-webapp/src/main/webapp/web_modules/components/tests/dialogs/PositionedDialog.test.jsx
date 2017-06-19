/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import root from 'window-or-global'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import PositionedDailogComponent from '../../src/dialogs/PositionedDialog'

const context = buildTestContext()

describe('[Components] Testing PositionedDailogComponent', () => {
  before(() => {
    root.document = {
      body: { clientWidth: '1200', clientHeight: '600' },
    }
    testSuiteHelpers.before()
  })
  after(() => {
    delete root.document
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(PositionedDailogComponent)
  })
  it('should render properly', () => {
    const props = {
      dialogWidthPercent: 50,
      dialogHeightPercent: 50,
    }
    const ATestComp = () => <div />

    const enzymeWrapper = shallow(
      <PositionedDailogComponent {...props} >
        <ATestComp />
      </PositionedDailogComponent>
      , { context })
    assert.lengthOf(enzymeWrapper.find(ATestComp), 1, 'The positioned dialog should render children')
  })
})
