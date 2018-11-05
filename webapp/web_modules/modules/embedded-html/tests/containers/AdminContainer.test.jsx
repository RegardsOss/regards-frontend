/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { modulesManager } from '@regardsoss/modules'
import AdminContainer from '../../src/containers/AdminContainer'
import { ModuleContainer } from '../../src/containers/ModuleContainer'
import styles from '../../src/styles/styles'

/**
 * AdminContainer tests
 * @author Sébastien Binda
 */

const context = buildTestContext(styles)

describe('[Embedded-html] Testing AdminContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AdminContainer)
  })
  it('should render correctly', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      adminForm: {
        isCreating: true,
        isDuplicating: false,
        isEditing: false,
        changeField: () => { },
        form: {},
      },
      moduleConf: {},
    }
    const wrapper = shallow(<AdminContainer {...props} />, { context })
    const wrapperInstance = wrapper.instance()
    // 1 - check each field is available
    const allFields = wrapper.find(Field)
    const searchFields = ['CONF_HEIGHT', 'CONF_WIDTH', 'CONF_EN_URL', 'CONF_FR_URL']
    searchFields.forEach((field) => {
      const fieldName = wrapperInstance[field]
      assert.lengthOf(allFields.findWhere(n => n.props().name === fieldName), 1,
        `There should be the field ${fieldName} (property ${field})`)
    })

    // 2 - check there is the preview container
    const previewContainer = wrapper.find(ModuleContainer)
    assert.lengthOf(previewContainer, 1, 'There should be user container, disconnected, as preview displayer')
    testSuiteHelpers.assertWrapperProperties(previewContainer, {
      appName: props.appName,
      project: props.project,
      type: modulesManager.AllDynamicModuleTypes.EMBEDDED_HMTL,
      moduleConf: {
        cssHeight: undefined,
        cssWidth: undefined,
        urlByLocale: undefined,
      },
      locale: wrapper.state().previewLocale,
    }, 'Container properties should be correctly computed')
  })
})
