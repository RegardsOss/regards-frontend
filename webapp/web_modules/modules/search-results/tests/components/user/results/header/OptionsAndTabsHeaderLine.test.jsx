/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import { TableSortOrders } from '@regardsoss/components'
import { selectors as searchSelectors } from '../../../../../src/clients/SearchEntitiesClient'
import { TableDisplayModeEnum } from '../../../../../src/models/navigation/TableDisplayModeEnum'
import OptionsAndTabsHeaderLine from '../../../../../src/components/user/results/header/OptionsAndTabsHeaderLine'
import styles from '../../../../../src/styles/styles'
import { DISPLAY_MODE_ENUM } from '../../../../../src/definitions/DisplayModeEnum'

const context = buildTestContext(styles)

const TestRender = () => <div />

/**
* Test OptionsAndTabsHeaderLine
* @author Raphaël Mechali
*/
describe('[Search Results] Testing OptionsAndTabsHeaderLine', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OptionsAndTabsHeaderLine)
  })
  it('should render correctly', () => {
    const props = {
      // state
      presentationModels: [{
        key: 'some.model',
        label: {
          en: 'a model',
          fr: 'un model',
        },
        visible: true,
        attributes: [],
        enableSorting: true,
        sortOrder: TableSortOrders.NO_SORT,
        defaultSorting: false,
      }],
      displayMode: DISPLAY_MODE_ENUM.DISPLAY_DATA_DATASET,
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA, // current view object type
      tableViewMode: TableDisplayModeEnum.LIST, // current mode
      searchSelectors,
      tableColumns: [{
        key: 'some.model',
        label: 'Some model',
        order: 0, // optional column order (columns without order goes at the middle - index 1000)
        // The instantiated header cell (optional, remove to get an headerless columns)
        headerCell: null,
        rowCellDefinition: { Constructor: TestRender },
        visible: true,
      }],
      displayFacettesButton: true,
      showingFacettes: false,
      enableQuicklooks: false,
      displayOnlyQuicklook: false,
      selectionServices: [],
      onAddSelectionToCart: null,
      onConfigureColumns: () => { },
      onResetColumns: () => { },
      onShowDataobjects: () => { },
      onShowDatasets: () => { },
      onShowListView: () => { },
      onShowTableView: () => { },
      onShowQuicklookView: () => { },
      onSortByAttribute: () => { },
      onStartSelectionService: () => { },
      onToggleShowFacettes: () => { },
      onToggleDisplayOnlyQuicklook: () => { },
    }
    shallow(<OptionsAndTabsHeaderLine {...props} />, { context })
  })
})
