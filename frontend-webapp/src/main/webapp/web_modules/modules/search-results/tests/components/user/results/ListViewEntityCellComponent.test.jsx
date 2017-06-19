/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CatalogEntityTypes } from '@regardsoss/model'
import ListViewEntityCellComponent from '../../../../src/components/user/results/ListViewEntityCellComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing ListViewEntityCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ListViewEntityCellComponent)
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
      onShowDescription: () => { },
    }
    shallow(<ListViewEntityCellComponent {...props} />, { context })
  })
})
