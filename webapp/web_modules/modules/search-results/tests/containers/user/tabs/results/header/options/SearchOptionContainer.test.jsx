/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SearchOptionComponent from '../../../../../../../src/components/user/tabs/results/header/options/SearchOptionComponent'
import { SearchOptionContainer } from '../../../../../../../src/containers/user/tabs/results/header/options/SearchOptionContainer'
import styles from '../../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SearchOptionContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing SearchOptionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchOptionContainer)
  })
  it('should render correctly, toggling search pane state', () => {
    const spyUpdate = {}
    const props = {
      moduleId: 25,
      open: false,
      tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      updateResultsContext: (moduleId, resultsContext) => {
        spyUpdate.moduleId = moduleId
        spyUpdate.context = resultsContext
      },
    }
    const enzymeWrapper = shallow(<SearchOptionContainer {...props} />, { context })
    let componentWrapper = enzymeWrapper.find(SearchOptionComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      open: false,
      onToggleOpen: enzymeWrapper.instance().onToggleOpen,
    })
    componentWrapper.props().onToggleOpen()
    assert.deepEqual(spyUpdate, {
      moduleId: 25,
      context: {
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            search: {
              open: true,
            },
          },
        },
      },
    }, '1 - Firt toggle call should open the pane')
    enzymeWrapper.setProps({ ...props, open: true })
    componentWrapper = enzymeWrapper.find(SearchOptionComponent)
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      open: true,
      onToggleOpen: enzymeWrapper.instance().onToggleOpen,
    })
    componentWrapper.props().onToggleOpen()
    assert.deepEqual(spyUpdate, {
      moduleId: 25,
      context: {
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            search: {
              open: false,
            },
          },
        },
      },
    }, '2 - Second toggle call should close the pane')
  })
})
