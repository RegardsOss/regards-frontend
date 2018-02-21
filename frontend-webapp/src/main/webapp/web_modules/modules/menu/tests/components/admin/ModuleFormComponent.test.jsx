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
import keys from 'lodash/keys'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { HOME_ICON_TYPES_ENUM } from '../../../src/domain/HomeIconType'
import ModuleFormComponent from '../../../src/components/admin/ModuleFormComponent'
import MenuPreviewComponent from '../../../src/components/admin/MenuPreviewComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ModuleFormComponent
 * @author Raphaël Mechali
 */
describe('[Menu] Testing ModuleFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleFormComponent)
  })
  it('should render correctly', () => {
    const props = {
      appName: 'any',
      project: 'any',
      adminForm: {
        changeField: () => { },
        currentNamespace: 'conf',
      },
    }
    const enzymeWrapper = shallow(<ModuleFormComponent {...props} />, { context })
    // check presence of each field by its name
    const instance = enzymeWrapper.instance()
    const searchedFields = keys(instance).filter(key => key.startsWith('CONF_')).map(fieldKey => instance[fieldKey])
    const fields = enzymeWrapper.find(Field)
    searchedFields.forEach((fieldName) => {
      const found = fields.findWhere(n => n.props().name === fieldName)
      assert.lengthOf(found, 1, `There should be a field with name "${fieldName}"`)
    })

    assert.lengthOf(enzymeWrapper.find(MenuPreviewComponent), 1, 'There should be the preview')
  })
  it('should disable/enable home icon URL field on home icon type', () => {
    const props = {
      appName: 'any',
      project: 'any',
      adminForm: {
        changeField: () => { },
        currentNamespace: 'conf',
        form: {
          conf: {
            home: {
              icon: {
                type: HOME_ICON_TYPES_ENUM.DEFAULT_HOME_ICON,
              },
            },
          },
        },
      },
    }
    const enzymeWrapper = shallow(<ModuleFormComponent {...props} />, { context })
    // check the field is disabled DEFAULT_HOME_ICON
    let homeIconURLField = enzymeWrapper.findWhere(n => n.props().name === enzymeWrapper.instance().CONF_HOME_ICON_URL)
    assert.lengthOf(homeIconURLField, 1, 'There should be the field')
    assert.isTrue(homeIconURLField.props().disabled, 'It should be disabled for type DEFAULT_HOME_ICON')
    // check the field is disabled for NONE
    const props2 = { ...props }
    props2.adminForm.form.conf.home.icon.type = HOME_ICON_TYPES_ENUM.NONE
    enzymeWrapper.setProps(props2)
    homeIconURLField = enzymeWrapper.findWhere(n => n.props().name === enzymeWrapper.instance().CONF_HOME_ICON_URL)
    assert.lengthOf(homeIconURLField, 1, 'There should be the field')
    assert.isTrue(homeIconURLField.props().disabled, 'It should be disabled for type NONE')
    // check the field is disabled for MODULE_ICON
    const props3 = { ...props }
    props3.adminForm.form.conf.home.icon.type = HOME_ICON_TYPES_ENUM.MODULE_ICON
    enzymeWrapper.setProps(props3)
    homeIconURLField = enzymeWrapper.findWhere(n => n.props().name === enzymeWrapper.instance().CONF_HOME_ICON_URL)
    assert.lengthOf(homeIconURLField, 1, 'There should be the field')
    assert.isTrue(homeIconURLField.props().disabled, 'It should be disabled for type MODULE_ICON')
    // check the field is disabled for CUSTOM_URL_ICON
    const props4 = { ...props }
    props4.adminForm.form.conf.home.icon.type = HOME_ICON_TYPES_ENUM.CUSTOM_URL_ICON
    enzymeWrapper.setProps(props4)
    homeIconURLField = enzymeWrapper.findWhere(n => n.props().name === enzymeWrapper.instance().CONF_HOME_ICON_URL)
    assert.lengthOf(homeIconURLField, 1, 'There should be the field')
    assert.isFalse(homeIconURLField.props().disabled, 'It should be enabled for type CUSTOM_URL_ICON')
  })
})