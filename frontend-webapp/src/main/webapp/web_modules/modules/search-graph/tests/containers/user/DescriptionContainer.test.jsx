/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { EntityDescriptionContainer } from '@regardsoss/entities-common'
import { DescriptionContainer } from '../../../src/containers/user/DescriptionContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing DescriptionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DescriptionContainer)
  })

  it('should render correctly when shown', () => {
    const enzymeWrapper = shallow(<DescriptionContainer dispatchSearchTag={() => { }} />, { context })
    const component = enzymeWrapper.find(EntityDescriptionContainer)
    assert.equal(component.length, 1, 'The entity description container should be rendered')
  })
})
