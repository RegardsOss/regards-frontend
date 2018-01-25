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
import { DynamicModule } from '@regardsoss/components'
import { storage } from '@regardsoss/units'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ModuleComponent from '../../src/components/ModuleComponent'
import StorageMonitoringContainer from '../../src/containers/StorageMonitoringContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test ModuleComponent
 * @author Raphaël Mechali
 */
describe('[Storage Monitoring] Testing ModuleComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleComponent)
  })
  const testCases = [{
    label: 'expandable and expanded',
    props: {
      scale: storage.StorageUnitScale.bitsScale,
      expandable: true,
      expanded: true,
      onExpandChange: () => { },
      onUnitScaleChanged: () => { },
    },
  }, {
    label: 'not expandable and collapsed',
    props: {
      scale: storage.StorageUnitScale.bytesSIPrefixScale,
      expandable: false,
      expanded: false,
      onExpandChange: () => { },
      onUnitScaleChanged: () => { },
    },
  }]

  testCases.forEach(({ label, props }) => {
    it(`should render correctly when ${label}`, () => {
      const enzymeWrapper = shallow(<ModuleComponent {...props} />, { context })
      // module display HOC
      const moduleDisplayWrapper = enzymeWrapper.find(DynamicModule)
      assert.lengthOf(moduleDisplayWrapper, 1, 'There should be a module display component')
      testSuiteHelpers.assertWrapperProperties(moduleDisplayWrapper, {
        expandable: props.expandable,
        expanded: props.expanded,
        onExpandChange: props.onExpandChange,
      }, 'Properties and callbacks should be correctly reported to display component')
      // sub container
      const subcontainerWrapper = enzymeWrapper.find(StorageMonitoringContainer)
      assert.lengthOf(subcontainerWrapper, 1, 'Sub container should be shown within module display HOC')
      testSuiteHelpers.assertWrapperProperties(subcontainerWrapper, {
        scale: props.scale,
      }, 'Sub container properties should be correctly reported')
      // scale selector: cannot be tested easily as it is nested within the display module HOC
    })
  })
})