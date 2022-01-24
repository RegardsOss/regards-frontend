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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import TabsContentComponent from '../../../../src/components/user/tabs/TabsContentComponent'
import { TabsContentContainer } from '../../../../src/containers/user/tabs/TabsContentContainer'
import styles from '../../../../src/styles'
import { dataContext } from '../../../dumps/data.context.dump'

const context = buildTestContext(styles)

/**
 * Test TabsContentContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing TabsContentContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TabsContentContainer)
  })
  it('should render correctly', () => {
    const props = {
      moduleId: 1,
      appName: 'app',
      project: 'project',
      resultsContext: dataContext,
    }
    const enzymeWrapper = shallow(<TabsContentContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(TabsContentComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      moduleId: props.moduleId,
      appName: props.appName,
      project: props.project,
      resultsContext: dataContext,
    }, 'Component should define the expected properties')
  })
})
