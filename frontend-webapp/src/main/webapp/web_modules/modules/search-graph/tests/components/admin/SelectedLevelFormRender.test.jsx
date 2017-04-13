/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SelectedLevelFormRender from '../../../src/components/admin/SelectedLevelFormRender'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing SelectedLevelFormRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectedLevelFormRender)
  })

  it('should render properly', () => {
    // mimic the redux form fields methods
    const fields = {
      getAll: () => undefined,
    }
    const props = {
      collectionModels: {},
      meta: {
        touched: false,
        error: null,
      },
      intl: {
        formatMessage: ({ id }) => id,
      },
      fields,
    }
    // simple render test
    shallow(<SelectedLevelFormRender {...props} />, { context })
  })
})
