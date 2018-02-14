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
import { Field } from '@regardsoss/form-utils'
import ModuleFormComponent from '../../../src/components/admin/ModuleFormComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ModuleFormComponent
 * @author Raphaël Mechali
 */
describe('[ Module name] Testing ModuleFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleFormComponent)
  })
  it('should render correctly', () => {
    const enzymeWrapper = shallow(<ModuleFormComponent />, { context })
    const wrapperInstance = enzymeWrapper.instance()
    // check presence of each field by its name
    const searchedFields = [
      wrapperInstance.CONF_TITLE,
      wrapperInstance.CONF_CONTACTS,
      wrapperInstance.CONF_ABOUT_PAGE,
      wrapperInstance.CONF_AUTH,
      wrapperInstance.CONF_CART,
      wrapperInstance.CONF_NOTIF,
      wrapperInstance.CONF_LOCALE,
      wrapperInstance.CONF_THEME,
    ]
    const fields = enzymeWrapper.find(Field)
    searchedFields.forEach((fieldName) => {
      const found = fields.findWhere(n => n.props().name === fieldName)
      assert.lengthOf(found, 1, `There should be a field with name "${fieldName}"`)
    })
  })
})
