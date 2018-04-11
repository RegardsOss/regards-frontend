/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { AccessDomain, DamDomain, CatalogDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableSelectionModes } from '@regardsoss/components'
import { Tag } from '../../../../src/models/navigation/Tag'
import { PluginServicesContainer } from '../../../../src/containers/user/results/PluginServicesContainer'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

// Tests render component
const TestComponent = () => <div />

const commonProperties = {
  viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
  openSearchQuery: '',

  selectedDatasetIpId: 'URN:pipo1',
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

describe('[Search Results] Testing PluginServicesContainer', () => {
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

  it('should dispatch fetch selection services on selected dataset tag / restricted datasets if any', () => {
    const spiedFetch = {
      datasetIpId: null,
      count: 0,
    }
    const props = {
      // Component properties
      ...commonProperties,
      // specifically spied values
      selectedDatasetTag: new Tag(CatalogDomain.TagTypes.DATASET, 'myLabel', 'myIpId'),
      restrictedDatasetsIpIds: ['ip1', 'ip2'],
      dispatchFetchPluginServices: (datasetIpIds) => {
        spiedFetch.datasetIpIds = datasetIpIds
        spiedFetch.count += 1
      },
    }

    const render = shallow(
      <PluginServicesContainer {...props}>
        <TestComponent />
      </PluginServicesContainer>, { context })
    assert.equal(spiedFetch.count, 1, 'The plugin services should have been fetched one time')
    assert.deepEqual(spiedFetch.datasetIpIds, ['myIpId'], 'The plugin services should have been fetched for current tag searchKey "myIpId"')

    const withoutSelectionProps = {
      ...props,
      selectedDatasetTag: null, // change selection to none
    }
    render.setProps(withoutSelectionProps)

    assert.equal(spiedFetch.count, 2, 'The plugin services should have been fetched two times')
    assert.deepEqual(spiedFetch.datasetIpIds, props.restrictedDatasetsIpIds, 'The plugin services should have been fetched for dataset restricted context')

    // verify that it also works without dataset context
    const withoutDatasetContextProps = {
      ...props,
      selectedDatasetTag: null, // change selection to none
      restrictedDatasetsIpIds: undefined, // change context to none
    }
    render.setProps(withoutDatasetContextProps)

    assert.equal(spiedFetch.count, 3, 'The plugin services should have been fetched three times')
    assert.isNotOk(spiedFetch.datasetIpIds, 'The plugin services should have been fetched without specifying datasets context nor tag')
  })

  it('should resolve available services for current selection', () => {
    const props = {
      // Component properties
      ...commonProperties,
      // For sub component search results
      // specifically spied values
      selectionMode: TableSelectionModes.includeSelected,
      pageMetadata: { number: 0, size: 10, totalElements: 20 },
      emptySelection: false,
      selectedDatasetIpId: null,
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      contextSelectionServices: [{
        content: {
          configId: 1, // common-service-1: should remain in final list when in data mode
          label: 'common-service-1',
          applicationModes: [AccessDomain.applicationModes.MANY],
          entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA],
          type: AccessDomain.pluginTypes.CATALOG,
        },
      }, {
        content: {
          configId: 2, // common-service-2: should remain in final list when in dataset mode
          label: 'common-service-2',
          applicationModes: [AccessDomain.applicationModes.MANY],
          entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATASET],
          type: AccessDomain.pluginTypes.UI,
        },
      }],
      toggledElements: {
        1: {
          content: {
            id: 1,
            ipId: 'DO-IP1',
            label: 'DO-IP1',
            entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
            tags: [],
            services: [{
              content: {
                configId: 3, // entity-service-3: should remain in final list in both data and dataset modes as it shared by both entities
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
            id: 2,
            ipId: 'DO-IP2',
            label: 'DO-IP2',
            entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
            tags: [],
            services: [{
              content: {
                configId: 3, // entity-service-3: should remain in final list in both data and dataset modes as it shared by both entities
                label: 'entity-service-3',
                applicationModes: [AccessDomain.applicationModes.MANY],
                entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA, DamDomain.ENTITY_TYPES_ENUM.DATASET],
                type: AccessDomain.pluginTypes.UI,
              },
            }, {
              content: {
                configId: 4, // entity-service-4 should be excluded as it is not common to both entity
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
      availableDependencies: ['rs-catalog@/services/{pluginConfigurationId}/apply@POST'], // specific endpoint rights
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
