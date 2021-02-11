/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TreeTableComponent } from '@regardsoss/components'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../../src/domain/NavigationItemTypes'
import NavigationTree from '../../../../src/components/admin/navigation/NavigationTree'
import NewSectionOption from '../../../../src/components/admin/navigation/options/NewSectionOption'
import NewLinkOption from '../../../../src/components/admin/navigation/options/NewLinkOption'
import styles from '../../../../src/styles'
import { aNavigationConfiguration, anHomeConfiguration } from '../../../dumps/configuration.dump'
import { allDefaultConfigDumpModules } from '../../../dumps/modules.dump'

const context = buildTestContext(styles)

/**
 * Test NavigationTree
 * @author Raphaël Mechali
 */
describe('[Menu] Testing NavigationTree', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigationTree)
  })
  it('should render correctly and build nicely rows', () => {
    const props = {
      homeConfiguration: anHomeConfiguration,
      dynamicModules: allDefaultConfigDumpModules,
      navigationItems: aNavigationConfiguration,
      onCreateSection: () => { },
      onEdit: () => { },
      onDeleteSection: () => { },
      onCreateLink: () => { },
      onDeleteLink: () => { },
    }
    const enzymeWrapper = shallow(<NavigationTree {...props} />, { context })
    const newSection = enzymeWrapper.find(NewSectionOption)
    assert.lengthOf(newSection, 1, 'There should be the new section option')
    assert.equal(newSection.props().onCreateSection, props.onCreateSection, 'Create section should be correctly reported')
    const newLink = enzymeWrapper.find(NewLinkOption)
    assert.lengthOf(newLink, '1', 'There should be the new link option')
    assert.equal((newLink).props().onCreateLink, props.onCreateLink, 'Create link should be correctly reported')

    const tree = enzymeWrapper.find(TreeTableComponent)
    assert.lengthOf(tree, 1, 'There should be the tree')
    const {
      columns, model, buildTreeTableRows, buildCellComponent,
    } = tree.props()
    assert.deepEqual(model, props.navigationItems, 'Navigation model should be correctly reported')
    assert.lengthOf(columns, values(NavigationTree.COLUMNS_INDEX).length, 'All columns should be built ')
    assert.equal(buildTreeTableRows, enzymeWrapper.instance().buildTreeTableRows, 'It should report correctly the rows builder')
    assert.equal(buildCellComponent, enzymeWrapper.instance().renderCellComponent, 'It should report correctly the cell builder')
  })
  it('should build correctly tree rows for edition model', () => {
    const props = {
      homeConfiguration: anHomeConfiguration,
      dynamicModules: allDefaultConfigDumpModules,
      navigationItems: aNavigationConfiguration,
      onCreateSection: () => { },
      onEdit: () => { },
      onDeleteSection: () => { },
      onCreateLink: () => { },
      onDeleteLink: () => { },
    }
    const enzymeWrapper = shallow(<NavigationTree {...props} />, { context })
    const treeRows = enzymeWrapper.instance().buildTreeTableRows(props.navigationItems)
    // we check recursively that each row is correctly built
    const checkRowAndSubRows = (currentLevelRows, modelLevelItems) => {
      assert.equal(currentLevelRows.length, modelLevelItems.length, 'There should be a row for each model item of the current level')
      currentLevelRows.forEach((row, index) => {
        const correspondingModelItem = modelLevelItems[index]
        // 1 - there should be one value for each column
        assert.lengthOf(row.rowCells, values(NavigationTree.COLUMNS_INDEX).length, 'row should have a value for each column')
        // 2 - check item id and type in key
        assert.include(row.key, correspondingModelItem.id, 'ID should be correctly reported in key')
        assert.include(row.key, correspondingModelItem.type.toLowerCase(), 'type should be correctly reported in key')
        if (correspondingModelItem.type === NAVIGATION_ITEM_TYPES_ENUM.MODULE) {
          assert.lengthOf(row.subRows, 0, 'Module item should have no sub row')
        } else if (correspondingModelItem.type === NAVIGATION_ITEM_TYPES_ENUM.LINK) {
          assert.lengthOf(row.subRows, 0, 'Link item should have no sub row')
        } else {
          // check recursively for sub items
          checkRowAndSubRows(row.subRows, correspondingModelItem.children)
        }
      })
    }
    checkRowAndSubRows(treeRows, props.navigationItems)
  })
})
