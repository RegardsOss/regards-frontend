/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ModuleComponent from '../../../src/components/user/ModuleComponent'
import { ModuleContainer } from '../../../src/containers/user/ModuleContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test ModuleContainer
 * @author Raphaël Mechali
 */
describe('[Storage Monitoring] Testing ModuleContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleContainer)
  })
  it('should render correctly', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      expandable: true,
      expanded: true,
    }
    const enzymeWrapper = shallow(<ModuleContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ModuleComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    const wrapperInstance = enzymeWrapper.instance()
    const wrapperState = enzymeWrapper.state()
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      expandable: props.expandable,
      expanded: props.expanded,
      scale: wrapperState.currentScale,
      onExpandChange: wrapperInstance.onExpandChange,
      onUnitScaleChanged: wrapperInstance.onUnitScaleChanged,
    }, 'Component should define the expected properties')
  })
})
