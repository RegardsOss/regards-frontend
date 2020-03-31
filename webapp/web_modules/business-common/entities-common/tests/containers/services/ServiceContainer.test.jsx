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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import { TargetHelper } from '../../../src/definitions/TargetHelper'
import ServiceContainer from '../../../src/containers/services/ServiceContainer'
import RunCatalogPluginServiceContainer from '../../../src/containers/services/catalog/RunCatalogPluginServiceContainer'
import RunUIPluginServiceContainer from '../../../src/containers/services/ui/RunUIPluginServiceContainer'
import styles from '../../../src/styles/styles'
import { entity1, entity2, entity3 } from '../../dumps/entities.dump'

const context = buildTestContext(styles)

/**
 * Test ServiceContainer
 * @author Raphaël Mechali
 */
describe('[Entities Common] Testing ServiceContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ServiceContainer)
  })
  it('should render correctly when no service is running', () => {
    const props = {
      serviceRunModel: null,
      onQuit: () => { },
    }
    shallow(<ServiceContainer {...props} />, { context })
  })
  it('should render correctly when a catalog service is running, for each target type', () => {
    const fakeOnQuit = () => { }
    const props = { onQuit: fakeOnQuit }
    const enzymeWrapper = shallow(<ServiceContainer {...props} />, { context })

    const fakeServiceConfiguration = {
      configId: 'serv1',
      label: 'service1',
      icon: 'hellfire.png',
      applicationModes: [],
      entityTypes: [],
      type: AccessDomain.pluginTypes.CATALOG,
    }
    const targets = [
      TargetHelper.buildOneElementTarget(entity2),
      TargetHelper.buildManyElementsTarget([entity1, entity3]),
      TargetHelper.buildQueryTarget('model.baskets=nike', DamDomain.ENTITY_TYPES_ENUM.DATA, 12, [entity1, entity2]),
    ]
    targets.forEach((target) => {
      const propsForTarget = {
        ...props,
        serviceRunModel: { serviceConfiguration: fakeServiceConfiguration, target },
      }
      enzymeWrapper.setProps(propsForTarget)
      // check: there is a rendered catalog plugin service runner, with right service conf and target
      const catalogRunner = enzymeWrapper.find(RunCatalogPluginServiceContainer)
      assert.lengthOf(catalogRunner, 1, 'That service should run using a RunCatalogPluginServiceContainer')
      assert.equal(catalogRunner.props().service, fakeServiceConfiguration, 'the service configuration should be reported to runner')
      assert.equal(catalogRunner.props().onQuit, fakeOnQuit, 'the quit callback should be reported to runner')
      assert.equal(catalogRunner.props().target, target, 'the target should be reported to runner')
    })
  })
  it('should render correctly when an UI service is running, for each target type', () => {
    const fakeOnQuit = () => { }
    const props = { onQuit: fakeOnQuit }
    const enzymeWrapper = shallow(<ServiceContainer {...props} />, { context })

    const fakeServiceConfiguration = {
      configId: 'serv1',
      label: 'service1',
      icon: 'hellfire.png',
      applicationModes: [],
      entityTypes: [],
      type: AccessDomain.pluginTypes.UI,
    }
    const targets = [
      TargetHelper.buildOneElementTarget(entity2),
      TargetHelper.buildManyElementsTarget([entity1, entity3]),
      TargetHelper.buildQueryTarget('model.baskets=nike', DamDomain.ENTITY_TYPES_ENUM.DATA, 12, [entity1, entity2]),
    ]
    targets.forEach((target) => {
      const propsForTarget = {
        ...props,
        serviceRunModel: { serviceConfiguration: fakeServiceConfiguration, target },
      }
      enzymeWrapper.setProps(propsForTarget)
      // check: there is a rendered UI plugin service runner, with right service conf and target
      const uiRunner = enzymeWrapper.find(RunUIPluginServiceContainer)
      assert.lengthOf(uiRunner, 1, 'That service should run using a RunUIPluginServiceContainer')
      assert.equal(uiRunner.props().service, fakeServiceConfiguration, 'the service configuration should be reported to runner')
      assert.equal(uiRunner.props().onQuit, fakeOnQuit, 'the quit callback should be reported to runner')
      assert.equal(uiRunner.props().target, target, 'the target shuld be reported to runner')
    })
  })
})
