/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DescriptionBreadcrumbComponent from '../../../../src/components/description/breadcrumb/DescriptionBreadcrumbComponent'
import { DescriptionBreadcrumbContainer } from '../../../../src/containers/description/breadcrumb/DescriptionBreadcrumbContainer'
import DescriptionLevelActions from '../../../../src/model/description/DescriptionLevelActions'
import getDescriptionLevelSelectors from '../../../../src/model/description/DescriptionLevelSelectors'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

const testEntity = {
  content: {
    ipId: 'test',
    label: 'test',
    entityType: 'COLLECTION',
  },
}

describe('[Entities Common] Testing DescriptionBreadcrumbContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DescriptionBreadcrumbContainer)
  })
  it('should render no data correctly', () => {
    const props = {
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors(['test']),
      descriptionPath: [],
      dispatchEntitySelected: () => { },
    }
    const enzymeWrapper = shallow(<DescriptionBreadcrumbContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(DescriptionBreadcrumbComponent), 1, 'The corresponding component should be rendered')
  })
  it('should render correctly with data', () => {
    const props = {
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors(['test']),
      descriptionPath: [testEntity],
      dispatchEntitySelected: () => { },
    }
    const enzymeWrapper = shallow(<DescriptionBreadcrumbContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(DescriptionBreadcrumbComponent), 1, 'The corresponding component should be rendered')
  })
})
