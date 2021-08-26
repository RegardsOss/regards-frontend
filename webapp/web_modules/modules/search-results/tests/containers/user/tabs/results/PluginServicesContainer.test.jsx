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
import { AccessDomain, DamDomain, UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableSelectionModes } from '@regardsoss/components'
import { PluginServicesContainer } from '../../../../../src/containers/user/tabs/results/PluginServicesContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

// Tests render component
const TestComponent = () => <div />

const commonProperties = {
  tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
  viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
  requestParameters: {},
  restrictedDatasetsIds: [],

  toggledElements: {},
  selectionMode: TableSelectionModes.includeSelected,
  emptySelection: true,
  pageMetadata: null,

  serviceRunModel: null,
  contextSelectionServices: [],
  availableDependencies: [],

  dispatchFetchPluginServices: () => { },
  dispatchRunService: () => { },
  dispatchCloseService: () => { },
}

describe('[SEARCH RESULTS] Testing PluginServicesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginServicesContainer)
  })

  it('should render properly without results', () => {
    const props = commonProperties
    const render = shallow(
      <PluginServicesContainer {...props}>
        <TestComponent />
      </PluginServicesContainer>, { context })

    const subCompWrapper = render.find(TestComponent)
    assert.lengthOf(subCompWrapper, 1, 'Test component should be a render')
    assert.isDefined(subCompWrapper.props().selectionServices, 'The test component should have selection service list as property')
    assert.isDefined(subCompWrapper.props().onStartSelectionService, 'The test component should have selection service callback as property')
  })

  it('should dispatch fetch selection services on dataset restriction changes', () => {
    const spiedFetch = {
      datasetId: null,
      count: 0,
    }
    const props = {
      // Component properties
      ...commonProperties,
      restrictedDatasetsIds: ['myId', 'ip1', 'ip2'],
      // specifically spied values
      dispatchFetchPluginServices: (datasetIds) => {
        spiedFetch.datasetIds = datasetIds
        spiedFetch.count += 1
      },
    }

    const render = shallow(
      <PluginServicesContainer {...props}>
        <TestComponent />
      </PluginServicesContainer>, { context })
    assert.equal(spiedFetch.count, 1, 'The plugin services should have been fetched one time')
    assert.deepEqual(spiedFetch.datasetIds, props.restrictedDatasetsIds, 'The plugin services should have been fetched for current dataset IDs')

    // verify that it also works without dataset context
    const withoutDatasetContextProps = {
      ...props,
      restrictedDatasetsIds: [],
    }
    render.setProps(withoutDatasetContextProps)

    assert.equal(spiedFetch.count, 2, 'The plugin services should have been fetched three times')
    assert.isNotOk(spiedFetch.datasetIds, 'The plugin services should have been fetched without specifying datasets IDs')
  })

  it('should resolve available services for current selection', () => {
    const props = {
      // Component properties
      ...commonProperties,
      // For sub component search results
      // specifically spied values
      mapSelectionMode: TableSelectionModes.includeSelected,
      pageMetadata: { number: 0, size: 10, totalElements: 20 },
      emptySelection: false,
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      contextSelectionServices: [{
        content: {
          configId: '1', // common-service-1: should remain in final list when in data mode
          label: 'common-service-1',
          applicationModes: [AccessDomain.applicationModes.MANY],
          entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA],
          type: AccessDomain.pluginTypes.CATALOG,
        },
      }, {
        content: {
          configId: '2', // common-service-2: should remain in final list when in dataset mode
          label: 'common-service-2',
          applicationModes: [AccessDomain.applicationModes.MANY],
          entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATASET],
          type: AccessDomain.pluginTypes.UI,
        },
      }],
      toggledElements: {
        1: {
          content: {
            id: 'DO-IP1',
            label: 'DO-IP1',
            version: 1,
            last: false,
            entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
            providerId: 'provider1',
            model: '1',
            tags: [],
            services: [{
              content: {
                configId: '3', // entity-service-3: should remain in final list in both data and dataset modes as it shared by both entities
                label: 'entity-service-3',
                applicationModes: [AccessDomain.applicationModes.MANY],
                entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA, DamDomain.ENTITY_TYPES_ENUM.DATASET],
                type: AccessDomain.pluginTypes.UI,
              },
            }],
          },
        },
        2: {
          content: {
            id: 'DO-IP2',
            version: 2,
            last: true,
            label: 'DO-IP2',
            entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
            providerId: 'provider1',
            model: '2',
            tags: [],
            services: [{
              content: {
                configId: '3', // entity-service-4: should remain in final list in both data and dataset modes as it shared by both entities
                label: 'entity-service-3',
                applicationModes: [AccessDomain.applicationModes.MANY],
                entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA, DamDomain.ENTITY_TYPES_ENUM.DATASET],
                type: AccessDomain.pluginTypes.UI,
              },
            }, {
              content: {
                configId: '4', // entity-service-4 should be excluded as it is not common to both entity
                label: 'entity-service-4',
                applicationModes: [AccessDomain.applicationModes.MANY],
                entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA, DamDomain.ENTITY_TYPES_ENUM.DATASET],
                type: AccessDomain.pluginTypes.CATALOG,
              },
            }],
          },
        },
      },
    }
    let render = shallow(
      <PluginServicesContainer {...props}>
        <TestComponent />
      </PluginServicesContainer>, { context })
    let selectionServices = render.state('selectionServices')
    assert.lengthOf(selectionServices, 1, 'There should be one service retained for dataobjects (the user doesn\'t currently have rights for catalog service application)')
    assert.isOk(selectionServices.find(({ content: { label } }) => label === 'entity-service-3', `The entity service 3 should be preserved in dataobject selection services ${selectionServices}`))

    // provide user rights for catalog plugins and check catalog services have been added
    const propsWithRights = {
      ...props,
      availableDependencies: ['rs-catalog@/services/{pluginConfigurationBusinessId}/apply@POST'], // specific endpoint rights
    }
    render = shallow(
      <PluginServicesContainer {...propsWithRights}>
        <TestComponent />
      </PluginServicesContainer>, { context })
    selectionServices = render.state('selectionServices')
    assert.lengthOf(selectionServices, 2, 'There should be two services retained for dataobjects (the user has now rights for catalog service application)')
    assert.isOk(selectionServices.find(({ content: { label } }) => label === 'entity-service-3', `The entity service 3 should be preserved in dataobject selection services ${selectionServices}`))
    assert.isOk(selectionServices.find(({ content: { label } }) => label === 'common-service-1', `The context service 1 should be preserved in dataobject selection services ${selectionServices}`))

    // dynamic test: remove selection => no service should be available
    const props2 = {
      ...propsWithRights,
      emptySelection: true,
    }
    render = shallow(
      <PluginServicesContainer {...props2}>
        <TestComponent />
      </PluginServicesContainer>, { context })
    selectionServices = render.state('selectionServices')
    assert.lengthOf(selectionServices, 0, 'There should be no selection services retained')

    // dynamic test: switch to DATASET view mode: only dataset context service and common entities service (valid for DATASET too) should
    // be retained in services (we ignore here the selected elements, as their type doesn't matter in resolution algorithm)
    const props3 = {
      ...propsWithRights,
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
    }
    render = shallow(
      <PluginServicesContainer {...props3}>
        <TestComponent />
      </PluginServicesContainer>, { context })
    selectionServices = render.state('selectionServices')
    assert.lengthOf(selectionServices, 2, 'There should be two services retained for datasets')
    assert.isOk(selectionServices.find(({ content: { label } }) => label === 'common-service-2', `The context service 2 should be preserved in datasets selection services ${selectionServices}`))
    assert.isOk(selectionServices.find(({ content: { label } }) => label === 'entity-service-3', `The entity service 3 should be preserved in datasets selection services ${selectionServices}`))
  })
})
