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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { ModulePaneStateField } from '../../src/components/admin/ModulePaneStateField'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ModulePaneStateField
 * @author Raphaël Mechali
 */
describe('[Modules API] Testing ModulePaneStateField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModulePaneStateField)
  })
  it('should render correctly in common case', () => {
    const props = {
      currentNamespace: 'confxxx',
    }
    const enzymeWrapper = shallow(<ModulePaneStateField {...props} />, { context })
    // 1 - check field name
    const fieldWrapper = enzymeWrapper.find(Field)
    assert.lengthOf(fieldWrapper, 1, 'There should be the field')
    assert.equal(fieldWrapper.props().name, 'confxxx.primaryPane', 'Field name should be correctly computed')
    assert.equal(fieldWrapper.props().defaultSelected, UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.EXPANDED_COLLAPSIBLE,
      'Field default value should be correctly intialized')
    // 2 - check field label and value labels
    const asText = enzymeWrapper.debug()
    assert.include(asText, 'modules.common.admin.pane.expanded.field.label', 'Field label should be retrieved')
    assert.include(asText, 'modules.common.admin.pane.expanded.label', 'Field first value label')
    assert.include(asText, 'modules.common.admin.pane.collapsed.label', 'Field second value label')
    assert.include(asText, 'modules.common.admin.pane.always.expanded.label', 'Field third value label')
  })
  it('should render correctly when customized', () => {
    const props = {
      currentNamespace: 'myNamespace',
      paneName: 'myPane',
      label: 'I want to say something else',
      defaultValue: UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.ALWAYS_EXPANDED,
    }
    const enzymeWrapper = shallow(<ModulePaneStateField {...props} />, { context })
    // 1 - check field name
    const fieldWrapper = enzymeWrapper.find(Field)
    assert.lengthOf(fieldWrapper, 1, 'There should be the field')
    assert.equal(fieldWrapper.props().name, 'myNamespace.myPane', 'Field name should be correctly computed')
    assert.equal(fieldWrapper.props().defaultSelected, props.defaultValue,
      'Field default value should be correctly intialized')
    // 2 - check field label and value labels
    const asText = enzymeWrapper.debug()
    assert.include(asText, props.label, 'Field label should use configured prop')
    assert.include(asText, 'modules.common.admin.pane.expanded.label', 'Field first value label')
    assert.include(asText, 'modules.common.admin.pane.collapsed.label', 'Field second value label')
    assert.include(asText, 'modules.common.admin.pane.always.expanded.label', 'Field third value label')
  })
})
