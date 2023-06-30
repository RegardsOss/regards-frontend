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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CriterionBuilder } from '../../../../src/definitions/CriterionBuilder'
import TabComponent from '../../../../src/components/user/tabs/TabComponent'
import { TabContainer } from '../../../../src/containers/user/tabs/TabContainer'
import styles from '../../../../src/styles'
import { anotherDatasetEntity } from '../../../dumps/entities.dump'

const context = buildTestContext(styles)

/**
 * Test TabContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing TabContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TabContainer)
  })
  it('should render correctly', () => {
    const props = {
      tab: {
        tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
        selected: true,
        closable: true,
        contextCriterion: CriterionBuilder.buildEntityTagCriterion(anotherDatasetEntity),
      },
      onTabSelected: () => {},
      onTabClosed: () => {},
      settings: UIDomain.UISettingsConstants.DEFAULT_SETTINGS,
    }
    const enzymeWrapper = shallow(<TabContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(TabComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      tab: props.tab,
      onTabSelected: props.onTabSelected,
      onTabClosed: props.onTabClosed,
      settings: props.settings,
    }, 'Component should define the expected properties')
  })
})
