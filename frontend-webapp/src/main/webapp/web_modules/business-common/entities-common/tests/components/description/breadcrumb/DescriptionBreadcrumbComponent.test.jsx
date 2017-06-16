/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Breadcrumb } from '@regardsoss/components'
import DescriptionBreadcrumbComponent from '../../../../src/components/description/breadcrumb/DescriptionBreadcrumbComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

const testEntity = {
  content: {
    ipId: 'URN:helloooooooooooooo Nanny!',
    model: {
      id: 1,
    },
    label: 'Hello, dear nanny',
    tags: [],
    entityType: 'COLLECTION',
  },
}

describe('[Entities Common] Testing DescriptionBreadcrumbComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DescriptionBreadcrumbComponent)
  })
  it('should render correctly empty', () => {
    const props = {
      // all entities in current description path
      descriptionPath: [],
      onEntitySelected: PropTypes.func.isRequired, // on breadcrumb entity selected (entity, index) => void
    }
    shallow(<DescriptionBreadcrumbComponent {...props} />, { context })
  })
  it('should render correctly with elements', () => {
    const props = {
      // all entities in current description path
      descriptionPath: [testEntity],
      onEntitySelected: PropTypes.func.isRequired, // on breadcrumb entity selected (entity, index) => void
    }
    const wrapper = shallow(<DescriptionBreadcrumbComponent {...props} />, { context })
    const breadcrumbnWrappers = wrapper.find(Breadcrumb)
    assert.lengthOf(breadcrumbnWrappers, 1, 'The component should use a breadcrumb to render sub elements')
  })
})
