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
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AccessGroupAccessRightsContainer } from '../../src/containers/AccessGroupAccessRightsContainer'
import AccessRightListContainer from '../../src/containers/AccessRightListContainer'
import AccessRightEnum from '../../src/components/AccessRightsEnum'

const context = buildTestContext()

const formValues = {
  access: AccessRightEnum.METADATA_ACCESS_ENUM.DATASET_AND_OBJECT_ACCESS,
  dataAccess: AccessRightEnum.DATA_ACCESS_ENUM.AUTHORIZED,
  quality: {
    max: 0,
    min: 0,
    level: AccessRightEnum.QUALITY_LEVEL_ENUM.ACCEPTED,
  },
}

/**
 * Tests
 *
 * @author Sébastien Binda
 */
describe('[ADMIN ACCESSRIGHT MANAGEMENT] Testing AccessGroupAccessRightsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessGroupAccessRightsContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Render properly a loading component', () => {
    const fetchAccessRightsSpy = stub().returns({})
    const fetchAccessGroupSpy = stub().returns({})
    const fetchPluginConfsSpy = stub().returns({})
    const fetchPluginMetaSpy = stub().returns({})
    const props = {
      // from router
      params: {
        project: 'lambda',
        accessgroup: 'test',
      },
      // from mapStateToProps
      accessGroup: DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup'),
      accessRights: DumpProvider.get('DataManagementClient', 'AccessRight'),
      pluginConfigurationList: {},
      pluginMetaDataList: {},

      // from mapDispatchToProps
      fetchAccessRights: fetchAccessRightsSpy,
      fetchAccessGroup: fetchAccessGroupSpy,
      fetchPluginConfigurationList: fetchPluginConfsSpy,
      fetchPluginMetaDataList: fetchPluginMetaSpy,
      updateAccessRight: () => {
      },
      createAccessRight: () => {
      },
      deleteAccessRight: () => {
      },
    }
    const enzymeWrapper = shallow(<AccessGroupAccessRightsContainer {...props} />, {
      context,
      lifecycleExperimental: true,
    })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)

    assert.isTrue(fetchAccessGroupSpy.calledOnce, 'The fetch AccessGroup method should be fetch once.')
    assert.isTrue(fetchPluginConfsSpy.calledOnce, 'The fetch plugin configurations method should be fetch once.')
    assert.isTrue(fetchPluginMetaSpy.calledOnce, 'The fetch plugin metadata method should be fetch once.')

    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })

  it('Render properly', () => {
    const fetchAccessRightsSpy = stub().returns({})
    const fetchAccessGroupSpy = stub().returns({})
    const fetchPluginConfsSpy = stub().returns({})
    const fetchPluginMetaSpy = stub().returns({})
    const props = {
      // from router
      params: {
        project: 'lambda',
        accessgroup: 'test',
      },
      // from mapStateToProps
      accessGroup: DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup'),
      accessRights: DumpProvider.get('DataManagementClient', 'AccessRight'),
      pluginConfigurationList: {},
      pluginMetaDataList: {},

      // from mapDispatchToProps
      fetchAccessRights: fetchAccessRightsSpy,
      fetchAccessGroup: fetchAccessGroupSpy,
      fetchPluginConfigurationList: fetchPluginConfsSpy,
      fetchPluginMetaDataList: fetchPluginMetaSpy,
      updateAccessRight: () => {
      },
      createAccessRight: () => {
      },
      deleteAccessRight: () => {
      },
    }

    const enzymeWrapper = shallow(<AccessGroupAccessRightsContainer {...props} />, {
      context,
      lifecycleExperimental: true,
    })

    // Simulate loading end
    enzymeWrapper.setState({
      loading: false,
    })
    let loader = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.isFalse(loader.props().isLoading, 'Loading should be false')
    assert.isFalse(loader.props().isContentError, 'Content error should be false')

    loader = loader.dive()
    const component = loader.find(AccessRightListContainer)
    assert.isTrue(component.length === 1, 'There should be a AccessRightListContainer rendered')
    assert.equal(component.props().accessGroup, props.accessGroup, 'The accessGroup passed to AccessRightListContainer should the same as AccessGroupAccessRightsContainer')
  })


  it('Check submit a new accessRight', () => {
    const fetchAccessRightsSpy = stub().returns({})
    const createSpy = stub().returns({})
    const updateSpy = stub().returns({})

    const testAccessGroup = DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup')
    const props = {
      // from router
      params: {
        project: 'lambda',
        accessgroup: 'test',
      },
      // from mapStateToProps
      accessGroup: testAccessGroup,
      accessRights: DumpProvider.get('DataManagementClient', 'AccessRight'),
      pluginConfigurationList: {},
      pluginMetaDataList: {},

      // from mapDispatchToProps
      fetchAccessRights: fetchAccessRightsSpy,
      fetchAccessGroup: () => {
      },
      fetchPluginConfigurationList: () => {
      },
      fetchPluginMetaDataList: () => {
      },
      updateAccessRight: updateSpy,
      createAccessRight: createSpy,
      deleteAccessRight: () => {
      },
    }

    const enzymeWrapper = shallow(<AccessGroupAccessRightsContainer {...props} />, {
      context,
      lifecycleExperimental: true,
    })

    const dataset = {
      content: {
        id: 10000,
        label: 'test',
      },
    }

    // Test create a new accessRightForm by using a dataset no defined in the datasets of the dump accessGroups
    assert.isFalse(createSpy.calledOnce, 'No creation should be fired at this state')
    assert.isFalse(updateSpy.calledOnce, 'No update should be fired at this state')
    enzymeWrapper.instance().onSubmit([dataset], formValues)
    assert.isTrue(createSpy.calledOnce, 'There should a creation of a new accessRights')
    assert.isFalse(updateSpy.calledOnce, 'No update should be fired at this state')
  })

  it('Check submit a update of an existing accessRight', () => {
    const fetchAccessRightsSpy = stub().returns({})
    const createSpy = stub().returns({})
    const updateSpy = stub().returns({})

    const testAccessGroup = DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup')
    const props = {
      // from router
      params: {
        project: 'lambda',
        accessgroup: 'test',
      },
      // from mapStateToProps
      accessGroup: testAccessGroup,
      accessRights: DumpProvider.get('DataManagementClient', 'AccessRight'),
      pluginConfigurationList: {},
      pluginMetaDataList: {},

      // from mapDispatchToProps
      fetchAccessRights: fetchAccessRightsSpy,
      fetchAccessGroup: () => {
      },
      fetchPluginConfigurationList: () => {
      },
      fetchPluginMetaDataList: () => {
      },
      updateAccessRight: updateSpy,
      createAccessRight: createSpy,
      deleteAccessRight: () => {
      },
    }

    const enzymeWrapper = shallow(<AccessGroupAccessRightsContainer {...props} />, {
      context,
      lifecycleExperimental: true,
    })

    const dataset = {
      content: {
        id: 1,
        label: 'test',
      },
    }

    // Test create a new accessRightForm by using a dataset no defined in the datasets of the dump accessGroups
    assert.isFalse(createSpy.calledOnce, 'No creation should be fired at this state')
    assert.isFalse(updateSpy.calledOnce, 'No update should be fired at this state')
    enzymeWrapper.instance().onSubmit([dataset], formValues)
    assert.isFalse(createSpy.calledOnce, 'There should a creation of a new accessRights')
    assert.isTrue(updateSpy.calledOnce, 'No update should be fired at this state')
  })


  it('Check submit a bundle of accessRights with updates and creations', () => {
    const fetchAccessRightsSpy = stub().returns({})
    const createSpy = stub().returns({})
    const updateSpy = stub().returns({})

    const testAccessGroup = DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup')
    const props = {
      // from router
      params: {
        project: 'lambda',
        accessgroup: 'test',
      },
      // from mapStateToProps
      accessGroup: testAccessGroup,
      accessRights: DumpProvider.get('DataManagementClient', 'AccessRight'),
      pluginConfigurationList: {},
      pluginMetaDataList: {},

      // from mapDispatchToProps
      fetchAccessGroup: () => {
      },
      fetchPluginConfigurationList: () => {
      },
      fetchPluginMetaDataList: () => {
      },
      fetchAccessRights: fetchAccessRightsSpy,
      updateAccessRight: updateSpy,
      createAccessRight: createSpy,
      deleteAccessRight: () => {
      },
    }

    const enzymeWrapper = shallow(<AccessGroupAccessRightsContainer {...props} />, {
      context,
      lifecycleExperimental: true,
    })

    const datasets = [{
      content: {
        id: 1,
        label: 'test',
      },
    }, {
      content: {
        id: 4,
        label: 'test',
      },
    },
    {
      content: {
        id: 10000,
        label: 'newTest',
      },
    },
    {
      content: {
        id: 10001,
        label: 'newTest',
      },
    },
    {
      content: {
        id: 10002,
        label: 'newTest',
      },
    }]

    // Test create a new accessRightForm by using a dataset no defined in the datasets of the dump accessGroups
    assert.isFalse(createSpy.calledOnce, 'No creation should be fired at this state')
    assert.isFalse(updateSpy.calledOnce, 'No update should be fired at this state')
    enzymeWrapper.instance().onSubmit(datasets, formValues)
    assert.equal(createSpy.callCount, 3, 'There should 3 creation of a new accessRights')
    assert.equal(updateSpy.callCount, 2, 'There should 2 updates of existing accessRights')
  })
})
