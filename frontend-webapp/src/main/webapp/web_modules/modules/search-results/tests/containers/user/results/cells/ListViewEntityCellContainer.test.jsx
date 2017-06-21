/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CatalogEntityTypes } from '@regardsoss/model'
import { ListViewEntityCellContainer } from '../../../../../src/containers/user/results/cells/ListViewEntityCellContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing ListViewEntityCellContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ListViewEntityCellContainer)
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

      attributes: {},
      lineHeight: 20,
      isTableSelected: false,
      selectTableEntityCallback: () => { },
      tableColumns: [],
      onSearchTag: () => { },
      onClick: () => { },
      styles: context.moduleTheme.user.listViewStyles,
      displayCheckBoxes: true,
      descriptionTooltip: 'hello',
      dispatchShowDescription: () => { },
    }
    shallow(<ListViewEntityCellContainer {...props} />, { context })
  })
})
