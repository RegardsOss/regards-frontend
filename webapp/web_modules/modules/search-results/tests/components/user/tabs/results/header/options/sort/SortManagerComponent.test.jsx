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
import { InfiniteTableContainer } from '@regardsoss/components'
import styles from '../../../../../../../../src/styles'
import SortManagerComponent from '../../../../../../../../src/components/user/tabs/results/header/options/sort/SortManagerComponent'
import sortableAttributes from './sortableAttributes'

const context = buildTestContext(styles)

/**
 * Test SortManagerComponent
 * @author Léo Mieulet
 */
describe('[SEARCH RESULTS] Testing SortManagerComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SortManagerComponent)
  })
  it('should render correctly', () => {
    const props = {
      open: true,
      sortableAttributes,
      isInInitialSorting: true,
      currentSorting: [],
      onDone: () => { },
      onReset: () => { },
      onClose: () => { },
    }
    const enzymeWrapper = shallow(<SortManagerComponent {...props} />, { context })
    // check Infinite table is drawn
    const infiniteTableComponent = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(infiniteTableComponent, 1, 'There should be the infinite table')
    testSuiteHelpers.assertWrapperProperties(infiniteTableComponent, {
      entities: enzymeWrapper.state().currentSortings,
      columns: enzymeWrapper.instance().buildColumns(),
    }, 'Infinite table properties should be correctly set')

    assert.equal(enzymeWrapper.state().valid, false, 'Should be valid')
    assert.equal(enzymeWrapper.state().modified, false, 'Should be pristine')
  })
})
