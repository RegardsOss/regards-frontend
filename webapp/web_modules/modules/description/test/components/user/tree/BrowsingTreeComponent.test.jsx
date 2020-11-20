/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { TreeTableComponent } from '@regardsoss/components'
import BrowsingTreeComponent from '../../../../src/components/user/tree/BrowsingTreeComponent'
import styles from '../../../../src/styles'
import { resolvedDataEntity } from '../../../dumps/resolved.dump'

const context = buildTestContext(styles)

/**
 * Test BrowsingTreeComponent
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[Description] Testing BrowsingTreeComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(BrowsingTreeComponent)
  })
  it('should render correctly hidden', () => {
    const props = {
      allowSearching: true,
      browsingTreeVisible: false,
      descriptionEntity: resolvedDataEntity,
      scrollAreaHeight: 760,
      isDescriptionAllowed: () => true,
      onSelectInnerLink: () => {},
      onSelectEntityLink: () => {},
      onSearchWord: () => {},
      onSearchEntity: () => {},
    }
    const enzymeWrapper = shallow(<BrowsingTreeComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TreeTableComponent), 0, 'Tree should be hidden')
  })
  it('should render correctly visible', () => {
    const props = {
      allowSearching: true,
      browsingTreeVisible: true,
      descriptionEntity: resolvedDataEntity,
      scrollAreaHeight: 760,
      isDescriptionAllowed: () => true,
      onSelectInnerLink: () => {},
      onSelectEntityLink: () => {},
      onSearchWord: () => {},
      onSearchEntity: () => {},
    }
    const enzymeWrapper = shallow(<BrowsingTreeComponent {...props} />, { context })
    const treeWrapper = enzymeWrapper.find(TreeTableComponent)
    assert.lengthOf(treeWrapper, 1, 'Tree should be visible')
    testSuiteHelpers.assertWrapperProperties(treeWrapper, {
      model: props.descriptionEntity,
      buildTreeTableRows: enzymeWrapper.instance().buildTreeTableRows,
      buildCellComponent: enzymeWrapper.instance().buildCellComponent,
      columns: BrowsingTreeComponent.COLUMNS_FILLER,
    }, 'Tree properties should be correctly set')
    // more tests here would be very complicated as we insights on row and cells building...
  })
})
