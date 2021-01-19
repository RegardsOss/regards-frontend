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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { modulesManager } from '@regardsoss/modules'
import { UIDomain } from '@regardsoss/domain'
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
  it('should render correctly with page preview', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      adminForm: {
        isCreating: true,
        isDuplicating: false,
        isEditing: false,
        isPage: true,
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
      assert.lengthOf(allFields.findWhere((n) => n.props().name === fieldName), 1,
        `There should be the field ${fieldName} (property ${field})`)
    })

    // 2 - check there is the preview container
    let previewContainer = wrapper.find(ModuleContainer)
    assert.lengthOf(previewContainer, 1, 'There should be user container, disconnected, as preview displayer')
    testSuiteHelpers.assertWrapperProperties(previewContainer, {
      appName: props.appName,
      project: props.project,
      type: modulesManager.AllDynamicModuleTypes.EMBEDDED_HMTL,
      moduleConf: {
        preview: true,
        previewLocale: UIDomain.LOCALES_ENUM.en,
        cssHeight: AdminContainer.PREVIEW_PAGE_HEIGHT,
        cssWidth: undefined,
        urlByLocale: undefined,
      },
    }, 'Preview properties should be correctly computed')
    // 3 - change preview locale and check properties
    wrapperInstance.onPreviewLocaleSelected(null, 1, UIDomain.LOCALES_ENUM.fr)
    previewContainer = wrapper.find(ModuleContainer)
    assert.lengthOf(previewContainer, 1, 'There should be user container, as preview displayer')
    testSuiteHelpers.assertWrapperProperties(previewContainer, {
      appName: props.appName,
      project: props.project,
      type: modulesManager.AllDynamicModuleTypes.EMBEDDED_HMTL,
      moduleConf: {
        preview: true,
        previewLocale: UIDomain.LOCALES_ENUM.fr,
        cssHeight: AdminContainer.PREVIEW_PAGE_HEIGHT,
        cssWidth: undefined,
        urlByLocale: undefined,
      },
    }, 'Preview properties should be correctly computed')
  })
  it('should render correctly with decorative component preview', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      adminForm: {
        isCreating: true,
        isDuplicating: false,
        isEditing: false,
        isPage: false,
        changeField: () => { },
        form: {},
      },
      moduleConf: {},
    }
    const wrapper = shallow(<AdminContainer {...props} />, { context })
    // Check preview height comes from form values
    const previewContainer = wrapper.find(ModuleContainer)
    assert.lengthOf(previewContainer, 1, 'There should be user container, as preview displayer')
    testSuiteHelpers.assertWrapperProperties(previewContainer, {
      appName: props.appName,
      project: props.project,
      type: modulesManager.AllDynamicModuleTypes.EMBEDDED_HMTL,
      moduleConf: {
        preview: true,
        previewLocale: UIDomain.LOCALES_ENUM.en,
        cssHeight: undefined, // no value in form yet
        cssWidth: undefined,
        urlByLocale: undefined,
      },
    }, 'Preview properties should be correctly computed')
  })
})
