/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import TableViewOptionsCellComponent from '../../../../../src/components/user/results/cells/TableViewOptionsCellComponent'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing TableViewOptionsCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TableViewOptionsCellComponent)
  })
  it('should render properly', () => {
    const props = {
      onShowDescription: () => { },
      tooltip: 'hello',
      styles: {
        buttonStyles: {},
        iconStyles: {},
      },
    }
    shallow(<TableViewOptionsCellComponent {...props} />, { context })
  })
})
