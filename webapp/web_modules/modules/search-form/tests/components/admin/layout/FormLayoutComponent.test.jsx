/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { LayoutConfigurationComponent } from '@regardsoss/layout'
import FormLayoutComponent from '../../../../src/components/admin/layout/FormLayoutComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test FormLayoutComponent
 * @author Raphaël Mechali
 */
describe('[Search Form] Testing FormLayoutComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FormLayoutComponent)
  })
  it('should render correctly', () => {
    const props = {
      currentNamespace: 'plop',
      defaultLayout: null,
      changeField: () => { },
    }
    const enzymeWrapper = shallow(<FormLayoutComponent {...props} />, { context })
    // 1 - Test pane field
    const paneField = enzymeWrapper.find(ModulePaneStateField)
    assert.lengthOf(paneField, 1, 'There should be the pane field')
    assert.equal(paneField.props().currentNamespace, props.currentNamespace, 'It should use the right namespace')
    // 2 - Test layout component
    assert.include(enzymeWrapper.debug(), 'form.layout.tab.title', 'There should be the field title')
    assert.lengthOf(enzymeWrapper.find(LayoutConfigurationComponent), 1, 'There should be the criteria layout field')
  })
})
