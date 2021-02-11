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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UIPluginConfConfiguration } from '@regardsoss/api'
import { AccessDomain } from '@regardsoss/domain'
import RunServiceDialogConnectedComponent, { RunServiceDialogComponent } from '../../../../src/components/services/RunServiceDialogComponent'
import { TargetHelper } from '../../../../src/definitions/TargetHelper'
import { RunUIPluginServiceContainer } from '../../../../src/containers/services/ui/RunUIPluginServiceContainer'
import styles from '../../../../src/styles/styles'
import { entity2 } from '../../../dumps/entities.dump'

const context = buildTestContext(styles)

const serviceConfiguration = {
  configId: '1',
  label: 'service1',
  icon: 'hellfire.png',
  applicationModes: [],
  entityTypes: [],
  type: AccessDomain.pluginTypes.UI,
}

const commonProps = {
  service: serviceConfiguration,
  target: TargetHelper.buildOneElementTarget(entity2),
  onQuit: () => { },
  dispatchFetchPluginConfiguration: () => new Promise((resolve, reject) => { }),
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

const basicConfiguration = {
  id: serviceConfiguration.configId,
  active: true,
  label: 'I don\'t care',
  linkedToAllEntities: false,
  pluginDefinition: {
    id: 0,
    name: 'I still don\'t care',
    type: 'SERVICE',
    sourcePath: '/plugins/service/example/plugin.js',
  },
  conf: {
    label: "must say i really don't care",
    static: {
      static1: 'mock-server-val1',
      static2: 'mock-server-val2',
    },
    dynamic: {
      pBool: true,
      pChar: 'z',
      pDate: '1997-07-16T19:20:30.45+01:00',
      pFloat: '4.3',
      pString: 'je suis un test',
      pInt: 42,
    },
  },
}

const basicPluginInstance = {
  name: 'fake.plugin',
  plugin: () => <div />,
  messages: {
    fr: {},
    en: {},
  },
  info: {
    name: 'fake.plugin',
    description: 'A fake plugin',
    version: '0.0.0-alpha',
    author: 'Testatator',
    company: 'C. S.',
    email: 'testatator@c-s.fr',
    license: 'Mu du GNU',
    url: 'fake-plugin@facebook.plo',
    type: 'SERVICE',
    // Specific configuration properties for the given plugintch plugin metadata after plugin co
    conf: {
      target: [AccessDomain.applicationModes.ONE, AccessDomain.applicationModes.MANY],
      static: {
        static1: {
          type: 'string',
          required: false,
        },
        static2: {
          type: 'string',
          required: true,
        },
      },
      // dynamic plugin parameters (ie configuration when using, at runtime)
      dynamic: {},
    },
  },
}

/**
* Test RunUIPluginServiceContainer
* @author Raphaël Mechali
*/
describe('[Entities Common] Testing RunUIPluginServiceContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RunUIPluginServiceContainer)
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
    const enzymeWrapper = shallow(<RunUIPluginServiceContainer {...props} />, { context })
    // it should start fetching configuration
    assert.equal(fetchCounters.fetchConfigurationCount, 1, 'The container should have started fetching configuration')
    assert.equal(
      enzymeWrapper.state('step'), RunUIPluginServiceContainer.Steps.FETCH_PLUGIN_CONFIGURATION,
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
    const enzymeWrapper = shallow(<RunUIPluginServiceContainer {...commonProps} />, { context })
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
        enzymeWrapper.state('step'), RunUIPluginServiceContainer.Steps.PLUGIN_CONFIGURATION_ERROR,
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
  it('should fetch plugin instance (bundled code) when plugin configuration was fetched', () => {
    const props = { ...commonProps }
    const enzymeWrapper = shallow(<RunUIPluginServiceContainer {...props} />, { context })
    // simulate the configuration loading done event WITH the configuration
    enzymeWrapper.instance().onFetchConfigurationDone({
      payload: getPayloadWithParameters(
        UIPluginConfConfiguration.normalizrKey,
        serviceConfiguration.configId, basicConfiguration,
      ),
    }, 1)
    enzymeWrapper.update() // wait for update
    assert.equal(
      enzymeWrapper.state('step'), RunUIPluginServiceContainer.Steps.LOAD_PLUGIN_INSTANCE,
      'The container should be fetching plugin instance',
    )
    // that step should be reported as loading into the displayer
    const serviceRunComponent = enzymeWrapper.find(RunServiceDialogConnectedComponent)
    assert.lengthOf(serviceRunComponent, 1, 'The container should render using a RunServiceDialogComponent')
    const componentStep = serviceRunComponent.props().currentStep
    assert.isNotNull(componentStep, 'The component step should be defined')
    assert.equal(componentStep.step, RunServiceDialogComponent.Steps.LOADING, 'The component should display in loading state')
  })
  // fetch error of plugin instance cannot be tested, as catch method is written inline
  it('should resolve parameters then (1) then enter show plugin step when there is no error and no parameter', () => {
    const enzymeWrapper = shallow(<RunUIPluginServiceContainer {...commonProps} />, { context })
    // simulate the configuration loading done event with the configuration and plugin instance
    enzymeWrapper.instance().onLoadPluginDone({
      pluginInstance: basicPluginInstance, // basic instance has no parameter, therefore, no parameter will be resolved
      pluginConfiguration: { content: basicConfiguration },
    })
    enzymeWrapper.update() // wait for update
    assert.equal(
      enzymeWrapper.state('step'), RunUIPluginServiceContainer.Steps.RUNNING_SERVICE,
      'The container should be fetching the service results now (skipped configuration as there is no parameter)',
    )
    // that step should be reported as result into the displayer
    const serviceRunComponent = enzymeWrapper.find(RunServiceDialogConnectedComponent)
    assert.lengthOf(serviceRunComponent, 1, 'The container should render using a RunServiceDialogComponent')
    const componentStep = serviceRunComponent.props().currentStep
    assert.isNotNull(componentStep, 'The component step should be defined')
    assert.equal(componentStep.step, RunServiceDialogComponent.Steps.RESULTS, 'The component should display in results state')
  })
  it('should resolve parameters (2) then enter resolution error step when is an invalid parameters configuration', () => {
    const enzymeWrapper = shallow(<RunUIPluginServiceContainer {...commonProps} />, { context })
    // simulate the configuration loading done event with the configuration and plugin instance
    enzymeWrapper.instance().onLoadPluginDone({
      pluginInstance: basicPluginInstance, // basic instance has no parameter, therefore, no parameter will be resolved
      pluginConfiguration: {
        content: {
          ...basicConfiguration,
          // create an unknown parameter, where type cannot be retrieved,
          conf: {
            static: {
              unknownParameter: 'x',
            },
          },
        },
      },
    })
    enzymeWrapper.update() // wait for update
    assert.equal(
      enzymeWrapper.state('step'), RunUIPluginServiceContainer.Steps.PARAMETERS_CONVERSION_ERROR,
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
  it('should resolve parameters (3) then enter (A) configuration / (B) display plugin service/ (C) allow back to configuration preserving values', () => {
    const enzymeWrapper = shallow(<RunUIPluginServiceContainer {...commonProps} />, { context })

    // A - simulate the configuration loading done event with configuration and one specified parameter
    enzymeWrapper.instance().onLoadPluginDone({
      pluginInstance: {
        ...basicPluginInstance,
        info: {
          ...basicPluginInstance.info,
          conf: {
            ...basicPluginInstance.info.conf,
            dynamic: {
              pBool: { // added parameter
                label: 'A boolean',
                type: 'bool',
                required: true,
              },
            },
          },
        },
      }, // basic instance has no parameter, therefore, no parameter will be resolved
      pluginConfiguration: { content: basicConfiguration },
    })
    enzymeWrapper.update() // wait for update
    assert.equal(
      enzymeWrapper.state('step'), RunUIPluginServiceContainer.Steps.PARAMETERS_CONFIGURATION,
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

    // (B) Enter showing plugin service state (simulare user entered form values)
    const testFormValues = { pBool: false }
    enzymeWrapper.instance().onConfigurationDone(testFormValues)
    enzymeWrapper.update() // wait for update
    assert.equal(
      enzymeWrapper.state('step'), RunUIPluginServiceContainer.Steps.RUNNING_SERVICE,
      'The container should be fetching the service results now (skipped configuration as there is no parameter)',
    )
    // that step should be reported as result into the displayer
    serviceRunComponent = enzymeWrapper.find(RunServiceDialogConnectedComponent)
    assert.lengthOf(serviceRunComponent, 1, 'The container should render using a RunServiceDialogComponent')
    componentStep = serviceRunComponent.props().currentStep
    assert.isNotNull(componentStep, 'The component step should be defined')
    assert.equal(componentStep.step, RunServiceDialogComponent.Steps.RESULTS, 'The component should display in results state')

    // (C) re-enter configuration, on previous, with previously entered values
    enzymeWrapper.instance().onPrevious()
    enzymeWrapper.update() // wait for update
    assert.equal(
      enzymeWrapper.state('step'), RunUIPluginServiceContainer.Steps.PARAMETERS_CONFIGURATION,
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
})
