/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DataManagementClient } from '@regardsoss/client'
import { CatalogEntityTypes } from '@regardsoss/model'
import { getTypeRender } from '@regardsoss/attributes-common'
import DetailViewComponent from '../../../src/components/detail/DetailViewComponent'
import { DetailViewContainer } from '../../../src/containers/detail/DetailViewContainer'
import DownloadDescriptionClient from '../../../src/clients/DownloadDescriptionClient'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

const mockDescClient = new DownloadDescriptionClient('common', [])
const mockAttrActions = new DataManagementClient.ModelAttributesActions('common')
const mockAttrSelectors = DataManagementClient.ModelAttributesSelectors([])

const defaultProps = {
  open: true,

  dialogHeightPercent: 15,
  dialogWidthPercent: 15,
  onClose: () => { },
  fetchModelAttributesActions: mockAttrActions,
  fetchModelAttributesSelectors: mockAttrSelectors,
  downloadDescriptionClient: mockDescClient,
  loading: false,
  fetchedModelAttributes: null,
  fetchedDatasetDescriptionResult: null,
  fetchedCollectionDescriptionResult: null,
  dispatchFetchDescription: () => { },
  dispatchFetchModelAttributes: () => { },

}

describe('[Entities Common] Testing DetailViewContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DetailViewContainer)
  })
  it('should render properly and fetch attribute models / description for locally handled file types', () => {
    const fetchCount = {
      attributes: 0,
      description: 0,
    }
    const props = {
      ...defaultProps,
      dispatchFetchDescription: () => { fetchCount.description += 1 },
      dispatchFetchModelAttributes: () => { fetchCount.attributes += 1 },
      entity: {
        content: {
          entityType: CatalogEntityTypes.COLLECTION,
          ipId: 'URN:AIP:COLLECTION:0',
          label: 'ça',
          model: { id: 0 },
          descriptionFile: { type: 'text/markdown' },
        },
      },
    }

    const containerWrapper = shallow(<DetailViewContainer {...props} />, { context, lifecycleExperimental: true })
    assert.equal(fetchCount.attributes, 1, 'Attributes should have been fetched for initial collection entity')
    assert.equal(fetchCount.description, 1, 'Description should have been fetched for initial collection entity')
    let componentWrapper = containerWrapper.find(DetailViewComponent)
    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for collection entity')
    assert.isNull(componentWrapper.props().descriptionFileURL, 'The file should use an internal content description!')
    // cannot test file, as it is provided by download

    const props2 = {
      ...props,
      entity: {
        content: {
          entityType: CatalogEntityTypes.DATASET,
          ipId: 'URN:AIP:DATASET:0',
          label: 'ça',
          model: { id: 1 },
          descriptionFile: { type: 'text/markdown' },
        },
      },
    }
    containerWrapper.setProps(props2)
    assert.equal(fetchCount.attributes, 2, 'Attributes should have been fetched for next dataset entity')
    assert.equal(fetchCount.description, 2, 'Description should have been fetched for next dataset entity')
    componentWrapper = containerWrapper.find(DetailViewComponent)
    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for collection entity')
    assert.isNull(componentWrapper.props().descriptionFileURL, 'The file should use an internal content description!')
    // cannot test file, as it is provided by download
  })
  it('should not fetch description for non described objects', () => {
    const fetchCount = {
      attributes: 0,
      description: 0,
    }
    const props = {
      ...defaultProps,
      dispatchFetchDescription: () => { fetchCount.description += 1 },
      dispatchFetchModelAttributes: () => { fetchCount.attributes += 1 },
      entity: {
        content: {
          entityType: 'DATA',
          ipId: 'URN:AIP:DATA:0',
          label: 'ça',
          model: { id: 0 },
          descriptionFile: { type: 'text/markdown' },
        },
      },
    }

    const containerWrapper = shallow(<DetailViewContainer {...props} />, { context, lifecycleExperimental: true })
    assert.equal(fetchCount.attributes, 1, 'Attributes should have been fetched for entity')
    assert.equal(fetchCount.description, 0, 'Description should not be fetched for other entity types')

    const componentWrapper = containerWrapper.find(DetailViewComponent)
    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for collection entity')
    assert.isNull(componentWrapper.props().descriptionFileURL, 'The file should use an internal content description!')
    assert.isNull(componentWrapper.props().descriptionFile, 'The file should use an internal content description!')
  })
  it('should not fetch description for externally described objects', () => {
    const fetchCount = {
      attributes: 0,
      description: 0,
    }
    const props = {
      ...defaultProps,
      dispatchFetchDescription: () => { fetchCount.description += 1 },
      dispatchFetchModelAttributes: () => { fetchCount.attributes += 1 },
      entity: {
        content: {
          entityType: CatalogEntityTypes.COLLECTION,
          ipId: 'URN:AIP:COLLECTION:0',
          label: 'ça',
          model: { id: 0 },
          descriptionFile: {
            url: 'http://www.google.com',
          },
        },
      },
    }

    const containerWrapper = shallow(<DetailViewContainer {...props} />, { context, lifecycleExperimental: true })
    assert.equal(fetchCount.attributes, 1, 'Attributes should have been fetched for entity')
    assert.equal(fetchCount.description, 0, 'Description should not be fetched for external description entity types')

    let componentWrapper = containerWrapper.find(DetailViewComponent)
    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for collection entity')
    assert.equal(componentWrapper.props().descriptionFileURL, 'http://www.google.com', 'The file should use the external description URL')
    assert.isNull(componentWrapper.props().descriptionFile, 'The file should not use an internal content description!')

    const props2 = {
      ...props,
      entity: {
        content: {
          entityType: CatalogEntityTypes.DATASET,
          ipId: 'URN:AIP:DATASET:0',
          label: 'ça',
          model: { id: 1 },
          descriptionFile: {
            url: 'http://www.macron.c.con',
          },
        },
      },
    }

    containerWrapper.setProps(props2)
    assert.equal(fetchCount.attributes, 2, 'Attributes should have been fetched for entity')
    assert.equal(fetchCount.description, 0, 'Description should not be fetched for external description entity types')

    componentWrapper = containerWrapper.find(DetailViewComponent)
    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for dataset entity')
    assert.equal(componentWrapper.props().descriptionFileURL, 'http://www.macron.c.con', 'The file should use the external description URL')
    assert.isNull(componentWrapper.props().descriptionFile, 'The file should not use an internal content description!')
  })
  it('should not fetch description for local files where types are handled externally, but provide the reagrds download URL instead', () => {
    const fetchCount = {
      attributes: 0,
      description: 0,
    }

    const ipId = 'URN:AIP:COLLECTION:0'

    const props = {
      ...defaultProps,
      dispatchFetchDescription: () => { fetchCount.description += 1 },
      dispatchFetchModelAttributes: () => { fetchCount.attributes += 1 },
      entity: {
        content: {
          entityType: CatalogEntityTypes.COLLECTION,
          ipId,
          label: 'ça',
          model: { id: 0 },
          descriptionFile: { type: 'jenexistepas/onnemevoitpas' },
        },
      },
    }

    const containerWrapper = shallow(<DetailViewContainer {...props} />, { context, lifecycleExperimental: true })
    assert.equal(fetchCount.attributes, 1, 'Attributes should have been fetched for entity')
    assert.equal(fetchCount.description, 0, 'Description should not be fetched for datatypes not locally handled')

    let componentWrapper = containerWrapper.find(DetailViewComponent)
    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for collection entity')
    assert.equal(componentWrapper.props().descriptionFileURL, DataManagementClient.DownloadDescriptionDefinitions.getDirectDownloadURL(CatalogEntityTypes.COLLECTION, ipId), 'The file should use the internal description download URL')
    assert.isNull(componentWrapper.props().descriptionFile, 'The file should not use an internal content description!')

    const datasetIpId = 'URN:AIP:DATASET:0'
    const props2 = {
      ...props,
      entity: {
        content: {
          entityType: CatalogEntityTypes.DATASET,
          ipId: datasetIpId,
          label: 'ça',
          model: { id: 1 },
          descriptionFile: { type: 'jenexistepas/onnemevoitpas' },
        },
      },
    }

    containerWrapper.setProps(props2)
    assert.equal(fetchCount.attributes, 2, 'Attributes should have been fetched for entity')
    assert.equal(fetchCount.description, 0, 'Description should not be fetched for datatypes not locally handled')
    componentWrapper = containerWrapper.find(DetailViewComponent)
    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for dataset entity')
    assert.equal(componentWrapper.props().descriptionFileURL, DataManagementClient.DownloadDescriptionDefinitions.getDirectDownloadURL(CatalogEntityTypes.DATASET, datasetIpId), 'The file should use the internal description download URL')
    assert.isNull(componentWrapper.props().descriptionFile, 'The file should not use an internal content description!')
  })

  it('should convert correctly attribute models when receiving them (after fetch)', () => {
    const props = {
      ...defaultProps,
      entity: {
        content: {
          entityType: CatalogEntityTypes.DATASET,
          ipId: 'URN:AIP:DATASET:0',
          label: 'ça',
          model: { id: 1 },
          descriptionFile: { type: 'jenexistepas/onnemevoitpas' },
          properties: {
            aproperty: 'entityPropertyValue',
          },
        },
      },
      fetchedModelAttributes: {
        0: {
          content:
          {
            model:
            {
              id: 0,
              name: 'Missions',
              type: 'COLLECTION',
              description: 'Describes a mission collection',
            },
            id: 0,
            mode: 'idc',
            attribute: {
              id: 0,
              name: 'aproperty',
              label: 'A Property Label',
              type: 'string',
              fragment: { id: 0, name: 'DEFAULT' },
            },
          },
        },
      },
      fetchedDatasetDescriptionResult: null,
      fetchedCollectionDescriptionResult: null,
    }

    const containerWrapper = shallow(<DetailViewContainer {...props} />, { context, lifecycleExperimental: true })
    let componentWrapper = containerWrapper.find(DetailViewComponent)
    assert.deepEqual(componentWrapper.props().attributes, [{
      id: 0,
      label: 'A Property Label',
      renderer: getTypeRender('string'),
      renderValue: { main: 'entityPropertyValue' },
    }], 'Attributes, when received, should be resolved as expected by child component')

    const props2 = {
      ...props,
      entity: {
        content: {
          entityType: CatalogEntityTypes.DATASET,
          ipId: 'URN:AIP:DATASET:0',
          label: 'ça',
          model: { id: 1 },
          descriptionFile: { type: 'jenexistepas/onnemevoitpas' },
        },
      },
    }
    containerWrapper.setProps(props2)
    componentWrapper = containerWrapper.find(DetailViewComponent)
    assert.deepEqual(componentWrapper.props().attributes, [{
      id: 0,
      label: 'A Property Label',
      renderer: getTypeRender('string'),
      renderValue: null,
    }], 'When entity changes but not attributes, resolution should be perfomed again')

    const props3 = {
      ...props,
      fetchedModelAttributes: {},
    }
    containerWrapper.setProps(props3)
    componentWrapper = containerWrapper.find(DetailViewComponent)
    assert.deepEqual(componentWrapper.props().attributes, [], 'When attributes change, resolution should be performed again')
  })

  it('should use the last download description ONLY when it matches entity', () => {
    const datasetIpId = 'URN:AIP:DATASET:0'
    const collectionIpId = 'URN:AIP:COLLECTION:0'

    const props = {
      ...defaultProps,
      entity: {
        content: {
          entityType: CatalogEntityTypes.COLLECTION,
          ipId: datasetIpId,
          label: 'ça',
          model: { id: 1 },
          descriptionFile: { type: 'text/markdown' },
          properties: {
            aproperty: 'entityPropertyValue',
          },
        },
      },
      fetchedDatasetDescriptionResult: {
        entityId: datasetIpId,
        contentType: DataManagementClient.DownloadDescriptionDefinitions.MARKDOWN_MIMETYPE,
        content: '#Hello collection!',
      },
      fetchedCollectionDescriptionResult: {
        entityId: datasetIpId,
        contentType: DataManagementClient.DownloadDescriptionDefinitions.MARKDOWN_MIMETYPE,
        content: '#Hello collection!',
      },
    }

    const containerWrapper = shallow(<DetailViewContainer {...props} />, { context, lifecycleExperimental: true })
    let componentWrapper = containerWrapper.find(DetailViewComponent)
    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for collection entity')
    assert.deepEqual(componentWrapper.props().descriptionFile, props.fetchedCollectionDescriptionResult, 'The file should be provided for collection (id:0) as it matches')
    assert.isNull(componentWrapper.props().descriptionFileURL, 'There should be no description URL for locally handled types')

    containerWrapper.setProps({
      ...props,
      entity: {
        content: {
          entityType: CatalogEntityTypes.DATASET,
          ipId: datasetIpId,
          label: 'ça',
          model: { id: 1 },
          descriptionFile: { type: 'text/markdown' },
          properties: {
            aproperty: 'entityPropertyValue',
          },
        },
      },
    })
    componentWrapper = containerWrapper.find(DetailViewComponent)
    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for dataset entity')
    assert.deepEqual(componentWrapper.props().descriptionFile, props.fetchedDatasetDescriptionResult, 'The file should be provided for dataset (id:101) as it matches')
    assert.isNull(componentWrapper.props().descriptionFileURL, 'There should be no description URL for locally handled types')

    containerWrapper.setProps({
      ...props,
      entity: {
        content: {
          entityType: CatalogEntityTypes.COLLECTION,
          ipId: collectionIpId,
          label: 'ça',
          model: { id: 1 },
          descriptionFile: { type: 'text/markdown' },
          properties: {
            aproperty: 'entityPropertyValue',
          },
        },
      },
    })
    componentWrapper = containerWrapper.find(DetailViewComponent)
    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for colection entity (id: 104)')
    assert.isNull(componentWrapper.props().descriptionFile, 'The file should not be provided to non matching entities (handles the download delays)')
    assert.isNull(componentWrapper.props().descriptionFileURL, 'There should be no description URL for locally handled types')
  })
})
