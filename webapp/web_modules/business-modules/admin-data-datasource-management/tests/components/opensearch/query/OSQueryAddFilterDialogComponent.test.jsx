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
 */
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { assert } from 'chai'
import { shallow } from 'enzyme'
import Dialog from 'material-ui/Dialog'
import ListItem from 'material-ui/List/ListItem'
import OSQueryAddFilterDialogComponent from '../../../../src/components/opensearch/query/OSQueryAddFilterDialogComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing OSQueryAddFilterDialogComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exist', () => {
    assert.isDefined(OSQueryAddFilterDialogComponent)
  })
  it('should render properly', () => {
    const props = {
      availableParameters: [],
      selectedFilters: [],
      open: false,
      onClose: () => {},
      onConfirmAddFilter: () => {},
    }

    const wrapper = shallow(<OSQueryAddFilterDialogComponent {...props} />, { context })
    const dialog = wrapper.find(Dialog)

    assert.equal(dialog.length, 1, 'Should render a Material-UI Dialog')
    assert.isFalse(dialog.props().open, "The dialog shouldn't be open")
  })

  it('should list all filters', () => {
    const props = {
      availableParameters: [{ value: '1' }, { value: '2' }, { value: '3' }],
      selectedFilters: [],
      open: true,
      onClose: () => {},
      onConfirmAddFilter: () => {},
    }

    const wrapper = shallow(<OSQueryAddFilterDialogComponent {...props} />, { context })
    assert.equal(wrapper.find(ListItem).length, 3, 'There should be three filters shown in the dialog')
  })
})
