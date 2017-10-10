/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AccessDomain, CatalogDomain, DamDomain } from '@regardsoss/domain'
import { TableSelectionModes } from '@regardsoss/components'
import { PluginServicesContainer } from '../../../../src/containers/user/results/PluginServicesContainer'
import SearchResultsComponent from '../../../../src/components/user/results/SearchResultsComponent'
import { searchDataobjectsActions } from '../../../../src/clients/SearchEntitiesClient'
import DisplayModeEnum from '../../../../src/models/navigation/DisplayModeEnum'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

const commonSearchResultsProperties = {
  appName: 'test',
  project: 'project',
  allowingFacettes: true,
  showingFacettes: true,
  displayDatasets: true,
  filters: [],

  searchQuery: '',
  facettesQuery: '',
  attributesConf: [],
  attributesRegroupementsConf: [],
  attributeModels: {},
  showingDataobjects: true,
  resultPageActions: searchDataobjectsActions,
  viewMode: DisplayModeEnum.LIST,
  sortingOn: [],

  onFiltersChanged: () => { },
  onSetEntityAsTag: () => { },
  onShowDatasets: () => { },
  onShowDataobjects: () => { },
  onShowListView: () => { },
  onShowTableView: () => { },
  onSortChanged: () => { },
  onToggleShowFacettes: () => { },

  // services
  datasetServices: [],
  selectedDataobjectsServices: [],
  onDatasetServiceSelected: () => { },
  selectionServices: [],
  onStartSelectionService: () => { },
}

const commonProperties = {
  initialDatasetIpId: null,
  selectedDatasetIpId: 'pipo1',
  openSearchQuery: '',
  viewObjectType: CatalogDomain.SearchResultsTargetsEnum.DATAOBJECT_RESULTS,

  levels: [],
  toggledElements: {},
  selectionMode: TableSelectionModes.includeSelected,

  pageMetadata: null,
  serviceRunModel: null,
  contextSelectionServices: [],

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
    const props = {
      // Component properties
      ...commonProperties,
      // For sub component search results
      ...commonSearchResultsProperties,
    }
    const render = shallow(<PluginServicesContainer {...props} />, { context })
    assert.lengthOf(render.find(SearchResultsComponent), 1, 'There should be a sub component of type SearchResultsComponent as this container is a "pass-through"')
  })

  it('should dispatch fetch selection services on selected dataset IP ID, when provided', () => {
    const spiedFetch = {
      datasetIpId: null,
      count: 0,
    }
    const props = {
      // Component properties
      ...commonProperties,
      // For sub component search results
      ...commonSearchResultsProperties,
      // specifically spied values
      selectedDatasetIpId: 'cool:raoul',
      dispatchFetchPluginServices: (datasetIpId) => {
        spiedFetch.datasetIpId = datasetIpId
        spiedFetch.count += 1
      },
    }

    const render = shallow(<PluginServicesContainer {...props} />, { context })
    assert.equal(spiedFetch.count, 1, 'The plugin services should have been fetched one time')
    assert.equal(spiedFetch.datasetIpId, props.selectedDatasetIpId, `The plugin services should have been fetched for "${props.datasetIpId}"`)

    const withoutSelectionProps = {
      ...props,
      selectedDatasetIpId: null, // change selection to none
    }
    render.setProps(withoutSelectionProps)

    assert.equal(spiedFetch.count, 2, 'The plugin services should have been fetched two times')
    assert.equal(spiedFetch.datasetIpId, withoutSelectionProps.selectedDatasetIpId, 'The plugin services should have been fetched for empty selection')
  })

  it('should resolve available services for current selection', () => {
    const props = {
      // Component properties
      ...commonProperties,
      // For sub component search results
      ...commonSearchResultsProperties,
      // specifically spied values
      selectionMode: TableSelectionModes.includeSelected,
      pageMetadata: { number: 0, size: 10, totalElements: 20 },
      selectedDatasetIpId: null,
      viewObjectType: CatalogDomain.SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
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
    let render = shallow(<PluginServicesContainer {...props} />, { context })
    let selectionServices = render.state('selectionServices')
    assert.lengthOf(selectionServices, 1, 'There should be one service retained for dataobjects (the user doesn\'t currently have rights for catalog service application)')
    assert.isOk(selectionServices.find(({ content: { label } }) => label === 'entity-service-3', `The entity service 3 should be preserved in dataobject selection services ${selectionServices}`))

    // provide user rights for catalog plugins and check catalog services have been added
    const propsWithRights = {
      ...props,
      availableDependencies: ['rs-catalog@/services/{puginConfigurationId}/apply@POST'], // specific endpoint rights
    }
    render = shallow(<PluginServicesContainer {...propsWithRights} />, { context })
    selectionServices = render.state('selectionServices')
    assert.lengthOf(selectionServices, 2, 'There should be two services retained for dataobjects (the user has now rights for catalog service application)')
    assert.isOk(selectionServices.find(({ content: { label } }) => label === 'entity-service-3', `The entity service 3 should be preserved in dataobject selection services ${selectionServices}`))
    assert.isOk(selectionServices.find(({ content: { label } }) => label === 'common-service-1', `The context service 1 should be preserved in dataobject selection services ${selectionServices}`))

    // dynamic test: remove selection => no service should be available
    const props2 = {
      ...propsWithRights,
      toggledElements: {},
    }
    render = shallow(<PluginServicesContainer {...props2} />, { context })
    selectionServices = render.state('selectionServices')
    assert.lengthOf(selectionServices, 0, 'There should be no selection services retained')

    // dynamic test: switch to DATASET view mode: only dataset context service and common entities service (valid for DATASET too) should
    // be retained in services (we ignore here the selected elements, as their type doesn't matter in resolution algorithm)
    const props3 = {
      ...propsWithRights,
      viewObjectType: CatalogDomain.SearchResultsTargetsEnum.DATASET_RESULTS,
    }
    render = shallow(<PluginServicesContainer {...props3} />, { context })
    selectionServices = render.state('selectionServices')
    assert.lengthOf(selectionServices, 2, 'There should be two services retained for datasets')
    assert.isOk(selectionServices.find(({ content: { label } }) => label === 'common-service-2', `The context service 2 should be preserved in datasets selection services ${selectionServices}`))
    assert.isOk(selectionServices.find(({ content: { label } }) => label === 'entity-service-3', `The entity service 3 should be preserved in datasets selection services ${selectionServices}`))
  })
})
