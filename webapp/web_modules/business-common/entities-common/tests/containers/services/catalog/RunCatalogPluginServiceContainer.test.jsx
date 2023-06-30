/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AdminPluginConfigurationSchemaConfiguration, PluginMetaDataConfiguration } from '@regardsoss/api'
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import { LocalURLProvider } from '@regardsoss/display-control'
import RunServiceDialogConnectedComponent, { RunServiceDialogComponent } from '../../../../src/components/services/RunServiceDialogComponent'
import { TargetHelper } from '../../../../src/definitions/TargetHelper'
import { RunCatalogPluginServiceContainer } from '../../../../src/containers/services/catalog/RunCatalogPluginServiceContainer'
import styles from '../../../../src/styles/styles'
import { entity1, entity2, entity3 } from '../../../dumps/entities.dump'

const context = buildTestContext(styles)

const serviceConfiguration = {
  configId: '1',
  label: 'service1',
  icon: 'hellfire.png',
  applicationModes: [],
  entityTypes: [],
  type: AccessDomain.pluginTypes.CATALOG,
}

const basicConfiguration = {
  id: 1,
  label: 'service1',
  pluginId: 'aSamplePlugin',
  version: '0.0.1',
  pluginClassName: 'fr.cnes.regards.framework.plugins.SamplePlugin',
  interfaceNames: ['fr.cnes.regards.framework.plugins.ISamplePlugin'],
  priorityOrder: 0,
  active: true,
  // parameters are added by getPayloadWithParameters
}

const basicMetadata = {
  pluginId: 'aSamplePlugin',
  version: '0.0.1',
  pluginClassName: 'fr.cnes.regards.framework.plugins.SamplePlugin',
  interfaceNames: ['fr.cnes.regards.framework.plugins.ISamplePlugin'],
  author: 'REGARDS Team',
  description: 'Sample plugin test',
  url: 'https://github.com/RegardsOss',
  contact: 'regards@c-s.fr',
  owner: 'CSSI',
  licence: 'LGPLv3.0',
  // parameters are added by getPayloadWithParameters
}

const commonProps = {
  service: serviceConfiguration,
  target: TargetHelper.buildOneElementTarget(entity3),
  onQuit: () => { },
  dispatchFetchPluginConfiguration: () => new Promise((resolve, reject) => { }),
  dispatchFetchPluginMetaData: () => new Promise((resolve, reject) => { }),
  dispatchFetchPluginResult: () => new Promise((resolve, reject) => { }),
}

/**
 * Builds a payload for normalizr key and objet model as parameter. Changes parameters field if specified
 */
const getPayloadWithParameters = (normalizrKey, entityKey, model, parameters = []) => ({
  entities: {
    [normalizrKey]: {
      [entityKey]: {
        content: {
          ...model,
          parameters,
        },
      },
    },
  },
})

/**
 * Wraps an object in content field, like server would return it
 * @param {*} model model
 * @param {*} parameters parameters
 */
const getContentObjectWithParameters = (model, parameters = []) => ({
  content: {
    ...model,
    parameters,
  },
})

/**
* Test RunCatalogPluginServiceContainer
* @author Raphaël Mechali
*/
describe('[Entities Common] Testing RunCatalogPluginServiceContainer', () => {
  let toRestore
  before(() => {
    // stub LocalURLProvider.buildLocalAccessURL to not use blobs and URL
    toRestore = LocalURLProvider.buildLocalAccessURL
    LocalURLProvider.buildLocalAccessURL = (fakeContent) => fakeContent.text
    testSuiteHelpers.before()
  })
  after(() => {
    LocalURLProvider.buildLocalAccessURL = toRestore
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(RunCatalogPluginServiceContainer)
  })
  it('should render correctly and start fetching configuration when mounted', () => {
    const fetchCounters = {
      fetchConfigurationCount: 0,
    }
    const props = {
      ...commonProps,
      dispatchFetchPluginConfiguration: () => new Promise((resolve, reject) => {
        fetchCounters.fetchConfigurationCount += 1
      }),
    }
    const enzymeWrapper = shallow(<RunCatalogPluginServiceContainer {...props} />, { context })
    // it should start fetching configuration
    assert.equal(fetchCounters.fetchConfigurationCount, 1, 'The container should have started fetching configuration')
    assert.equal(
      enzymeWrapper.state('step'), RunCatalogPluginServiceContainer.Steps.FETCH_PLUGIN_CONFIGURATION,
      'The container should be in fetching configuration state',
    )
    // that step should be reported as loading into the displayer
    const serviceRunComponent = enzymeWrapper.find(RunServiceDialogConnectedComponent)
    assert.lengthOf(serviceRunComponent, 1, 'The container should render using a RunServiceDialogComponent')
    const componentStep = serviceRunComponent.props().currentStep
    assert.isNotNull(componentStep, 'The component step should be defined')
    assert.equal(componentStep.step, RunServiceDialogComponent.Steps.LOADING, 'The component should display in loading state')
  })
  it('should stop fetching and display error when plugin configuration fetching failed or is not retrieved', () => {
    const enzymeWrapper = shallow(<RunCatalogPluginServiceContainer {...commonProps} />, { context })
    const errorsCallbacks = [
      // simulate a configuration loading error event
      () => enzymeWrapper.instance().onFetchConfigurationDone({ error: true }),
      // simulate a non retrieve ID eror
      () => enzymeWrapper.instance().onFetchConfigurationDone({ error: false, entities: {} }),
    ]
    errorsCallbacks.forEach((enterError) => {
      enterError()
      enzymeWrapper.update() // wait for update
      assert.equal(
        enzymeWrapper.state('step'), RunCatalogPluginServiceContainer.Steps.PLUGIN_CONFIGURATION_ERROR,
        'The container should be in fetch configuration error state',
      )
      // that step should be reported as error message into the displayer
      const serviceRunComponent = enzymeWrapper.find(RunServiceDialogConnectedComponent)
      assert.lengthOf(serviceRunComponent, 1, 'The container should render using a RunServiceDialogComponent')
      const componentStep = serviceRunComponent.props().currentStep
      assert.isNotNull(componentStep, 'The component step should be defined')
      assert.equal(componentStep.step, RunServiceDialogComponent.Steps.MESSAGE, 'The component should display in message state')
      assert.isTrue(componentStep.error, 'That state should be marked error')
    })
  })
  it('should fetch plugin metadata after plugin configuration was fetched', () => {
    const fetchCounters = {
      fetchMetadataCount: 0,
    }
    const props = {
      ...commonProps,
      dispatchFetchPluginMetaData: () => new Promise((resolve, reject) => {
        fetchCounters.fetchMetadataCount += 1
        resolve({})
      }),
    }
    const enzymeWrapper = shallow(<RunCatalogPluginServiceContainer {...props} />, { context })
    // simulate the configuration loading done event WITH the configuration
    enzymeWrapper.instance().onFetchConfigurationDone({
      payload: getPayloadWithParameters(
        AdminPluginConfigurationSchemaConfiguration.normalizrKey,
        serviceConfiguration.configId, basicConfiguration,
      ),
    }, 1)
    enzymeWrapper.update() // wait for update
    assert.equal(
      enzymeWrapper.state('step'), RunCatalogPluginServiceContainer.Steps.FETCH_PLUGIN_METADATA,
      'The container should be fetching plugin metadata',
    )
    // that step should be reported as loading into the displayer
    const serviceRunComponent = enzymeWrapper.find(RunServiceDialogConnectedComponent)
    assert.lengthOf(serviceRunComponent, 1, 'The container should render using a RunServiceDialogComponent')
    const componentStep = serviceRunComponent.props().currentStep
    assert.isNotNull(componentStep, 'The component step should be defined')
    assert.equal(componentStep.step, RunServiceDialogComponent.Steps.LOADING, 'The component should display in loading state')
  })
  it('should display error when plugin metada fetching failed or is not retrieved', () => {
    const enzymeWrapper = shallow(<RunCatalogPluginServiceContainer {...commonProps} />, { context })
    const errorsCallbacks = [
      // simulate a metadata loading error event
      () => enzymeWrapper.instance().onFetchMetaDataDone({ error: true }, getContentObjectWithParameters(basicConfiguration)),
      // simulate a metadata retrieve by ID eror
      () => enzymeWrapper.instance().onFetchMetaDataDone({ error: false, entities: {} }, getContentObjectWithParameters(basicConfiguration)),
    ]
    errorsCallbacks.forEach((enterError) => {
      enterError()
      enzymeWrapper.update() // wait for update
      assert.equal(
        enzymeWrapper.state('step'), RunCatalogPluginServiceContainer.Steps.PLUGIN_METADATA_ERROR,
        'The container should be in fetch metadata error state',
      )
      // that step should be reported as error message into the displayer
      const serviceRunComponent = enzymeWrapper.find(RunServiceDialogConnectedComponent)
      assert.lengthOf(serviceRunComponent, 1, 'The container should render using a RunServiceDialogComponent')
      const componentStep = serviceRunComponent.props().currentStep
      assert.isNotNull(componentStep, 'The component step should be defined')
      assert.equal(componentStep.step, RunServiceDialogComponent.Steps.MESSAGE, 'The component should display in message state')
      assert.isTrue(componentStep.error, 'That state should be marked error')
    })
  })
  it('should resolve parameters then (1) then enter fetch results step when there is no error and no parameter', () => {
    const enzymeWrapper = shallow(<RunCatalogPluginServiceContainer {...commonProps} />, { context })
    // simulate the configuration loading done event WITH the configuration
    enzymeWrapper.instance().onFetchMetaDataDone({
      payload: getPayloadWithParameters(PluginMetaDataConfiguration.normalizrKey, basicConfiguration.pluginId, basicMetadata),
    }, getContentObjectWithParameters(basicConfiguration))
    enzymeWrapper.update() // wait for update
    assert.equal(
      enzymeWrapper.state('step'), RunCatalogPluginServiceContainer.Steps.FETCH_APPLY_SERVICE,
      'The container should be fetching the service results now (skipped configuration as there is no parameter)',
    )
    // that step should be reported as loading into the displayer
    const serviceRunComponent = enzymeWrapper.find(RunServiceDialogConnectedComponent)
    assert.lengthOf(serviceRunComponent, 1, 'The container should render using a RunServiceDialogComponent')
    const componentStep = serviceRunComponent.props().currentStep
    assert.isNotNull(componentStep, 'The component step should be defined')
    assert.equal(componentStep.step, RunServiceDialogComponent.Steps.LOADING, 'The component should display in loading state')
  })
  it('should resolve parameters (2) then enter resolution error step when is an invalid parameters configuration', () => {
    const enzymeWrapper = shallow(<RunCatalogPluginServiceContainer {...commonProps} />, { context })
    // simulate the configuration loading done event WITH the configuration
    enzymeWrapper.instance().onFetchMetaDataDone({
      payload: getPayloadWithParameters(PluginMetaDataConfiguration.normalizrKey, basicConfiguration.pluginId, basicMetadata),
    }, getContentObjectWithParameters(basicConfiguration, [
      // this parameter will trigger an error, as it cannot be found in metadata
      {
        id: 8, name: 'A bool', value: '', dynamic: true,
      },
    ]))
    enzymeWrapper.update() // wait for update
    assert.equal(
      enzymeWrapper.state('step'), RunCatalogPluginServiceContainer.Steps.PARAMETERS_CONVERSION_ERROR,
      'The container should be in parameters resolution error state)',
    )
    // that step should be reported as error message into the displayer
    const serviceRunComponent = enzymeWrapper.find(RunServiceDialogConnectedComponent)
    assert.lengthOf(serviceRunComponent, 1, 'The container should render using a RunServiceDialogComponent')
    const componentStep = serviceRunComponent.props().currentStep
    assert.isNotNull(componentStep, 'The component step should be defined')
    assert.equal(componentStep.step, RunServiceDialogComponent.Steps.MESSAGE, 'The component should display in message state')
    assert.isTrue(componentStep.error, 'That state should be marked error')
  })
  it('should resolve parameters then enter (A) configuration / (B) fetch results / (C) show results / (D) allow back to configuration preserving values', () => {
    const enzymeWrapper = shallow(<RunCatalogPluginServiceContainer {...commonProps} />, { context })

    // A - simulate the configuration loading done event WITH the configuration
    enzymeWrapper.instance().onFetchMetaDataDone({
      payload: getPayloadWithParameters(PluginMetaDataConfiguration.normalizrKey, basicConfiguration.pluginId, basicMetadata, [
        // this parameter will be resolved (note: all types tested in resolution helper )
        {
          name: 'test.field', type: 'BOOLEAN', optional: false,
        }]),
    }, getContentObjectWithParameters(basicConfiguration, [
      // this parameter will be resolved
      {
        id: 8, name: 'test.field', value: '', dynamic: true,
      },
    ]))
    enzymeWrapper.update() // wait for update
    assert.equal(
      enzymeWrapper.state('step'), RunCatalogPluginServiceContainer.Steps.PARAMETERS_CONFIGURATION,
      'The container should be in parameters configuration state)',
    )
    // that step should be reported as configuration into the displayer
    let serviceRunComponent = enzymeWrapper.find(RunServiceDialogConnectedComponent)
    assert.lengthOf(serviceRunComponent, 1, 'The container should render using a RunServiceDialogComponent')
    let componentStep = serviceRunComponent.props().currentStep
    assert.isNotNull(componentStep, 'The component step should be defined')
    assert.equal(componentStep.step, RunServiceDialogComponent.Steps.PARAMETERS_CONFIGURATION, 'The component should display in configuration state')
    assert.isNotNull(componentStep.onSubmit, 'The component should have submit callback')
    assert.lengthOf(componentStep.parameters, 1, 'The component should have the defined parameter')

    // (B) simulare the the results fetching (user entered form values)
    const testFormValues = { 'test.field': true }
    enzymeWrapper.instance().onConfigurationDone(testFormValues)
    assert.equal(
      enzymeWrapper.state('step'), RunCatalogPluginServiceContainer.Steps.FETCH_APPLY_SERVICE,
      'The container should be fetching service results',
    )
    enzymeWrapper.update() // wait for update
    // that step should be reported as loading into the displayer
    serviceRunComponent = enzymeWrapper.find(RunServiceDialogConnectedComponent)
    assert.lengthOf(serviceRunComponent, 1, 'The container should render using a RunServiceDialogComponent')
    componentStep = serviceRunComponent.props().currentStep
    assert.isNotNull(componentStep, 'The component step should be defined')
    assert.equal(componentStep.step, RunServiceDialogComponent.Steps.LOADING, 'The component should display in loading state')

    // (C) enter show results
    enzymeWrapper.instance().onServiceResult({ payload: { content: { text: 'fake.blob' }, contentType: 'text/xml' } })
    assert.equal(
      enzymeWrapper.state('step'), RunCatalogPluginServiceContainer.Steps.APPLY_SERVICE_RESULT,
      'The container should be displaying service results',
    )
    enzymeWrapper.update() // wait for update
    // that step should be reported as loading into the displayer
    serviceRunComponent = enzymeWrapper.find(RunServiceDialogConnectedComponent)
    assert.lengthOf(serviceRunComponent, 1, 'The container should render using a RunServiceDialogComponent')
    componentStep = serviceRunComponent.props().currentStep
    assert.isNotNull(componentStep, 'The component step should be defined')
    assert.equal(componentStep.step, RunServiceDialogComponent.Steps.RESULTS, 'The component should display results')
    // note applied parameters are tests in another 'it case'

    // (D) re-enter configuration, on previous, with previously entered values
    enzymeWrapper.instance().onPrevious()
    enzymeWrapper.update() // wait for update
    assert.equal(
      enzymeWrapper.state('step'), RunCatalogPluginServiceContainer.Steps.PARAMETERS_CONFIGURATION,
      'The container should display configuration again after onPrevious()',
    )
    // that step should be reported as loading into the displayer
    serviceRunComponent = enzymeWrapper.find(RunServiceDialogConnectedComponent)
    assert.lengthOf(serviceRunComponent, 1, 'The container should render using a RunServiceDialogComponent')
    componentStep = serviceRunComponent.props().currentStep
    assert.isNotNull(componentStep, 'The component step should be defined')
    assert.equal(componentStep.step, RunServiceDialogComponent.Steps.PARAMETERS_CONFIGURATION, 'The component should display in configuration state after onPrevious')
    assert.isNotNull(componentStep.onSubmit, 'The component should have submit callback after onPrevious')
    assert.lengthOf(componentStep.parameters, 1, 'The component should have the defined parameter after onPrevious')
    assert.equal(componentStep.parametersValues, testFormValues, 'The parameters values previously entered should be restored')
  })

  it('should display error on fetching results error', () => {
    const enzymeWrapper = shallow(<RunCatalogPluginServiceContainer {...commonProps} />, { context })
    // simulate the configuration loading done event WITH the configuration
    enzymeWrapper.instance().onServiceResult({ error: true })
    enzymeWrapper.update() // wait for update

    assert.equal(
      enzymeWrapper.state('step'), RunCatalogPluginServiceContainer.Steps.APPLY_SERVICE_ERROR,
      'The container should be in apply service error state)',
    )
    // that step should be reported as error message into the displayer
    const serviceRunComponent = enzymeWrapper.find(RunServiceDialogConnectedComponent)
    assert.lengthOf(serviceRunComponent, 1, 'The container should render using a RunServiceDialogComponent')
    const componentStep = serviceRunComponent.props().currentStep
    assert.isNotNull(componentStep, 'The component step should be defined')
    assert.equal(componentStep.step, RunServiceDialogComponent.Steps.MESSAGE, 'The component should display in message state')
    assert.isTrue(componentStep.error, 'That state should be marked error')
  })

  it('should display empty results when service produced no result', () => {
    const props = {
      service: serviceConfiguration,
      target: TargetHelper.buildOneElementTarget(entity1),
      onQuit: () => { },
      dispatchFetchPluginConfiguration: () => new Promise((resolve, reject) => { }),
      dispatchFetchPluginMetaData: () => new Promise((resolve, reject) => { }),
      dispatchFetchPluginResult: () => new Promise((resolve, reject) => { }),
    }
    const enzymeWrapper = shallow(<RunCatalogPluginServiceContainer {...props} />, { context })
    // simulate the configuration loading done event WITH the configuration
    enzymeWrapper.instance().onServiceResult({ error: false, payload: { content: null } })
    enzymeWrapper.update() // wait for update

    assert.equal(
      enzymeWrapper.state('step'), RunCatalogPluginServiceContainer.Steps.APPLY_SERVICE_RESULT,
      'The container should be in apply service error state)',
    )
    // that step should be reported as error message into the displayer
    const serviceRunComponent = enzymeWrapper.find(RunServiceDialogConnectedComponent)
    assert.lengthOf(serviceRunComponent, 1, 'The container should render using a RunServiceDialogComponent')
    const componentStep = serviceRunComponent.props().currentStep
    assert.isNotNull(componentStep, 'The component step should be defined')
    assert.equal(componentStep.step, RunServiceDialogComponent.Steps.MESSAGE, 'The component should display in message state')
    assert.isFalse(componentStep.error, 'That state (empty result message) must not be an error')
  })

  it('should provide valid target to fetch service result method', () => {
    // spy: get fetched parameters
    const lastFetchParams = {
      configId: null,
      parameters: null,
      target: null,
    }
    const spyFetch = (configId, parameters, target) => {
      lastFetchParams.configId = configId
      lastFetchParams.parameters = parameters
      lastFetchParams.target = target
      return new Promise(() => { })
    }

    // 1 - test one element targe
    const props1 = {
      ...commonProps,
      dispatchFetchPluginResult: spyFetch,
      target: TargetHelper.buildOneElementTarget(entity2),
    }
    const enzymeWrapper = shallow(<RunCatalogPluginServiceContainer {...props1} />, { context })
    // simulate the configuration loading done event WITH the configuration
    const params1 = { p1: 'v1', p2: 'v2' }
    enzymeWrapper.instance().onConfigurationDone(params1)
    enzymeWrapper.update() // wait for update
    assert.equal(lastFetchParams.configId, serviceConfiguration.configId, 'One element target - configuration ID should be corretly sent')
    assert.equal(lastFetchParams.parameters, params1, 'One element target - parameters should be corretly sent')
    assert.deepEqual(lastFetchParams.target, props1.target, 'One element target - target should be corretly sent')
    // 2 - test many elements target
    const props2 = {
      ...commonProps,
      dispatchFetchPluginResult: spyFetch,
      target: TargetHelper.buildManyElementsTarget([entity1, entity3]),
    }
    enzymeWrapper.setProps(props2)
    // simulate the configuration loading done event WITH the configuration
    const params2 = { p1: 'v1-2', p2: true }
    enzymeWrapper.instance().onConfigurationDone(params2)
    enzymeWrapper.update() // wait for update
    assert.equal(lastFetchParams.configId, serviceConfiguration.configId, 'Many elements target - configuration ID should be corretly sent')
    assert.equal(lastFetchParams.parameters, params2, 'Many elements target - parameters should be corretly sent')
    assert.deepEqual(lastFetchParams.target, props2.target, 'Many elements target - target should be corretly sent')
    // 3 - test query target
    const props3 = {
      ...commonProps,
      dispatchFetchPluginResult: spyFetch,
      target: TargetHelper.buildQueryTarget({ q: ['model.age=22'], geo: 'potatoesField' }, DamDomain.ENTITY_TYPES_ENUM.DATA, 22, [entity2, entity3]),
    }
    enzymeWrapper.setProps(props3)
    // simulate the configuration loading done event WITH the configuration
    const params3 = { p1: null }
    enzymeWrapper.instance().onConfigurationDone(params3)
    enzymeWrapper.update() // wait for update
    assert.equal(lastFetchParams.configId, serviceConfiguration.configId, 'Query target - configuration ID should be corretly sent')
    assert.equal(lastFetchParams.parameters, params3, 'Query target - parameters should be corretly sent')
    assert.deepEqual(lastFetchParams.target, props3.target, 'Query target - target should be corretly sent',
    )
  })
})
