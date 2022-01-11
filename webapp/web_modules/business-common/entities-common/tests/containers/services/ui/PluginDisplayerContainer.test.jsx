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
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { applicationModes } from '@regardsoss/domain/access'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { PluginDisplayerContainer } from '../../../../src/containers/services/ui/PluginDisplayerContainer'
import { TargetHelper } from '../../../../src/definitions/TargetHelper'
import { entity1, entity2, entity3 } from '../../../dumps/entities.dump'

const context = buildTestContext()

/**
* Test PluginDisplayerContainer
* @author Raphaël Mechali
*/
describe('[Entities Common] Testing PluginDisplayerContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginDisplayerContainer)
  })

  const testCases = [{
    testMessage: 'should render plugin component with ONE ELEMENT target and dynamic properties',
    localTarget: TargetHelper.buildOneElementTarget(entity1),
    addOnCloseProps: true,
  }, {
    testMessage: 'should render plugin component with MANY ELEMENTS target and dynamic properties',
    localTarget: TargetHelper.buildManyElementsTarget([entity2, entity3]),
    addOnCloseProps: false,
  }, {
    testMessage: 'should render plugin component with QUERY target and dynamic properties',
    localTarget: TargetHelper.buildQueryTarget({ q: 'a=a&b=b' }, ENTITY_TYPES_ENUM.DATA, 15, [entity1, entity3]),
    addOnCloseProps: true,
  }]
  testCases.forEach(({ testMessage, localTarget, addOnCloseProps }) => it(testMessage, () => {
    const FakePluginComponent = () => <div />
    // check that plugin is correctly rendered
    const props = {
      pluginInstance: {
        name: 'fake.plugin',
        plugin: FakePluginComponent,
        getReducer: () => ({}),
        messages: {
          fr: {},
          en: {},
        },
        styles: {
          styles: () => { },
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
          // Specific configuration properties for the given plugin
          conf: {
            target: [applicationModes.ONE, applicationModes.MANY],
            static: {},
            // dynamic plugin parameters (ie configuration when using, at runtime)
            dynamic: {},
          },
        },
      },
      pluginConf: {
        target: localTarget,
        configuration: {
          static: {
            a: 1,
            b: true,
            c: 'hello',
          },
          dynamic: {
            d: new Date(),
            e: 5.6,
          },
        },
      },
    }
    // if required, set plugin props onClose
    if (addOnCloseProps) {
      props.pluginProps = {
        onClose: () => ({}),
      }
    }
    const enzymeWrapper = shallow(<PluginDisplayerContainer {...props} />, { context })
    const renderedComponent = enzymeWrapper.find(FakePluginComponent)
    assert.lengthOf(renderedComponent, 1, 'There should be the plugin rendering component')
    assert.deepEqual(renderedComponent.props().configuration, props.pluginConf.configuration, 'configuration should be reported correctly')

    // check plugin props onClose
    if (addOnCloseProps) {
      assert.deepEqual(renderedComponent.props().onClose, props.pluginProps.onClose, 'onClose should be reported correctly')
    }
  }))
})
