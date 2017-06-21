/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CatalogEntityTypes } from '@regardsoss/model'
import { TableViewOptionsCellContainer } from '../../../../../src/containers/user/results/cells/TableViewOptionsCellContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing TableViewOptionsCellContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TableViewOptionsCellContainer)
  })
  it('should render properly', () => {
    const props = {
      entity: {
        content: {
          id: 1,
          ipId: 'coucou',
          sipId: '1',
          label: 'O.D.I.L',
          entityType: CatalogEntityTypes.DATASET,
          files: [],
          geometry: null,
          properties: {},
          tags: [],
        },
      },
      tooltip: 'hello',
      styles: {
        buttonStyles: {},
        iconStyles: {},
      },
      dispatchShowDescription: () => { },
    }
    shallow(<TableViewOptionsCellContainer {...props} />, { context })
  })
})
