/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import root from 'window-or-global'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { DataManagementClient } from '@regardsoss/client'
import DescriptionFileComponent from '../../../../src/components/description/file/DescriptionFileComponent'
import { DescriptionFileContainer } from '../../../../src/containers/description/file/DescriptionFileContainer'
import DownloadDescriptionClient from '../../../../src/clients/DownloadDescriptionClient'

import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Entities Common] Testing DescriptionFileContainer', () => {
  before(() => {
    root.location = {} // mock root
    testSuiteHelpers.before()
  })
  after(() => {
    delete root.location // remove root mock
    testSuiteHelpers.after()
  })


  it('should exists', () => {
    assert.isDefined(DescriptionFileContainer)
  })
  it('should render no data correctly', () => {
    const props = {
      entity: null,
      downloadDescriptionClient: new DownloadDescriptionClient('test', ['test']),
      // from mapStateToProps
      loading: false,
      accessToken: '0123',
      fetchedDatasetDescriptionResult: {},
      fetchedCollectionDescriptionResult: {},
      dispatchFetchDescription: () => { },
    }
    const enzymeWrapper = shallow(<DescriptionFileContainer {...props} />, { context })
    const descComponent = enzymeWrapper.find(DescriptionFileComponent)
    testSuiteHelpers.assertWrapperProperties(descComponent, { loading: false, descriptionFileURL: null, descriptionFile: null }, 'The corresponding component should be rendered')
  })

  it('should render loading correctly', () => {
    const props = {
      entity: null,
      downloadDescriptionClient: new DownloadDescriptionClient('test', ['test']),
      // from mapStateToProps
      loading: true,
      accessToken: '0123',
      fetchedDatasetDescriptionResult: {},
      fetchedCollectionDescriptionResult: {},
      dispatchFetchDescription: () => { },
    }
    const enzymeWrapper = shallow(<DescriptionFileContainer {...props} />, { context })
    const descComponent = enzymeWrapper.find(DescriptionFileComponent)
    testSuiteHelpers.assertWrapperProperties(descComponent, { loading: true, descriptionFileURL: null, descriptionFile: null }, 'The corresponding component should be rendered')
  })

  it('should not fetch description for non described objects', () => {
    const fetchCount = {
      description: 0,
    }
    const props = {
      downloadDescriptionClient: new DownloadDescriptionClient('test', ['test']),
      // from mapStateToProps
      loading: false,
      accessToken: '0123',
      fetchedDatasetDescriptionResult: {},
      fetchedCollectionDescriptionResult: {},
      dispatchFetchDescription: () => { fetchCount.description += 1 },
      entity: {
        content: {
          entityType: 'DATA',
          ipId: 'URN:AIP:DATA:0',
          label: 'ça',
          model: { id: 0 },
          descriptionFile: { type: 'text/markdown' },
          tags: [],
        },
      },
    }

    const containerWrapper = shallow(<DescriptionFileContainer {...props} />, { context, lifecycleExperimental: true })
    assert.equal(fetchCount.description, 0, 'Description should not be fetched for other entity types')

    const componentWrapper = containerWrapper.find(DescriptionFileComponent)
    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for collection entity')
    assert.isNull(componentWrapper.props().descriptionFileURL, 'The file should use an internal content description!')
    assert.isNull(componentWrapper.props().descriptionFile, 'The file should use an internal content description!')
  })

  it('should not fetch description for externally described objects', () => {
    const fetchCount = {
      description: 0,
    }
    const props = {
      downloadDescriptionClient: new DownloadDescriptionClient('test', ['test']),
      // from mapStateToProps
      loading: false,
      accessToken: '0123',
      fetchedDatasetDescriptionResult: {},
      fetchedCollectionDescriptionResult: {},
      dispatchFetchDescription: () => { fetchCount.description += 1 },
      entity: {
        content: {
          entityType: ENTITY_TYPES_ENUM.COLLECTION,
          ipId: 'URN:AIP:COLLECTION:0',
          label: 'ça',
          model: { id: 0 },
          descriptionFile: {
            url: 'http://www.google.com',
          },
          tags: [],
        },
      },
    }

    const containerWrapper = shallow(<DescriptionFileContainer {...props} />, { context, lifecycleExperimental: true })
    assert.equal(fetchCount.description, 0, 'Description should not be fetched for external description entity types')

    let componentWrapper = containerWrapper.find(DescriptionFileComponent)
    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for collection entity')
    assert.equal(componentWrapper.props().descriptionFileURL, 'http://www.google.com', 'The file should use the external description URL')
    assert.isNull(componentWrapper.props().descriptionFile, 'The file should not use an internal content description!')


    const props2 = {
      ...props,
      entity: {
        content: {
          entityType: ENTITY_TYPES_ENUM.DATASET,
          ipId: 'URN:AIP:DATASET:0',
          label: 'ça',
          model: { id: 1 },
          descriptionFile: {
            url: 'http://www.macron.c.con',
          },
          tags: [],
        },
      },
    }

    containerWrapper.setProps(props2)
    assert.equal(fetchCount.description, 0, 'Description should not be fetched for external description entity types')

    componentWrapper = containerWrapper.find(DescriptionFileComponent)
    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for dataset entity')
    assert.equal(componentWrapper.props().descriptionFileURL, 'http://www.macron.c.con', 'The file should use the external description URL')
    assert.isNull(componentWrapper.props().descriptionFile, 'The file should not use an internal content description!')
  })

  it('should not fetch description for local files where types are handled externally, but provide the reagrds download URL instead', () => {
    const fetchCount = {
      description: 0,
    }

    const ipId = 'URN:AIP:COLLECTION:0'
    const accessToken = '0123'

    const props = {
      downloadDescriptionClient: new DownloadDescriptionClient('test', ['test']),
      // from mapStateToProps
      loading: false,
      accessToken,
      fetchedDatasetDescriptionResult: {},
      fetchedCollectionDescriptionResult: {},
      dispatchFetchDescription: () => { fetchCount.description += 1 },
      entity: {
        content: {
          entityType: ENTITY_TYPES_ENUM.COLLECTION,
          ipId,
          label: 'ça',
          model: { id: 0 },
          descriptionFile: { type: 'jenexistepas/onnemevoitpas' },
          tags: [],
        },
      },
    }

    const containerWrapper = shallow(<DescriptionFileContainer {...props} />, { context, lifecycleExperimental: true })
    assert.equal(fetchCount.description, 0, 'Description should not be fetched for datatypes not locally handled')

    let componentWrapper = containerWrapper.find(DescriptionFileComponent)
    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for collection entity')
    assert.equal(componentWrapper.props().descriptionFileURL,
      DataManagementClient.DownloadDescriptionDefinitions.getDirectDownloadURL(ENTITY_TYPES_ENUM.COLLECTION, ipId, accessToken),
      'The file should use the internal description download URL')
    assert.isNull(componentWrapper.props().descriptionFile, 'The file should not use an internal content description!')

    const datasetIpId = 'URN:AIP:DATASET:0'
    const props2 = {
      ...props,
      entity: {
        content: {
          entityType: ENTITY_TYPES_ENUM.DATASET,
          ipId: datasetIpId,
          label: 'ça',
          model: { id: 1 },
          descriptionFile: { type: 'jenexistepas/onnemevoitpas' },
          tags: [],
        },
      },
    }

    containerWrapper.setProps(props2)
    assert.equal(fetchCount.description, 0, 'Description should not be fetched for datatypes not locally handled')
    componentWrapper = containerWrapper.find(DescriptionFileComponent)
    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for dataset entity')
    assert.equal(componentWrapper.props().descriptionFileURL,
      DataManagementClient.DownloadDescriptionDefinitions.getDirectDownloadURL(ENTITY_TYPES_ENUM.DATASET, datasetIpId, accessToken),
      'The file should use the internal description download URL')
    assert.isNull(componentWrapper.props().descriptionFile, 'The file should not use an internal content description!')
  })

  it('should use the last download description ONLY when it matches entity', () => {
    const fetchCount = {
      description: 0,
    }

    const datasetIpId = 'URN:AIP:DATASET:0'
    const collectionIpId = 'URN:AIP:COLLECTION:0'

    const props = {
      downloadDescriptionClient: new DownloadDescriptionClient('test', ['test']),
      // from mapStateToProps
      loading: false,
      accessToken: '0123',
      dispatchFetchDescription: () => { fetchCount.description += 1 },
      entity: {
        content: {
          entityType: ENTITY_TYPES_ENUM.COLLECTION,
          ipId: datasetIpId,
          label: 'ça',
          model: { id: 1 },
          descriptionFile: { type: 'text/markdown' },
          properties: {
            aproperty: 'entityPropertyValue',
          },
          tags: [],
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

    const containerWrapper = shallow(<DescriptionFileContainer {...props} />, { context, lifecycleExperimental: true })
    assert.equal(fetchCount.description, 1, 'The container should have triggered first fetch')

    let componentWrapper = containerWrapper.find(DescriptionFileComponent)
    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for collection entity')
    assert.deepEqual(componentWrapper.props().descriptionFile, props.fetchedCollectionDescriptionResult, 'The file should be provided for collection (id:0) as it matches')
    assert.isNull(componentWrapper.props().descriptionFileURL, 'There should be no description URL for locally handled types')

    containerWrapper.setProps({
      ...props,
      entity: {
        content: {
          entityType: ENTITY_TYPES_ENUM.DATASET,
          ipId: datasetIpId,
          label: 'ça',
          model: { id: 1 },
          descriptionFile: { type: 'text/markdown' },
          properties: {
            aproperty: 'entityPropertyValue',
          },
          tags: [],
        },
      },
    })
    assert.equal(fetchCount.description, 2, 'The container should have triggered second fetch')

    componentWrapper = containerWrapper.find(DescriptionFileComponent)
    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for dataset entity')
    assert.deepEqual(componentWrapper.props().descriptionFile, props.fetchedDatasetDescriptionResult, 'The file should be provided for dataset (id:101) as it matches')
    assert.isNull(componentWrapper.props().descriptionFileURL, 'There should be no description URL for locally handled types')

    containerWrapper.setProps({
      ...props,
      entity: {
        content: {
          entityType: ENTITY_TYPES_ENUM.COLLECTION,
          ipId: collectionIpId,
          label: 'ça',
          model: { id: 1 },
          descriptionFile: { type: 'text/markdown' },
          properties: {
            aproperty: 'entityPropertyValue',
          },
          tags: [],
        },
      },
    })
    componentWrapper = containerWrapper.find(DescriptionFileComponent)
    assert.equal(fetchCount.description, 3, 'The container should have triggered third fetch')

    assert.equal(componentWrapper.length, 1, 'The corresponding component should be rendered for colection entity (id: 104)')
    assert.isNull(componentWrapper.props().descriptionFile, 'The file should not be provided to non matching entities (handles the download delays)')
    assert.isNull(componentWrapper.props().descriptionFileURL, 'There should be no description URL for locally handled types')
  })
})
