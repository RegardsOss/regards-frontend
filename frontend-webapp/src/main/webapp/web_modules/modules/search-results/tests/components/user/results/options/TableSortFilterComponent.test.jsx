/**
 * LICENSE_PLACEHOLDER
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
