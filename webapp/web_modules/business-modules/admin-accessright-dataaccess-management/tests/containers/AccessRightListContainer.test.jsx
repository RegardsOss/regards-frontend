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
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import AccessRightListComponent from '../../src/components/AccessRightListComponent'
import { AccessRightListContainer } from '../../src/containers/AccessRightListContainer'
import styles from '../../src/styles/styles'
import AccessRightEnum from '../../src/components/AccessRightsEnum'

const context = buildTestContext(styles)

const formValues = {
  access: AccessRightEnum.METADATA_ACCESS_ENUM.DATASET_AND_OBJECT_ACCESS,
  dataAccess: AccessRightEnum.DATA_ACCESS_ENUM.AUTHORIZED,
}

/**
* Test  AccessRightListContainer
* @author Sébastien Binda
*/
describe('[ADMIN ACCESSRIGHT MANAGEMENT] Testing  AccessRightListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessRightListContainer)
  })
  it('should render correctly', () => {
    const clearSelectionSpy = stub().returns({})
    const fetchAccessRightsSpy = stub().returns({})
    const createSpy = stub().returns({})
    const updateSpy = stub().returns({})
    const deleteSpy = stub().returns({})
    const testAccessGroup = DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup')
    const props = {
      params: {
        project: 'lambda',
      },
      accessGroup: testAccessGroup,
      selectedDatasetsWithAccessright: [],
      meta: {
        number: 1,
        size: 10,
        totalElements: 100,
      },
      clearSelection: clearSelectionSpy,
      isFetching: false,
      fetchDatasetWithAccessRightPage: fetchAccessRightsSpy,
      deleteAccessRight: deleteSpy,
      updateAccessRight: updateSpy,
      createAccessRight: createSpy,
    }
    const enzymeWrapper = shallow(<AccessRightListContainer {...props} />, { context })
    const listComponent = enzymeWrapper.find(AccessRightListComponent)
    expect(listComponent).to.have.length(1)
  })

  it('Check submit a new accessRight', () => {
    const clearSelectionSpy = stub().returns({})
    const fetchAccessRightsSpy = stub().returns({})
    const createSpy = stub().returns({})
    const updateSpy = stub().returns({})
    const deleteSpy = stub().returns({})
    const testAccessGroup = DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup')
    const props = {
      params: {
        project: 'lambda',
      },
      accessGroup: testAccessGroup,
      selectedDatasetsWithAccessright: [],
      meta: {
        number: 1,
        size: 10,
        totalElements: 100,
      },
      clearSelection: clearSelectionSpy,
      isFetching: false,
      fetchDatasetWithAccessRightPage: fetchAccessRightsSpy,
      deleteAccessRight: deleteSpy,
      updateAccessRight: updateSpy,
      createAccessRight: createSpy,
    }

    const dataset = DumpProvider.getFirstEntity('DataManagementClient', 'Dataset')

    const enzymeWrapper = shallow(<AccessRightListContainer {...props} />, { context })

    const datasetWithAccessRight = {
      content: {
        datasetIpId: 'dataset1',
        dataset: dataset.content,
        accessRight: null,
      },
    }

    // Test create a new accessRightForm by using a dataset no defined in the datasets of the dump accessGroups
    assert.isFalse(createSpy.calledOnce, 'No creation should be fired at this state')
    assert.isFalse(updateSpy.calledOnce, 'No update should be fired at this state')
    enzymeWrapper.instance().onSubmit([datasetWithAccessRight], formValues)
    assert.isTrue(createSpy.calledOnce, 'There should a creation of a new accessRights')
    assert.isFalse(updateSpy.calledOnce, 'No update should be fired at this state')
  })

  it('Check submit a update of an existing accessRight', () => {
    const clearSelectionSpy = stub().returns({})
    const fetchAccessRightsSpy = stub().returns({})
    const createSpy = stub().returns({})
    const updateSpy = stub().returns({})
    const deleteSpy = stub().returns({})
    const testAccessGroup = DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup')
    const props = {
      params: {
        project: 'lambda',
      },
      accessGroup: testAccessGroup,
      selectedDatasetsWithAccessright: [],
      meta: {
        number: 1,
        size: 10,
        totalElements: 100,
      },
      clearSelection: clearSelectionSpy,
      isFetching: false,
      fetchDatasetWithAccessRightPage: fetchAccessRightsSpy,
      deleteAccessRight: deleteSpy,
      updateAccessRight: updateSpy,
      createAccessRight: createSpy,
    }

    const enzymeWrapper = shallow(<AccessRightListContainer {...props} />, { context })
    const datasetWithAccessRight = DumpProvider.getEntityBy('DataManagementClient', 'DatasetWithAccessRight', 'content.datasetIpId',
      'URN:AIP:DATASET:project1:873b8085-e4f7-400a-ba4c-dc3f5cf88b7b:V1')

    // Test create a new accessRightForm by using a dataset no defined in the datasets of the dump accessGroups
    assert.isFalse(createSpy.calledOnce, 'No creation should be fired at this state')
    assert.isFalse(updateSpy.calledOnce, 'No update should be fired at this state')
    enzymeWrapper.instance().onSubmit([datasetWithAccessRight], formValues)
    assert.isFalse(createSpy.calledOnce, 'There should be no creation of a new accessRights')
    assert.isTrue(updateSpy.calledOnce, 'Update should be fired at this state')
  })

  it('Check submit a bundle of accessRights with updates and creations', () => {
    const clearSelectionSpy = stub().returns({})
    const fetchAccessRightsSpy = stub().returns({})
    const createSpy = stub().returns({})
    const updateSpy = stub().returns({})
    const deleteSpy = stub().returns({})
    const testAccessGroup = DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup')
    const props = {
      params: {
        project: 'lambda',
      },
      accessGroup: testAccessGroup,
      selectedDatasetsWithAccessright: [],
      meta: {
        number: 1,
        size: 10,
        totalElements: 100,
      },
      clearSelection: clearSelectionSpy,
      isFetching: false,
      fetchDatasetWithAccessRightPage: fetchAccessRightsSpy,
      deleteAccessRight: deleteSpy,
      updateAccessRight: updateSpy,
      createAccessRight: createSpy,
    }

    const enzymeWrapper = shallow(<AccessRightListContainer {...props} />, { context })

    const { accessRight } = DumpProvider.getEntityBy('DataManagementClient', 'DatasetWithAccessRight',
      'content.datasetIpId', 'URN:AIP:DATASET:project1:873b8085-e4f7-400a-ba4c-dc3f5cf88b7b:V1').content
    const dataset = DumpProvider.get('DataManagementClient', 'Dataset')

    const datasetWithAccessRights = [{
      content: {
        datasetIpId: 'dataset1',
        dataset: dataset.content,
        accessRight,
      },
    }, {
      content: {
        datasetIpId: 'dataset2',
        dataset: dataset.content,
        accessRight: null,
      },
    }, {
      content: {
        datasetIpId: 'dataset3',
        dataset: dataset.content,
        accessRight: null,
      },
    }, {
      content: {
        datasetIpId: 'dataset4',
        dataset: dataset.content,
        accessRight: null,
      },
    }, {
      content: {
        datasetIpId: 'dataset5',
        dataset: dataset.content,
        accessRight,
      },
    }]

    // Test create a new accessRightForm by using a dataset no defined in the datasets of the dump accessGroups
    assert.isFalse(createSpy.calledOnce, 'No creation should be fired at this state')
    assert.isFalse(updateSpy.calledOnce, 'No update should be fired at this state')
    enzymeWrapper.instance().onSubmit(datasetWithAccessRights, formValues)
    assert.equal(createSpy.callCount, 3, 'There should 3 creation of a new accessRights')
    assert.equal(updateSpy.callCount, 2, 'There should 2 updates of existing accessRights')
  })
})
