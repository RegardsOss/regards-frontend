/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { EntityDescriptionContainer } from '@regardsoss/entities-common'
import { DescriptionContainer } from '../../../src/containers/user/DescriptionContainer'


const context = buildTestContext()

describe('[Search Results] Testing DescriptionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DescriptionContainer)
  })
  it('should render properly', () => {
    const props = {
      dispatchOnSearchTag: () => { },
      dispatchOnSearchDataset: () => { },
    }
    const enzymeWrapper = shallow(<DescriptionContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(EntityDescriptionContainer), 1, 'It should render a description display container')
  })
})
