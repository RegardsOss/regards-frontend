/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableSelectionModes } from '@regardsoss/components'
import { TableSelectAllComponent } from '../../../../src/components/user/results/TableSelectAllComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing TableSelectAllComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TableSelectAllComponent)
  })
  it('should render properly', () => {
    const props = {
      tableName: 'xxx',
      tableSelectionMode: TableSelectionModes.includeSelected,
      toggledElements: {},
      toggleTableSelectionMode: () => { },
    }
    shallow(<TableSelectAllComponent {...props} />, { context })
  })
})
