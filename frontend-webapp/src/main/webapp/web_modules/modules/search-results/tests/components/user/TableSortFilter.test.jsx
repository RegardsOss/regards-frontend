/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import Styles from '../../../src/styles/styles'
import TableSortFilter from '../../../src/components/user/TableSortFilter'

/**
 * Tests for SearchResultsComponent
 * @author Sébastien binda
 */
describe('[RESULTS MODULE] Testing SearchResultsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  const options = { context: buildTestContext(Styles) }

  it('Should not render a TableSortFilter', () => {
    const props = {
      tableColumns: [],
      onSortByColumn: () => {},
      prefixLabel: 'prefix',
      noneLabel: 'none',
    }

    const wrapper = shallow(
      <TableSortFilter {...props} />, options,
    )

    const menu = wrapper.find(DropDownMenu)
    assert.lengthOf(menu, 0, 'No sortable columns provided. The component should no be displayed.')
  })

  it('Should not render a TableSortFilter', () => {
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
      onSortByColumn: () => {},
      prefixLabel: 'prefix',
      noneLabel: 'none',
    }

    const wrapper = shallow(
      <TableSortFilter {...props} />, options,
    )

    const menu = wrapper.find(DropDownMenu)
    assert.lengthOf(menu, 0, 'No sortable columns provided. The component should no be displayed.')
  })


  it('Should render a TableSortFilter', () => {
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
      onSortByColumn: () => {},
      prefixLabel: 'prefix',
      noneLabel: 'none',
    }

    const wrapper = shallow(
      <TableSortFilter {...props} />, options,
    )

    const menu = wrapper.find(DropDownMenu)
    assert.lengthOf(menu, 1, 'Sortable columns provided. The component should be displayed.')

    const menuItems = wrapper.find(MenuItem)
    assert.lengthOf(menuItems, 2, 'Only two sortable items should be available in the menu. The default none one and the configured one')
  })
})
