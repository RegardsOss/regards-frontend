/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { PluginsConfigurationProvider } from '../../../src/containers/user/PluginsConfigurationProvider'
import styles from '../../../src/styles'
import { criteria, criteriaServerAttributes } from '../../dump/configuration.dump'

const context = buildTestContext(styles)

/**
 * Test PluginsConfigurationProvider
 * @author Raphaël Mechali
 */
describe('[SEARCH FORM] Testing PluginsConfigurationProvider', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginsConfigurationProvider)
  })

  it('should resolve correctly criteria, filter criteria with missing attributes and complete attribute model with builder function', () => {
    const testMarker = attributeModel => ({ ...attributeModel, testMarker: true })
    const resolvedConfigurations = PluginsConfigurationProvider.resolveCriteriaAttributes(criteriaServerAttributes, criteria, testMarker)
    // expected: the 2 last configurations have been resolved. the corresponding attributes should have been decorated by the
    // testMarker (note: the test pool holds 'server' and standard attributes )
    assert.lengthOf(resolvedConfigurations, 2, '2 plugins configurations should have been kept')
    const firstConf = resolvedConfigurations[0]
    const secondConf = resolvedConfigurations[1]
    assert.equal(firstConf.id, 3, '[Plugin 3] configuration should have be retained')
    assert.lengthOf(values(firstConf.conf.attributes), 3, '[Plugin 3] all parameters should be retrieved')
    assert.equal(firstConf.conf.attributes.testAttr1.label, 'Long parameter', '[Plugin 3 - testAttr1] should be correctly resolved')
    assert.isTrue(firstConf.conf.attributes.testAttr1.testMarker, '[Plugin 3 - testAttr1] should have been built using testMarker method')
    assert.equal(firstConf.conf.attributes.testAttr2.label, 'Label', '[Plugin 3 - testAttr2] should be correctly resolved')
    assert.isTrue(firstConf.conf.attributes.testAttr2.testMarker, '[Plugin 3 - testAttr2] should have been built using testMarker method')
    assert.equal(firstConf.conf.attributes.testAttr3.label, 'Internal ID', '[Plugin 3 - testAttr3] should be correctly resolved')
    assert.isTrue(firstConf.conf.attributes.testAttr3.testMarker, '[Plugin 3 - testAttr3] should have been built using testMarker method')

    assert.equal(secondConf.id, 4, '[Plugin 4] configuration should have be present')
    assert.lengthOf(values(secondConf.conf.attributes), 3, '[Plugin 4] all parameters should be retrieved')
    assert.equal(secondConf.conf.attributes.testAttr1.label, 'Long parameter', '[Plugin 4 - testAttr1] should be correctly resolved')
    assert.isTrue(secondConf.conf.attributes.testAttr1.testMarker, '[Plugin 4 - testAttr1] should have been built using testMarker method')
    assert.equal(secondConf.conf.attributes.testAttr2.label, 'Date parameter', '[Plugin 4 - testAttr2] should be correctly resolved')
    assert.isTrue(secondConf.conf.attributes.testAttr2.testMarker, '[Plugin 4 - testAttr2] should have been built using testMarker method')
    assert.equal(secondConf.conf.attributes.testAttr3.label, 'String parameter', '[Plugin 4 - testAttr3] should be correctly resolved')
    assert.isTrue(secondConf.conf.attributes.testAttr3.testMarker, '[Plugin 4 - testAttr3] should have been built using testMarker method')
  })
  it('should mark loading only attributes with that are "boundable"', () => {
    const resolvedConfigurations = PluginsConfigurationProvider.resolveCriteriaAttributes(criteriaServerAttributes, criteria,
      PluginsConfigurationProvider.withLoadingBoundInfo)
    // previous test checked that marker is correctly applied. We test in this one that the bounds information matches attribute type
    assert.lengthOf(resolvedConfigurations, 2, '2 plugins configurations should have been kept')
    const firstConf = resolvedConfigurations[0]
    const secondConf = resolvedConfigurations[1]
    assert.equal(firstConf.id, 3, '[Plugin 3] configuration should have be retained')
    assert.lengthOf(values(firstConf.conf.attributes), 3, '[Plugin 3] all parameters should be retrieved')
    assert.isTrue(firstConf.conf.attributes.testAttr1.boundsInformation.exists, '[Plugin 3 - testAttr1] bounds should be marked existing')
    assert.isFalse(firstConf.conf.attributes.testAttr2.boundsInformation.exists, '[Plugin 3 - testAttr2] bounds should be marked unexisting')
    assert.isFalse(firstConf.conf.attributes.testAttr3.boundsInformation.exists, '[Plugin 3 - testAttr3] bounds should be marked unexisting')

    assert.equal(secondConf.id, 4, '[Plugin 4] configuration should have be present')
    assert.lengthOf(values(secondConf.conf.attributes), 3, '[Plugin 4] all parameters should be retrieved')
    assert.isTrue(secondConf.conf.attributes.testAttr1.boundsInformation.exists, '[Plugin 4 - testAttr1] bounds should be marked existing')
    assert.isTrue(secondConf.conf.attributes.testAttr2.boundsInformation.exists, '[Plugin 4 - testAttr2] bounds should be marked unexisting')
    assert.isFalse(secondConf.conf.attributes.testAttr3.boundsInformation.exists, '[Plugin 4 - testAttr3] bounds should be marked unexisting')
  })
  it('Should retrieve the right "boundable" attributes from previously resolved attributes', () => {
    const resolvedConfigurations = PluginsConfigurationProvider.resolveCriteriaAttributes(criteriaServerAttributes, criteria,
      PluginsConfigurationProvider.withLoadingBoundInfo)
    // expected boundable : 'xxx.long.parameter', 'yyy.date.parameter'
    const attributesToFetchIn = PluginsConfigurationProvider.getAttributesToFetchIn(resolvedConfigurations)
    assert.lengthOf(attributesToFetchIn, 2, 'Only two boundable attributes should be retrieved')
    assert.include(attributesToFetchIn, 'xxx.long.parameter', 'Long parameter should be retrieved as boundable')
    assert.include(attributesToFetchIn, 'yyy.date.parameter', 'Date parameter should be retrieved as boundable')
  })
  it('Should apply an operation on all attributes using updateAttributes', () => {
    const resolvedConfigurations = PluginsConfigurationProvider.resolveCriteriaAttributes(criteriaServerAttributes, criteria,
      PluginsConfigurationProvider.withLoadingBoundInfo)
    // check each attribute model configuration was updated
    const testMarker = attribute => ({ ...attribute, testMarker: true })
    const updatedConfiguration = PluginsConfigurationProvider.updateAttributes(resolvedConfigurations, testMarker)

    assert.lengthOf(updatedConfiguration, 2, '2 plugins configurations should have been kept')
    // test marker should be present in each attribute of each plugin configuration
    const firstConfAttr = values(updatedConfiguration[0].conf.attributes)
    assert.lengthOf(firstConfAttr, 3, '[Plugin 3] There should still be 3 attributes')
    firstConfAttr.forEach((attr, index) => {
      assert.isTrue(attr.testMarker, `[Plugin 3 - testAttr${index + 1}] There should be testMarker:true`)
    })

    const secondConfAttr = values(updatedConfiguration[1].conf.attributes)
    assert.lengthOf(secondConfAttr, 3, '[Plugin 4] There should still be 3 attributes')
    secondConfAttr.forEach((attr, index) => {
      assert.isTrue(attr.testMarker, `[Plugin 3 - testAttr${index + 1}] There should be testMarker:true`)
    })
  })
  it('Should complete the right attribute with found bounds information', () => {
    const resolvedConfigurations = PluginsConfigurationProvider.resolveCriteriaAttributes(criteriaServerAttributes, criteria,
      PluginsConfigurationProvider.withLoadingBoundInfo)
    const foundBoundsInfo = {
      'yyy.date.parameter': {
        content: {
          lowerBound: '2018-09-27T13:15:42.726Z',
          upperBound: '2018-09-27T13:17:35.452Z',
        },
      },
      label: {
        lowerBounds: 5,
        upperBounds: 28,
      },
    }
    // test 1: an attribute that was marked boundable (with bounds information) and for which bounds was retrieved (Date parameter)
    const t1Before = resolvedConfigurations[1].conf.attributes.testAttr2
    const t1WithBounds = PluginsConfigurationProvider.withFetchedBounds(foundBoundsInfo, t1Before)
    assert.deepEqual(t1WithBounds.boundsInformation, {
      exists: true,
      loading: false,
      error: false,
      lowerBound: '2018-09-27T13:15:42.726Z',
      upperBound: '2018-09-27T13:17:35.452Z',
    }, 'T1 - Bounds should be recovered from server map')
    // test 2: an attribute that was marked boundable but for which no bound was returned (Long parameter)
    const t2Before = resolvedConfigurations[1].conf.attributes.testAttr1
    const t2WithBounds = PluginsConfigurationProvider.withFetchedBounds(foundBoundsInfo, t2Before)
    assert.deepEqual(t2WithBounds.boundsInformation, {
      exists: true,
      loading: false,
      error: false,
      lowerBound: undefined,
      upperBound: undefined,
    }, 'T2 - No bound should be found but loading should be marked false')
    // test3: an attribute that was not marked boundable and has no bound (Internal ID)
    const t3Before = resolvedConfigurations[0].conf.attributes.testAttr3
    const t3WithBounds = PluginsConfigurationProvider.withFetchedBounds(foundBoundsInfo, t3Before)
    assert.deepEqual(t3WithBounds.boundsInformation, t3Before.boundsInformation, 'T3 - Should be unchanged')
    // test4: an attribute that was not marked boundable and has a bound (label)
    const t4Before = resolvedConfigurations[0].conf.attributes.testAttr3
    const t4WithBounds = PluginsConfigurationProvider.withFetchedBounds(foundBoundsInfo, t3Before)
    assert.deepEqual(t4WithBounds.boundsInformation, t4Before.boundsInformation, 'T4 - Should be unchanged')
  })
  it('Should set error state only in "boundable" attributes', () => {
    const resolvedConfigurations = PluginsConfigurationProvider.resolveCriteriaAttributes(criteriaServerAttributes, criteria,
      PluginsConfigurationProvider.withLoadingBoundInfo)
    // test 1: an attribute that was marked boundable (with bounds information) (Date parameter)
    const t1Before = resolvedConfigurations[1].conf.attributes.testAttr2
    const t1WithError = PluginsConfigurationProvider.withFetchingError(t1Before)
    assert.deepEqual(t1WithError.boundsInformation, {
      exists: true,
      loading: false,
      error: true,
    }, 'T1 - fetching error should be marked')
    // test 2: an attribute that was not marked boundable
    const t2Before = resolvedConfigurations[0].conf.attributes.testAttr3
    const t2WithError = PluginsConfigurationProvider.withFetchingError(t2Before)
    assert.deepEqual(t2WithError.boundsInformation, {
      exists: false,
      loading: false,
      error: false,
    }, 'T2 - fetching error should not be marked (not boundable)')
  })
  it('should render correctly and update on bounds received', () => {
    let spiedClearCount = 0
    let spiedFetchCount = 0
    let spiedAttributesToFetch = null
    let spiedInitialQuery = null
    const props = {
      criteria,
      initialQuery: 'abcdefg',
      authentication: null,
      attributeModels: {},
      attributesBounds: {},
      boundsFetchingError: false,
      dispatchClearBounds: () => {
        spiedClearCount += 1
      },
      dispatchFetchBounds: (attributesToFetch, initialQuery) => {
        spiedFetchCount += 1
        spiedAttributesToFetch = attributesToFetch
        spiedInitialQuery = initialQuery
      },
    }
    // 1 - call without models: no configuration should be resolved
    const enzymeWrapper = shallow(<PluginsConfigurationProvider {...props} />, { context })
    assert.equal(spiedClearCount, 0, '1 - Clear should not have been called yet')
    assert.equal(spiedFetchCount, 0, '1 - Fetch bounds should not have been called yet')
    assert.lengthOf(enzymeWrapper.state().plugins, 0, '1 - No plugin configuration should be resolved')

    // 2 - Set attribute models and check the same configurations than before are resolved
    const props2 = { ...props, attributeModels: criteriaServerAttributes }
    enzymeWrapper.setProps(props2)
    assert.equal(spiedClearCount, 1, '2 - Clear should have been called')
    assert.equal(spiedClearCount, 1, '2 - Fetch should have been called')
    assert.lengthOf(spiedAttributesToFetch, 2, '2 - 2 boundable attributes should have been retrieved')
    assert.include(spiedAttributesToFetch, 'xxx.long.parameter', '2 - The Long parameter attribute should have been retrieved')
    assert.include(spiedAttributesToFetch, 'yyy.date.parameter', '2 - The Date parameter attribute should have been retrieved')
    assert.equal(spiedInitialQuery, props.initialQuery, 'Initial query should be correctly set in bounds fetching context')
    // check configurations content
    const resolvedConfigurations = enzymeWrapper.state().plugins
    assert.lengthOf(resolvedConfigurations, 2, '2 - 2 plugins should be resolved')
    const resolvedP3 = resolvedConfigurations[0]
    assert.equal(resolvedP3.id, 3, '2 - [Plugin 3] The plugin 3 should be resolved')
    // check attributes are correctly initialized
    const p3Attributes = values(resolvedP3.conf.attributes)
    assert.lengthOf(p3Attributes, 3, '2 - [Plugin 3] attributes should be correctly resolved')
    assert.deepEqual(p3Attributes[0].boundsInformation, {
      exists: true,
      loading: true,
      error: false,
    }, '2 - [Plugin 3] "xxx.long.parameter" should be correctly resolved')
    assert.deepEqual(p3Attributes[1].boundsInformation, {
      exists: false,
      loading: false,
      error: false,
    }, '2 - [Plugin 3] "label" should be correctly resolved')
    assert.deepEqual(p3Attributes[2].boundsInformation, {
      exists: false,
      loading: false,
      error: false,
    }, '2 - [Plugin 3] "id" should be correctly resolved')
    // 3 - On fetching end, the bounds should be set in resolved attributes
    const props3 = {
      ...props2,
      attributesBounds: {
        'xxx.long.parameter': {
          content: {
            propertyName: 'xxx.long.parameter',
            lowerBound: 5,
            upperBound: 62,
          },
        },
      },
    }
    enzymeWrapper.setProps(props3)
    const longParamWithBounds = enzymeWrapper.state().plugins[0].conf.attributes.testAttr1
    assert.deepEqual(longParamWithBounds.boundsInformation, {
      exists: true,
      loading: false,
      error: false,
      lowerBound: 5,
      upperBound: 62,
    }, '3 - Resolved bounds should be correctly reported in resolved configuration, from state')
  })
  it('should render correctly and update on error received', () => {
    const props = {
      criteria,
      initialQuery: 'abcdefg',
      authentication: null,
      attributeModels: criteriaServerAttributes,
      attributesBounds: {},
      boundsFetchingError: false,
      dispatchClearBounds: () => {},
      dispatchFetchBounds: () => {},
    }
    // 1 - Configurations should be initially resolved
    const enzymeWrapper = shallow(<PluginsConfigurationProvider {...props} />, { context })
    assert.lengthOf(enzymeWrapper.state().plugins, 2, '1 - 2 plugins should be initialy resolved')

    // 2 - Simulate error received and check configurations are correctly updated
    const props2 = { ...props, boundsFetchingError: true }
    enzymeWrapper.setProps(props2)
    const pluginsConfigurations = enzymeWrapper.state().plugins
    assert.lengthOf(pluginsConfigurations, 2, '2 - The number of resolved plugins should not change')

    const longParamWithBounds = enzymeWrapper.state().plugins[0].conf.attributes.testAttr1
    assert.deepEqual(longParamWithBounds.boundsInformation, {
      exists: true,
      loading: false,
      error: true,
    }, '2 - Error should be reported in "boundable" attributes')

    const labelParamWithBounds = enzymeWrapper.state().plugins[0].conf.attributes.testAttr2
    assert.deepEqual(labelParamWithBounds.boundsInformation, {
      exists: false,
      loading: false,
      error: false,
    }, '2 - Error should not be reported in "unboundable" attributes')
  })
})
