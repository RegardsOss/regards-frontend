/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain, DamDomain } from '@regardsoss/domain'
import { PluginProvider } from '@regardsoss/plugins'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import CriterionWrapperComponent from '../../../../../../src/components/user/tabs/results/search/CriterionWrapperComponent'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test CriterionWrapperComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing CriterionWrapperComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CriterionWrapperComponent)
  })
  it('should render correctly', () => {
    const props = {
      pluginInstanceId: 'IamAPlugin',
      pluginId: 26,
      pluginProps: {
        label: { [UIDomain.LOCALES_ENUM.en]: 'pl1', [UIDomain.LOCALES_ENUM.fr]: 'pl2' },
        state: { anything: true },
        publishState: () => {},
      },
      pluginConf: {
        attributes: {
          attrA: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
          attrB: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE),
        },
      },
    }
    const enzymeWrapper = shallow(<CriterionWrapperComponent {...props} />, { context })
    const providerWrapper = enzymeWrapper.find(PluginProvider)
    assert.lengthOf(providerWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(providerWrapper, {
      pluginId: props.pluginId,
      pluginInstanceId: props.pluginInstanceId,
      pluginConf: props.pluginConf,
      pluginProps: props.pluginProps,
      displayPlugin: true,
      loadingComponent: CriterionWrapperComponent.LOADING_COMPONENT,
      errorComponent: null,
    })
  })
})
