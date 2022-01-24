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
import { modulesManager } from '@regardsoss/modules'
import { UIDomain } from '@regardsoss/domain'
import AdminComponent from '../../../src/components/admin/AdminFormComponent'
import { AdminContainer } from '../../../src/containers/admin/AdminContainer'
import styles from '../../../src/styles'
import { fullModuleConf } from '../../dumps/configuration.dump'

const context = buildTestContext(styles)

/**
 * Test AdminContainer
 * @author Raphaël Mechali
 */
describe('[Description] Testing AdminContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AdminContainer)
  })
  it('should render correctly', () => {
    const props = {
      appName: 'any',
      type: modulesManager.AllDynamicModuleTypes.DESCRIPTION,
      adminForm: {
        currentNamespace: 'test',
        isCreating: false,
        isPage: false,
        changeField: () => { },
        form: {
          test: fullModuleConf,
        },
      },
      collectionAttributeModels: {},
      dataAttributeModels: {},
      datasetAttributeModels: {},
      documentAttributeModels: {},
      uiSettings: UIDomain.UISettingsConstants.DEFAULT_SETTINGS,
      fetchAllCollectionAttributes: () => { },
      fetchAllDataAttributes: () => { },
      fetchAllDatasetModelsAttributes: () => { },
      fetchAllDocumentAttributes: () => {},
      fetchUISettings: () => new Promise((resolve) => resolve(true)),
    }
    const enzymeWrapper = shallow(<AdminContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(AdminComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      currentNamespace: props.adminForm.currentNamespace,
      currentFormValues: props.adminForm.form.test,
      changeField: props.adminForm.changeField,
      isCreating: props.adminForm.isCreating,
      collectionAttributeModels: props.collectionAttributeModels,
      dataAttributeModels: props.dataAttributeModels,
      datasetAttributeModels: props.datasetAttributeModels,
      documentAttributeModels: props.documentAttributeModels,
    }, 'Component should define the expected properties')
  })
})
