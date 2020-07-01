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
import { TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TreeTableComponent } from '../../src/tree-table/TreeTableComponent'
import TreeTableRow from '../../src/tree-table/TreeTableRow'
import styles from '../../src/tree-table/styles/styles'

const context = buildTestContext(styles)

const TestCellMarkerComponent = ({ text }) => text
const defaultCellBuilder = (value, level, column) => (
  <TableRowColumn key={`cell.${value}`}>
    <TestCellMarkerComponent text={`${level}.${column}: ${value}`} />
  </TableRowColumn>
)

/**
* Test TreeTable
* @author Raphaël Mechali
*/
describe('[COMPONENTS] Testing TreeTable', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TreeTableComponent)
  })
  it('should render correctly using buildTreeTableRows method', () => {
    const props = {
      model: [['l1.c1', 'l1.c2'], ['l2.c1', 'l2.c2']],
      buildTreeTableRows: (model) => model.map((row, index) => new TreeTableRow(`row.${index}`, row)),
      buildCellComponent: defaultCellBuilder,
      columns: [<TableHeaderColumn key="c1" />, <TableHeaderColumn key="c2" />],
    }
    const enzymeWrapper = shallow(<TreeTableComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableHeaderColumn), props.columns.length + 1, 'All columns should be displayed (plus one column reserved for expand option)')

    const cellContentWrappers = enzymeWrapper.find(TestCellMarkerComponent)
    assert.lengthOf(cellContentWrappers, props.model.reduce((acc, line) => acc + line.length, 0), 'There should be a cell market for each model element')

    // now, check each content wrapper has been rendered at the right column and with the right value
    props.model.forEach((line, lineIndex) => line.forEach((value, column) => {
      const cellWrapper = cellContentWrappers.findWhere((n) => {
        const markerText = n.props().text
        return markerText.includes(column.toString()) && markerText.includes(value)
      })
      assert.lengthOf(cellWrapper, 1, `There should be one, and only one, cell wrapper for a given cell model: ${lineIndex}-${column}`)
    }))
  })

  it('should rebuild model on changes', () => {
    let callCounter = 0
    const props = {
      model: [['l1.c1']],
      buildTreeTableRows: (model) => {
        callCounter += 1
        return model.map((row, index) => new TreeTableRow(`row.${index}`, row))
      },
      buildCellComponent: defaultCellBuilder,
      columns: [],
    }
    const enzymeWrapper = shallow(<TreeTableComponent {...props} />, { context })
    assert.equal(callCounter, 1, 'Should have called once the model builder at init')

    // change model
    const props2 = {
      ...props,
      model: props.model.concat([['l2.c2']]),
    }
    enzymeWrapper.setProps(props2)
    assert.equal(callCounter, 2, 'Should have called once the model builder after model change')

    // change builder
    const props3 = {
      ...props2,
      buildTreeTableRows: (model) => props.buildTreeTableRows(model), // just change ref
    }
    enzymeWrapper.setProps(props3)
    assert.equal(callCounter, 3, 'Should have called once the model builder after builder hange')

    // change nothing and check doesn't rebuild
    const props4 = { ...props3 }
    enzymeWrapper.setProps(props4)
    assert.equal(callCounter, 3, 'Should not have called the rebuild on same properties set')
  })
  it('should restore row state when possible', () => {
    const props = {
      model: [['l1.c1', 'l1.c2'], ['l2.c1', 'l2.c2']],
      buildTreeTableRows: (model) => model.map((row, index) => new TreeTableRow(`row.${index}`, row)),
      buildCellComponent: defaultCellBuilder,
      columns: [],
    }
    const enzymeWrapper = shallow(<TreeTableComponent {...props} />, { context })
    // toggle expanded state of the second row
    const rootRow = enzymeWrapper.state('tableRootRow')
    assert.lengthOf(rootRow.subRows, 2, 'There should be 2 rows')
    enzymeWrapper.instance().onToggleExpanded(rootRow.subRows[1])
    // change model (add two rows)
    enzymeWrapper.setProps({ ...props, model: props.model.concat([['l3.c1', 'l3.c2'], ['l4.c1', 'l4.c2']]) })
    const newRootRow = enzymeWrapper.state('tableRootRow')
    assert.lengthOf(newRootRow.subRows, 4, 'There should be 2 rows')
    assert.isFalse(newRootRow.subRows[0].expanded, 'Initial root 0 should not be expanded (unchanged)')
    assert.isTrue(newRootRow.subRows[1].expanded, 'First row should have been restored expanded')
    assert.isFalse(newRootRow.subRows[2].expanded, 'Third row is not expanded (as it was built)')
    assert.isFalse(newRootRow.subRows[3].expanded, 'Fourth row is not expanded (as it was built)')
  })
})
