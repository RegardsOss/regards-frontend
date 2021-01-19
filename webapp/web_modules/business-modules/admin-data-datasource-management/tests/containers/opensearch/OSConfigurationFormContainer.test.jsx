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
import { assert } from 'chai'
import { shallow } from 'enzyme'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { OSConfigurationFormContainer } from '../../../src/containers/opensearch/OSConfigurationFormContainer'
import OSCrawlerConfigurationContainer from '../../../src/containers/opensearch/OSCrawlerConfigurationContainer'
import OSQueryConfigurationContainer from '../../../src/containers/opensearch/OSQueryConfigurationContainer'
import OSResultsConfigurationContainer from '../../../src/containers/opensearch/OSResultsConfigurationContainer'
import { datasourceDump } from '../../dumps/opensearch-datasource.dump'

// mock router
const router = require('react-router')

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing OSConfigurationFormContainer', () => {
  before(() => {
    // mocking router browser history
    router.browserHistory = {
      push: () => {},
    }
    testSuiteHelpers.before()
  })
  after(() => {
    delete router.browserHistory
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(OSConfigurationFormContainer)
  })

  it('should render correctly for creation', () => {
    const spyData = {
      create: {
        count: 0,
        data: null,
      },
      update: {
        count: 0,
        data: null,
        datasourceId: null,
      },
      fetch: {
        count: 0,
        datasourceId: null,
      },
    }
    const props = {
      params: {
        project: 'any',
      },
      createDatasource: (values) => {
        spyData.create.count += 1
        spyData.create.data = values
        return new Promise((resolve) => resolve({}))
      },
      updateDatasouce: (id, values) => {
        spyData.update.count += 1
        spyData.update.datasourceId = id
        spyData.update.data = values
        return new Promise((resolve) => resolve({}))
      },
      fetchDatasource: (id) => {
        spyData.fetch.count += 1
        spyData.fetch.datasourceId = id
      },
    }

    const wrapper = shallow(<OSConfigurationFormContainer {...props} />, { context })
    // check fetch was not called
    assert.equal(spyData.fetch.count, 0, 'No data source should have been fetched for creation')

    let currentState = wrapper.state()
    assert.deepEqual(wrapper.state(), {
      isEditing: false,
      ready: true,
      formValues: OSConfigurationFormContainer.INITIAL_CREATION_VALUES,
      formState: OSConfigurationFormContainer.STATE.CRAWLER,
    }, 'Should define correctly initial state for creation')
    // check content is displayed
    const loadableDecorator = wrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loadableDecorator, 1, 'There should be loadable decorator')
    assert.isFalse(loadableDecorator.props().isLoading, 'Loadable decorator should not show loader')
    // Check first step container is shown and no other
    let crawlerContainer = wrapper.find(OSCrawlerConfigurationContainer)
    let queryContainer = wrapper.find(OSQueryConfigurationContainer)
    let resultsContainer = wrapper.find(OSResultsConfigurationContainer)
    assert.lengthOf(crawlerContainer, 1, 'There should be crawler container at first step')
    testSuiteHelpers.assertWrapperProperties(crawlerContainer, {
      project: props.params.project,
      initialValues: currentState.formValues.crawler,
      isEditing: false,
      onBack: wrapper.instance().handleBack,
      onSubmit: wrapper.instance().onCrawlerSubmit,
    }, 'Crawler container properties should be correctly set')
    assert.lengthOf(queryContainer, 0, 'There should not be query container at first step')
    assert.lengthOf(resultsContainer, 0, 'There should not be results container at first step')
    // Simulate next step using dumb form values
    wrapper.instance().onCrawlerSubmit({ name: 'myCrawlerValues' })
    currentState = wrapper.state()
    assert.deepEqual(currentState, {
      isEditing: false,
      ready: true,
      formValues: {
        crawler: {
          name: 'myCrawlerValues',
        },
        query: { },
        results: { },
      },
      formState: OSConfigurationFormContainer.STATE.QUERY,
    }, 'Should defined correctly state after first step validation')

    // Check second step container is shown and no other
    crawlerContainer = wrapper.find(OSCrawlerConfigurationContainer)
    queryContainer = wrapper.find(OSQueryConfigurationContainer)
    resultsContainer = wrapper.find(OSResultsConfigurationContainer)
    assert.lengthOf(crawlerContainer, 0, 'There should not be crawler container at second step')
    assert.lengthOf(queryContainer, 1, 'There should be query container at second step')
    testSuiteHelpers.assertWrapperProperties(queryContainer, {
      initialValues: currentState.formValues.query,
      isEditing: false,
      onBack: wrapper.instance().handleBack,
      onSubmit: wrapper.instance().onQuerySubmit,
    }, 'Crawler container properties should be correctly set')
    assert.lengthOf(resultsContainer, 0, 'There should not be results container at second step')
    // Simulate last step using dumb form values
    wrapper.instance().onQuerySubmit({ name: 'myQueryValues' })
    currentState = wrapper.state()
    assert.deepEqual(currentState, {
      isEditing: false,
      ready: true,
      formValues: {
        crawler: { name: 'myCrawlerValues' },
        query: { name: 'myQueryValues' },
        results: { },
      },
      formState: OSConfigurationFormContainer.STATE.RESULTS,
    }, 'Should defined correctly state after second step validation')

    // Check second step container is shown and no other
    crawlerContainer = wrapper.find(OSCrawlerConfigurationContainer)
    queryContainer = wrapper.find(OSQueryConfigurationContainer)
    resultsContainer = wrapper.find(OSResultsConfigurationContainer)
    assert.lengthOf(crawlerContainer, 0, 'There should not be crawler container at last step')
    assert.lengthOf(queryContainer, 0, 'There should not be query container at last step')
    assert.lengthOf(resultsContainer, 1, 'There should be results container at last step')
    testSuiteHelpers.assertWrapperProperties(resultsContainer, {
      initialValues: currentState.formValues.results,
      isEditing: false,
      onBack: wrapper.instance().handleBack,
      onSubmit: wrapper.instance().onResultsSubmit,
    }, 'Crawler container properties should be correctly set')

    // Finally check committed values (verify first nothing was called)
    assert.equal(spyData.create.count, 0, 'Create should not have been called yet')
    assert.equal(spyData.update.count, 0, 'Update should not have been called yet')

    wrapper.instance().onResultsSubmit({ name: 'myResultsValues' })
    assert.equal(spyData.update.count, 0, 'Update should not have been called for creation')
    assert.equal(spyData.create.count, 1, 'Create should have been called for creation')
    // Note: conversion is not tested
    assert.isOk(spyData.create.data, 'Some data should have been committed')
  })
  it('should render correctly for edition', () => {
    const spyData = {
      create: {
        count: 0,
        data: null,
      },
      update: {
        count: 0,
        data: null,
        datasourceId: null,
      },
      fetch: {
        count: 0,
        datasourceId: null,
      },
    }
    const props = {
      params: {
        project: 'any',
        datasourceId: '1',
      },
      createDatasource: (values) => {
        spyData.create.count += 1
        spyData.create.data = values
        return new Promise((resolve) => resolve({}))
      },
      updateDatasouce: (id, values) => {
        spyData.update.count += 1
        spyData.update.datasourceId = id
        spyData.update.data = values
        return new Promise((resolve) => resolve({}))
      },
      fetchDatasource: (id) => {
        spyData.fetch.count += 1
        spyData.fetch.datasourceId = id
      },
    }

    const wrapper = shallow(<OSConfigurationFormContainer {...props} />, { context })
    // check fetch was called
    assert.equal(spyData.fetch.count, 1, 'Datasource should have been fetched')

    let currentState = wrapper.state()
    assert.deepEqual(wrapper.state(), {
      isEditing: true,
      ready: false, // waiting for model
      formValues: OSConfigurationFormContainer.INITIAL_CREATION_VALUES,
      formState: OSConfigurationFormContainer.STATE.CRAWLER,
    }, 'Should define correctly initial state for creation')
    // check content is hidden while loading
    let loadableDecorator = wrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loadableDecorator, 1, 'There should be loadable decorator')
    assert.isTrue(loadableDecorator.props().isLoading, 'Loadable decorator should show loader')
    // simulate fetch end and check resolved content
    wrapper.setProps({
      ...props,
      currentDatasource: datasourceDump,
    })
    loadableDecorator = wrapper.find(LoadableContentDisplayDecorator)
    currentState = wrapper.state()
    // Expected converted input values
    const inputValues = {
      crawler: {
        label: 'Test Theia 1',
        opensearchDescriptorURL: 'https://theia.cnes.fr/atdistrib/resto2/api/collections/LANDSAT/describe.xml',
        refreshRate: '55555',
      },
      query: {
        webserviceURL: 'https://theia.cnes.fr/atdistrib/resto2/api/collections/LANDSAT/search.json',
        pageIndexParam: 'page',
        pageSizeParam: 'maxRecords',
        lastUpdateParam: 'updated',
        webserviceParameters: { lang: 'en' },
        startPageIndex: '1',
        pagesSize: '500',
      },
      // all fields and fields values for results
      results: {
        attributeToJSonField: {
          label: 'productIdentifier', providerId: 'productIdentifier', 'properties.start_date': 'startDate', 'properties.end_date': 'completionDate', 'properties.product': 'productType', 'properties.coordinates': 'centroid.coordinates', 'properties.mission': 'collection', 'properties.measurement.instrument': 'instrument', 'properties.measurement.resolution': 'resolution', 'properties.measurement.sensor_mode': 'sensorMode',
        },
        modelName: 'theia_model',
        totalResultsField: 'totalResults',
        pageSizeField: 'itemsPerPage',
        quicklookURLPath: 'quicklook',
        thumbnailURLPath: 'thumbnail',
        rawDataURLPath: 'services.download.url',
      },
    }
    // buffer for values to commit
    const outputValues = {}

    assert.deepEqual(wrapper.state(), {
      isEditing: true,
      ready: true,
      formValues: inputValues,
      formState: OSConfigurationFormContainer.STATE.CRAWLER,
    }, 'Should define correctly initial state for creation')
    assert.lengthOf(loadableDecorator, 1, 'There should be loadable decorator')
    assert.isFalse(loadableDecorator.props().isLoading, 'Loadable decorator should no longer show loader')
    // Check first step container is shown and no other
    let crawlerContainer = wrapper.find(OSCrawlerConfigurationContainer)
    let queryContainer = wrapper.find(OSQueryConfigurationContainer)
    let resultsContainer = wrapper.find(OSResultsConfigurationContainer)
    assert.lengthOf(crawlerContainer, 1, 'There should be crawler container at first step')
    testSuiteHelpers.assertWrapperProperties(crawlerContainer, {
      project: props.params.project,
      initialValues: currentState.formValues.crawler,
      isEditing: true,
      onBack: wrapper.instance().handleBack,
      onSubmit: wrapper.instance().onCrawlerSubmit,
    }, 'Crawler container properties should be correctly set')
    assert.lengthOf(queryContainer, 0, 'There should not be query container at first step')
    assert.lengthOf(resultsContainer, 0, 'There should not be results container at first step')
    // Simulate next step using dumb form values
    outputValues.crawler = {
      label: 'Test Theia 1 - edited',
      opensearchDescriptorURL: 'https://theia.cnes.fr/atdistrib/resto2/api/collections/LANDSAT/describe.potatoes',
      refreshRate: '77777',
    }
    wrapper.instance().onCrawlerSubmit(outputValues.crawler)
    currentState = wrapper.state()
    assert.deepEqual(currentState, {
      isEditing: true,
      ready: true,
      formValues: {
        crawler: outputValues.crawler, // should be committed
        query: inputValues.query, // should be unchanged
        results: inputValues.results, // should be unchanged
      },
      formState: OSConfigurationFormContainer.STATE.QUERY,
    }, 'Should defined correctly state after first step validation')

    // Check second step container is shown and no other
    crawlerContainer = wrapper.find(OSCrawlerConfigurationContainer)
    queryContainer = wrapper.find(OSQueryConfigurationContainer)
    resultsContainer = wrapper.find(OSResultsConfigurationContainer)
    assert.lengthOf(crawlerContainer, 0, 'There should not be crawler container at second step')
    assert.lengthOf(queryContainer, 1, 'There should be query container at second step')
    testSuiteHelpers.assertWrapperProperties(queryContainer, {
      initialValues: currentState.formValues.query,
      isEditing: true,
      onBack: wrapper.instance().handleBack,
      onSubmit: wrapper.instance().onQuerySubmit,
    }, 'Crawler container properties should be correctly set')
    assert.lengthOf(resultsContainer, 0, 'There should not be results container at second step')
    // Simulate last step using dumb form values
    outputValues.query = {
      webserviceURL: 'https://theia.cnes.fr/atdistrib/resto2/api/collections/POTATOES/search.potatoes',
      pageIndexParam: 'potatoesPage',
      pageSizeParam: 'potatoesRecords',
      lastUpdateParam: 'fries',
      webserviceParameters: { lang: 'pt' },
      startPageIndex: '28',
      pagesSize: '2566',
    }
    wrapper.instance().onQuerySubmit(outputValues.query)
    currentState = wrapper.state()
    assert.deepEqual(currentState, {
      isEditing: true,
      ready: true,
      formValues: {
        crawler: outputValues.crawler,
        query: outputValues.query, // should have been committed
        results: inputValues.results, // should be unchanged
      },
      formState: OSConfigurationFormContainer.STATE.RESULTS,
    }, 'Should defined correctly state after second step validation')

    // Check second step container is shown and no other
    crawlerContainer = wrapper.find(OSCrawlerConfigurationContainer)
    queryContainer = wrapper.find(OSQueryConfigurationContainer)
    resultsContainer = wrapper.find(OSResultsConfigurationContainer)
    assert.lengthOf(crawlerContainer, 0, 'There should not be crawler container at last step')
    assert.lengthOf(queryContainer, 0, 'There should not be query container at last step')
    assert.lengthOf(resultsContainer, 1, 'There should be results container at last step')
    testSuiteHelpers.assertWrapperProperties(resultsContainer, {
      initialValues: currentState.formValues.results,
      isEditing: true,
      onBack: wrapper.instance().handleBack,
      onSubmit: wrapper.instance().onResultsSubmit,
    }, 'Crawler container properties should be correctly set')

    // Finally check committed values (verify first nothing was called)
    assert.equal(spyData.create.count, 0, 'Create should not have been called yet')
    assert.equal(spyData.update.count, 0, 'Update should not have been called yet')

    outputValues.results = {
      attributeToJSonField: {
        label: 'myLabel',
        providerId: 'myProviderId',
        'properties.start_date': 'myStartDate',
        'properties.end_date': 'myEndDate',
        'properties.product': 'myProduct',
        'properties.coordinates': 'frag.myCoordinates',
        'properties.mission': 'frag.myMission',
        'properties.measurement.instrument': 'myInstrument',
        'properties.measurement.resolution': 'myResolution',
        'properties.measurement.sensor_mode': 'mySensorMode',
      },
      modelName: 'myModel',
      totalResultsField: 'myTotalResults',
      pageSizeField: 'myPageSize',
      quicklookURLPath: 'myQuicklook',
      thumbnailURLPath: 'myThumbnail',
      rawDataURLPath: 'servicesmyRawData',
    }
    wrapper.instance().onResultsSubmit(outputValues.results)
    currentState = wrapper.state()
    assert.deepEqual(currentState, {
      isEditing: true,
      ready: true,
      formValues: {
        crawler: outputValues.crawler,
        query: outputValues.query,
        results: outputValues.results,
      },
      formState: OSConfigurationFormContainer.STATE.RESULTS,
    }, 'Statae should be correctly updated before committing')
    assert.equal(spyData.create.count, 0, 'Create should not have been called for edition')
    assert.equal(spyData.update.count, 1, 'Update should have been called for edition')
    assert.equal(spyData.update.datasourceId, 1, 'Update should have been called for right datasource ID')
    // Test out conversion
    assert.isOk(spyData.update.data, {
      id: 1,
      pluginId: 'webservice-datasource',
      label: 'Test Theia 1 - edited',
      priorityOrder: 0,
      active: true,
      pluginClassName: 'fr.cnes.regards.modules.dam.plugins.datasources.webservice.WebserviceDatasourcePlugin',
      parameters: [{
        name: 'refreshRate',
        value: 77777,
      }, {
        name: 'webserviceConfiguration',
        value: {
          opensearchDescriptorURL: 'https://theia.cnes.fr/atdistrib/resto2/api/collections/LANDSAT/describe.potatoes',
          webserviceURL: 'https://theia.cnes.fr/atdistrib/resto2/api/collections/POTATOES/search.potatoes',
          pageIndexParam: 'potatoesPage',
          pageSizeParam: 'potatoesRecords',
          lastUpdateParam: 'fries',
          webserviceParameters: { lang: 'pt' },
          startPageIndex: '28',
          pagesSize: '2566',
        },
        type: 'fr.cnes.regards.modules.dam.plugins.datasources.webservice.configuration.WebserviceConfiguration',
      }, {
        name: 'conversionConfiguration',
        value: {
          attributeToJSonField: {
            label: 'myLabel',
            providerId: 'myProviderId',
            'properties.start_date': 'myStartDate',
            'properties.end_date': 'myEndDate',
            'properties.product': 'myProduct',
            'properties.coordinates': 'frag.myCoordinates',
            'properties.mission': 'frag.myMission',
            'properties.measurement.instrument': 'myInstrument',
            'properties.measurement.resolution': 'myResolution',
            'properties.measurement.sensor_mode': 'mySensorMode',
          },
          modelName: 'myModel',
          totalResultsField: 'myTotalResults',
          pageSizeField: 'myPageSize',
          quicklookURLPath: 'myQuicklook',
          thumbnailURLPath: 'myThumbnail',
          rawDataURLPath: 'servicesmyRawData',
        },
        type: 'fr.cnes.regards.modules.dam.plugins.datasources.webservice.configuration.ConversionConfiguration',
      }],
    }, 'Edited data should be correctly converted to plugin model')
  })
})
