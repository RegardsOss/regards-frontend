/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableSelectionModes } from '@regardsoss/components'
import { selectors as searchEntitiesSelectors } from '../../../../../src/client/SearchEntitiesClient'
import TableSelectAllComponent from '../../../../../src/components/user/results/options/TableSelectAllComponent'
import { TableSelectAllContainer } from '../../../../../src/containers/user/results/options/TableSelectAllContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search results] Testing TableSelectAllContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TableSelectAllContainer)
  })
  it('should render properly', () => {
    const props = {
      pageSelectors: searchEntitiesSelectors,
      pageMetadata: {
        number: 40,
        size: 40,
        totalElements: 168000,
      },
      toggledElements: {},
      selectionMode: TableSelectionModes.includeSelected,
      dispatchSelectAll: () => { },
      dispatchUnselectAll: () => { },
    }
    // 1 - render with none selected
    const enzymeWrapper = shallow(<TableSelectAllContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableSelectAllComponent), 1, 'The corresponding component should be rendered')

    // 2 - render with all selected
    const nextProps = {
      ...props,
      selectionMode: TableSelectionModes.excludeSelected,
    }
    shallow(<TableSelectAllContainer {...nextProps} />, { context })
  })
})
