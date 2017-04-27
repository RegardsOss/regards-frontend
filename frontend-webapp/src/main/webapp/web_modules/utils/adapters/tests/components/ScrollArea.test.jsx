/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import ScrollArea from '../../src/components/ScrollAreaAdapter'

describe('[ SCROLL AREA] Testing ScrollArea', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ScrollArea)
  })
  it('should render properly in headless environements', () => {
    shallow(<ScrollArea />)
  })
})
