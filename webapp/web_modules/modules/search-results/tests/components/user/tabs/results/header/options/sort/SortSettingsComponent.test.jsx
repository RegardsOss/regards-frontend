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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import FlatButton from 'material-ui/FlatButton'
import SortSettingsComponent from '../../../../../../../../src/components/user/tabs/results/header/options/sort/SortSettingsComponent'
import styles from '../../../../../../../../src/styles'
import SortManagerComponent from '../../../../../../../../src/components/user/tabs/results/header/options/sort/SortManagerComponent'
import sortableAttributes from './sortableAttributes'

const context = buildTestContext(styles)

/**
 * Test SortSettingsComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing SortSettingsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SortSettingsComponent)
  })
  it('should render correctly', () => {
    const props = {
      // available sorting attributes
      sortableAttributes,

      // user and admin sorting infos
      isInInitialSorting: true,
      initialSorting: [],
      currentSorting: [],
      onApply: () => { },
    }
    const enzymeWrapper = shallow(<SortSettingsComponent {...props} />, { context })
    // check Sort manager is drawn
    const sortManagerComponent = enzymeWrapper.find(SortManagerComponent)
    assert.lengthOf(sortManagerComponent, 1, 'There should be the sort manager')
    testSuiteHelpers.assertWrapperProperties(sortManagerComponent, {
      open: false,
      sortableAttributes: props.sortableAttributes,
      isInInitialSorting: props.isInInitialSorting,
      currentSorting: props.currentSorting,
      onDone: enzymeWrapper.instance().onDone,
      onClose: enzymeWrapper.instance().onToggleDialog,
      onReset: enzymeWrapper.instance().onReset,
    }, 'Sort manager properties should be correctly set')

    // check flat button is drawn
    const buttons = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttons, 1, 'There should be a single button rendered')
  })
})
