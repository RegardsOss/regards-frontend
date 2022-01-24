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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { AccessRightFormComponent } from '../../src/components/AccessRightFormComponent'
import AccessRightsEnum from '../../src/components/AccessRightsEnum'

const context = buildTestContext()

describe('[ADMIN ACCESSRIGHT MANAGEMENT]  Testing AccessRightFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessRightFormComponent)
  })

  const testCases = [{
    label: 'is not set (only metadata level field)',
    datasetAccessRightsToEdit: [DumpProvider.getEntityBy('DataManagementClient', 'DatasetWithAccessRight',
      'content.datasetIpId', 'URN:AIP:DATASET:project1:7cb64c2a-a866-4c18-9cf7-08fef9dfcc6c:V1')],
    expectedFields: { access: true, dataAccess: false, dataAccessPlugin: false },
    expectedInitialValues: {
      access: AccessRightsEnum.METADATA_ACCESS_ENUM.NO_ACCESS,
      dataAccess: AccessRightsEnum.DATA_ACCESS_ENUM.REFUSED,
      dataAccessPlugin: undefined,
    },
  }, {
    label: 'is restricted at metadata level (only metadata level field)',
    datasetAccessRightsToEdit: [DumpProvider.getEntityBy('DataManagementClient', 'DatasetWithAccessRight',
      'content.datasetIpId', 'URN:AIP:DATASET:project1:1b3aaeb5-c475-46a1-9454-3c69c05215ea:V1')],
    expectedFields: { access: true, dataAccess: false, dataAccessPlugin: false },
    expectedInitialValues: {
      access: AccessRightsEnum.METADATA_ACCESS_ENUM.DATASET_ACCESS,
      dataAccess: AccessRightsEnum.DATA_ACCESS_ENUM.REFUSED,
      dataAccessPlugin: undefined,
    },
  }, {
    label: 'is custom (shows all fields)',
    datasetAccessRightsToEdit: [DumpProvider.getEntityBy('DataManagementClient', 'DatasetWithAccessRight',
      'content.datasetIpId', 'URN:AIP:DATASET:project1:075bc1d9-0f3e-4275-8f8e-bbca8f092229:V1')],
    expectedFields: { access: true, dataAccess: true, dataAccessPlugin: true },
    expectedInitialValues: {
      access: AccessRightsEnum.METADATA_ACCESS_ENUM.CUSTOM_ACCESS,
      dataAccess: AccessRightsEnum.DATA_ACCESS_ENUM.AUTHORIZED,
      dataAccessPlugin: DumpProvider.getEntityBy('DataManagementClient', 'DatasetWithAccessRight',
        'content.datasetIpId', 'URN:AIP:DATASET:project1:075bc1d9-0f3e-4275-8f8e-bbca8f092229:V1').content.accessRight.dataAccessPlugin,
    },
  }, {
    label: 'is set to data level (shows meta and data levels fields)',
    datasetAccessRightsToEdit: [DumpProvider.getEntityBy('DataManagementClient', 'DatasetWithAccessRight',
      'content.datasetIpId', 'URN:AIP:DATASET:project1:873b8085-e4f7-400a-ba4c-dc3f5cf88b7b:V1')],
    expectedFields: { access: true, dataAccess: true, dataAccessPlugin: false },
    expectedInitialValues: {
      access: AccessRightsEnum.METADATA_ACCESS_ENUM.DATASET_AND_OBJECT_ACCESS,
      dataAccess: AccessRightsEnum.DATA_ACCESS_ENUM.AUTHORIZED,
      dataAccessPlugin: DumpProvider.getEntityBy('DataManagementClient', 'DatasetWithAccessRight',
        'content.datasetIpId', 'URN:AIP:DATASET:project1:873b8085-e4f7-400a-ba4c-dc3f5cf88b7b:V1').content.accessRight.dataAccessPlugin,
    },
  }, {
    label: 'is not set (multiple selection)',
    datasetAccessRightsToEdit: [
      DumpProvider.getEntityBy('DataManagementClient', 'DatasetWithAccessRight',
        'content.datasetIpId', 'URN:AIP:DATASET:project1:873b8085-e4f7-400a-ba4c-dc3f5cf88b7b:V1'),
      DumpProvider.getEntityBy('DataManagementClient', 'DatasetWithAccessRight',
        'content.datasetIpId', 'URN:AIP:DATASET:project1:075bc1d9-0f3e-4275-8f8e-bbca8f092229:V1')],
    expectedFields: { access: true, dataAccess: false, dataAccessPlugin: false },
    expectedInitialValues: {
      access: AccessRightsEnum.METADATA_ACCESS_ENUM.NO_ACCESS,
      dataAccess: AccessRightsEnum.DATA_ACCESS_ENUM.REFUSED,
      dataAccessPlugin: undefined,
    },
  }]
  testCases.forEach(
    ({
      label, datasetAccessRightsToEdit, expectedFields, expectedInitialValues,
    }) => it(`Render correctly when access right ${label}`, () => {
      const spyInitialize = {}
      const props = {
        onSubmit: () => { },
        onCancel: () => { },
        datasetAccessRightsToEdit,
        // from reduxForm
        submitting: false,
        isSubmitting: false,
        invalid: false,
        handleSubmit: () => { },
        initialize: (values) => { spyInitialize.values = values },
        change: () => { },
        // mimic the initialize behavior as it will not be called
        selectedAccessLevel: expectedInitialValues.access,
      }
      const enzymeWrapper = shallow(<AccessRightFormComponent {...props} />, { context })
      // 1. check form vallues initialization
      assert.deepEqual(spyInitialize.values, expectedInitialValues, 'Form values should be correctly initialized')
      // 2. check rendered fields
      const fieldsWrapper = enzymeWrapper.find(Field)
      const allFields = ['access', 'dataAccess', 'dataAccessPlugin']
      allFields.forEach((fieldName) => {
        if (expectedFields[fieldName]) {
          assert.lengthOf(fieldsWrapper.findWhere((n) => n.props().name === fieldName), 1, `There should be ${fieldName} field`)
        } else {
          assert.lengthOf(fieldsWrapper.findWhere((n) => n.props().name === fieldName), 0, `There should not be ${fieldName} field`)
        }
      })
    }))
})
