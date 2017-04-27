/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import Description from '../../../src/components/user/Description'
import { DescriptionContainer } from '../../../src/containers/user/DescriptionContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing DescriptionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DescriptionContainer)
  })
  it('should render correctly when hidden', () => {
    const props = {
      isDescriptionVisible: false,
      entity: null,
      hideDescription: () => { },
    }
    const enzymeWrapper = shallow(<DescriptionContainer {...props} />, { context })
    const component = enzymeWrapper.find(Description)
    assert.equal(component.length, 1, 'The corresponding component should be rendered')
    assert.isFalse(component.props().isDescriptionVisible, 'The description should not be visible')
    assert.isNull(component.props().entity, 'The entity should be null')
  })
  it('should render correctly when shown', () => {
    const testEntity = { hello: 'you' }
    const props = {
      isDescriptionVisible: true,
      entity: testEntity,
      hideDescription: () => { },
    }
    const enzymeWrapper = shallow(<DescriptionContainer {...props} />, { context })
    const component = enzymeWrapper.find(Description)
    assert.equal(component.length, 1, 'The corresponding component should be rendered')
    assert.isTrue(component.props().isDescriptionVisible, 'The description should be visible')
    assert.equal(component.props().entity, testEntity, 'The entity should be correctly provided to component')
  })
})
