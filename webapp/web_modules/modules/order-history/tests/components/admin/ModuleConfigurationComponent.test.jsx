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
import { ModulePaneStateField } from '@regardsoss/modules-api'
import ModuleConfigurationComponent from '../../../src/components/admin/ModuleConfigurationComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test ModuleConfigurationComponent
* @author Raphaël Mechali
*/
describe('[Order History] Testing ModuleConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleConfigurationComponent)
  })
  it('should render correctly', () => {
    const props = {
      currentNamespace: 'conf',
    }
    const enzymeWrapper = shallow(<ModuleConfigurationComponent {...props} />, { context })
    const paneField = enzymeWrapper.find(ModulePaneStateField)
    assert.lengthOf(paneField, 1, 'There should be the pane field')
    assert.equal(paneField.props().currentNamespace, props.currentNamespace, 'It should use the right namespace')
  })
})
