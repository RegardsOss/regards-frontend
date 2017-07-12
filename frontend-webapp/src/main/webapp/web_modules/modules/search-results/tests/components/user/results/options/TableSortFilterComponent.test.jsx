/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DropDownButton, TableStyles } from '@regardsoss/components'
import MenuItem from 'material-ui/MenuItem'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import TableSortFilterComponent from '../../../../../src/components/user/results/options/TableSortFilterComponent'

/**
 * Tests for SearchResultsComponent
 * @author Sébastien binda
 */
describe('[Search Results] Testing TableSortFilterComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  const options = { context: buildTestContext(TableStyles) } // use table context styles

  it('Should not render menu', () => {
    const props = {
      tableColumns: [],
      onSortByColumn: () => { },
      prefixLabel: 'prefix',
      noneLabel: 'none',
    }

    const wrapper = shallow(
      <TableSortFilterComponent {...props} />, options,
    )

    const menuBtn = wrapper.find(DropDownButton)
    assert.lengthOf(menuBtn, 0, 'No sortable columns provided. The component should no be displayed.')
  })

  it('Should not render a TableSortFilterComponent', () => {
    const props = {
      tableColumns: [
        {
          label: 'testAtt1',
          attributes: [],
          sortable: false,
        },
        {
          label: 'testAtt2',
          attributes: [],
          sortable: false,
        },
      ],
      onSortByColumn: () => { },
      prefixLabel: 'prefix',
      noneLabel: 'none',
    }

    const wrapper = shallow(
      <TableSortFilterComponent {...props} />, options,
    )

    const menuBtn = wrapper.find(DropDownButton)
    assert.lengthOf(menuBtn, 0, 'No sortable columns provided. The component should no be displayed.')
  })


  it('Should render a TableSortFilterComponent', () => {
    const props = {
      tableColumns: [
        {
          label: 'testAtt1',
          attributes: [],
          sortable: false,
        },
        {
          label: 'testAtt2',
          attributes: [],
          sortable: true,
        },
        {
          label: 'testAtt3',
          attributes: [],
          sortable: false,
        },
      ],
      onSortByColumn: () => { },
      prefixLabel: 'prefix',
      noneLabel: 'none',
    }

    const wrapper = shallow(
      <TableSortFilterComponent {...props} />, options,
    )

    const menuBtn = wrapper.find(DropDownButton)
    assert.lengthOf(menuBtn, 1, 'Sortable columns provided. The component should be displayed.')

    const menuItems = wrapper.find(MenuItem)
    assert.lengthOf(menuItems, 2, 'Only two sortable items should be available in the menu. The default none one and the configured one')
  })
})
