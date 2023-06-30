/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import TreeTableRow from '../../src/tree-table/TreeTableRow'

/**
 * tests TreeTableRow
 * @author Raphaël Mechali
 */
describe('[COMPONENTS] Testing TreeTableRow', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TreeTableRow)
  })

  it('should be able expanding /collapsing self', () => {
    const row = new TreeTableRow('a', [], [], false)
    assert.isFalse(row.expanded)
    row.toggleExpanded()
    assert.isTrue(row.expanded)
    row.toggleExpanded()
    assert.isFalse(row.expanded)
  })
  it('should be able comparing by key', () => {
    const rowA = new TreeTableRow('a', [1, 2], [new TreeTableRow('b')], false)
    const rowB = new TreeTableRow('a', [3, 4], [], true)
    assert.isTrue(rowA.isSameRow(rowB))

    const rowC = new TreeTableRow('c', [1, 2], [new TreeTableRow('b')], false)
    const rowD = new TreeTableRow('d', [1, 2], [new TreeTableRow('b')], false)
    assert.isFalse(rowC.isSameRow(rowD))
  })
  it('should be able restore expanded state for self and sub rows', () => {
    const l2aRow = new TreeTableRow('l2a', [], [], false)
    const l2bRow = new TreeTableRow('l2b', [], [], true)
    const l2cRow = new TreeTableRow('l2c', [], [], true)
    const l1aRow = new TreeTableRow('l1a', [], [l2aRow, l2bRow, l2cRow], false)
    const l1bRow = new TreeTableRow('l1b', [], [], false)
    const l1eRow = new TreeTableRow('l1e', [], [], false)

    const testRootRow = new TreeTableRow('root.key', [3, 4], [l1aRow, l1bRow, l1eRow], false)

    assert.isFalse(l2aRow.expanded, 'Before restoring state: L2A should be collapsed')
    assert.isTrue(l2bRow.expanded, 'Before restoring state: L2B should be expanded')
    assert.isTrue(l2cRow.expanded, 'Before restoring state: L2C should be expanded')
    assert.isFalse(l1aRow.expanded, 'Before restoring state: L1A should be collapsed')
    assert.isFalse(l1bRow.expanded, 'Before restoring state: L1B should be collapsed')
    assert.isFalse(l1eRow.expanded, 'Before restoring state: L1E should be collapse')
    assert.isFalse(testRootRow.expanded, 'Before restoring state: Root row should be collapsed')

    testRootRow.restoreExpandedStatefrom(new TreeTableRow('root.key', [], [
      new TreeTableRow('l1a', [], [
        new TreeTableRow('l2a', [], [], true),
        new TreeTableRow('l2b', [], [], false),
      ], false),
      new TreeTableRow('l1b', [], [], true),
      new TreeTableRow('l1c', [], [], true),
      new TreeTableRow('l1d', [], [], true),
    ], true))
    assert.isTrue(l2aRow.expanded, 'After restoring state: L2A should be expanded')
    assert.isFalse(l2bRow.expanded, 'After restoring state: L2B should be collapsed')
    assert.isTrue(l2cRow.expanded, 'After restoring state: L2C should be unchanged')
    assert.isFalse(l1aRow.expanded, 'After restoring state: L1A should be collapsed')
    assert.isTrue(l1bRow.expanded, 'After restoring state: L1B should be expanded')
    assert.isFalse(l1eRow.expanded, 'After restoring state: L1E should be unchanged')
    assert.isTrue(testRootRow.expanded, 'After restoring state: Root row should be expanded')
  })
})
