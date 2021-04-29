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
import get from 'lodash/get'
import values from 'lodash/values'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { UIDomain, CatalogDomain, DamDomain } from '@regardsoss/domain'
import { AttributeBoundsConfiguration } from '@regardsoss/api'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CriterionWrapperContainer } from '../../../../../../src/containers/user/tabs/results/search/CriterionWrapperContainer'
import CriterionWrapperComponent from '../../../../../../src/components/user/tabs/results/search/CriterionWrapperComponent'
import styles from '../../../../../../src/styles'
import { attributes } from '../../../../../dumps/attributes.dump'

const context = buildTestContext(styles)

/**
 * Test CriterionWrapperContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing CriterionWrapperContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CriterionWrapperContainer)
  })

  it('should render correctly and fetch bounds taking all currently applying parameters except self criterion ones', (done) => {
    const spiedFetchBounds = {}
    let enzymeWrapper = null
    const props = {
      groupIndex: 1,
      criterionIndex: 1,
      criterion: {
        pluginId: 4,
        pluginInstanceId: 'p4',
        conf: {
          attributes: {
            attrA: attributes[1].content, // that attribute should not be fetched
            attrB: attributes[3].content, // that attribute should be fetched
            attrC: attributes[4].content, // that attribute should be fetched too
          },
        },
        label: { [UIDomain.LOCALES_ENUM.en]: 'x1', [UIDomain.LOCALES_ENUM.fr]: 'y1' },
        state: { thisState: true, but: 56, and: ['a', 'b', 'c'] },
        requestParameters: { aParam: 'That should not be taken in Account', q: 'ignoredToo' },
        delayedRequestParameters: { anotherParam: 'not found', q: 'ignored' },
      },
      groups: [{ // group 0 : 1 crit
        showTitle: true,
        title: {
          [UIDomain.LOCALES_ENUM.en]: 'Group 1',
          [UIDomain.LOCALES_ENUM.fr]: 'Groupe 1',
        },
        criteria: [{
          pluginId: 8,
          pluginInstanceId: 'anythingIWant',
          conf: {
            attributes: { attr1: attributes[1].content },
          },
          label: { [UIDomain.LOCALES_ENUM.en]: 'Plugin1', [UIDomain.LOCALES_ENUM.fr]: 'Plugin1' },
          state: { OK: true, kos: 36 },
          requestParameters: { ok: true, q: 'afterKos: [* TO 36]' }, // should be reported
        }],
      }, { // group 1 (this group) : 2 criters
        showTitle: false,
        title: {
          [UIDomain.LOCALES_ENUM.en]: '',
          [UIDomain.LOCALES_ENUM.fr]: '',
        },
        criteria: [{
          pluginId: 65,
          pluginInstanceId: 'anythingIWant3',
          conf: {
            attributes: { attr1000: attributes[2].content },
          },
          label: { [UIDomain.LOCALES_ENUM.en]: 'Plugin1', [UIDomain.LOCALES_ENUM.fr]: 'Plugin1' },
          state: { count: { exact: true, val: 26 }, error: true },
          requestParameters: { q: 'count: [* TO 25] AND [27 TO *]' }, // should be reported
          delayedRequestParameters: { q: 'count: 25' }, // should be ignored
        }, {
          pluginId: 4,
          pluginInstanceId: 'p4',
          conf: {
            attributes: {
              attrA: attributes[1].content, // that attribute should not be fetched
              attrB: attributes[3].content, // that attribute should be fetched
              attrC: attributes[4].content, // that attribute should be fetched too
            },
          },
          label: { [UIDomain.LOCALES_ENUM.en]: 'x1', [UIDomain.LOCALES_ENUM.fr]: 'y1' },
          state: { thisState: true, but: 56, and: ['a', 'b', 'c'] },
          requestParameters: { aParam: 'That should not be taken in Account', q: 'ignoredToo' },
          delayedRequestParameters: { anotherParam: 'not found', q: 'ignored' },
        }],
      }, { // group 2
        showTitle: true,
        title: {
          [UIDomain.LOCALES_ENUM.en]: 'Group 3',
          [UIDomain.LOCALES_ENUM.fr]: 'Groupe 3',
        },
        criteria: [{
          pluginId: 8,
          pluginInstanceId: 'oyeoye',
          conf: { // configuration
            attributes: { attr1: attributes[2].content },
          },
          label: { [UIDomain.LOCALES_ENUM.en]: 'aye', [UIDomain.LOCALES_ENUM.fr]: 'aye' },
          state: { count: { exact: true, val: 26 }, error: true },
          requestParameters: { simpleMarker: false, q: 'talky: "walky"' },
        }],
      }],
      rootContextCriteria: [{ requestParameters: { a: 'fromRoot', q: 'root:true' } },
        { requestParameters: { q: 'rootVal:[* TO 66]' } }],
      onUpdatePluginState: () => { },
      dispatchFetchBounds: (attributesPath, contextQuery) => {
        spiedFetchBounds.attributesPath = attributesPath
        spiedFetchBounds.contextQuery = contextQuery
        const promise = new Promise((resolve) => {
          testSuiteHelpers.getRealTimeout(() => {
            // return valid bounds
            resolve({
              payload: {
                entities: {
                  [AttributeBoundsConfiguration.normalizrKey]: {
                    [attributes[3].content.jsonPath]: {
                      content: {
                        lowerBound: 12.5,
                        upperBound: 45.5,
                      },
                    },
                    [attributes[4].content.jsonPath]: {
                      content: {
                        lowerBound: '2020-10-27T13:15:42.726Z',
                        upperBound: '2020-12-25T13:15:42.726Z',
                      },
                    },
                    fakeAttribute: {
                      content: {
                        lowerBound: 8,
                        upperBound: 45,
                      },
                    },
                  },
                },
              },
            })
            // after resolve: wait for container to handle promise and check new state
            testSuiteHelpers.getRealTimeout(() => {
              // 3 - After loading: check resolved attributes
              const componentWrapperAfterUpdate = enzymeWrapper.find(CriterionWrapperComponent)
              testSuiteHelpers.assertWrapperProperties(componentWrapperAfterUpdate, {
                pluginId: props.criterion.pluginId,
                pluginInstanceId: props.criterion.pluginInstanceId,
                pluginProps: {
                  label: props.criterion.label,
                  state: props.criterion.state,
                  publishState: enzymeWrapper.instance().onUpdateState,
                  searchContext: {
                    engineType: CatalogDomain.LEGACY_SEARCH_ENGINE,
                    searchParameters: {
                      a: ['fromRoot'],
                      ok: [true],
                      q: ['root:true AND rootVal:[* TO 66] AND afterKos: [* TO 36] AND count: [* TO 25] AND [27 TO *] AND talky: "walky"'],
                      simpleMarker: [false],
                    },
                  },
                },
                pluginConf: {
                  attributes: {
                    attrA: {
                      ...attributes[1].content,
                      boundsInformation: {
                        exists: false,
                        loading: false,
                        error: false,
                      },
                    },
                    attrB: {
                      ...attributes[3].content,
                      boundsInformation: {
                        exists: true,
                        loading: false,
                        error: false,
                        lowerBound: 12.5,
                        upperBound: 45.5,
                      },
                    },
                    attrC: {
                      ...attributes[4].content,
                      boundsInformation: {
                        exists: true,
                        loading: false,
                        error: false,
                        lowerBound: '2020-10-27T13:15:42.726Z',
                        upperBound: '2020-12-25T13:15:42.726Z',
                      },
                    },
                  },
                },
              }, 'After loading: bounds should be resolved')
              done()
            }, 5)
          }, 10)
        })
        return promise
      },
    }
    enzymeWrapper = shallow(<CriterionWrapperContainer {...props} />, { context })
    // 1 - Test, after mounting, the component started immedialtely fetching bounds for attrB and attrC
    assert.deepEqual(spiedFetchBounds.attributesPath, [
      attributes[3].content.jsonPath,
      attributes[4].content.jsonPath], 'Bounds should be fetched for attributes 3 and 4 (1 ignored as not boundable)')
    // note: parameters are transferred to array, so that queries can handle multiple values
    assert.deepEqual(spiedFetchBounds.contextQuery, {
      a: ['fromRoot'],
      ok: [true],
      q: ['root:true AND rootVal:[* TO 66] AND afterKos: [* TO 36] AND count: [* TO 25] AND [27 TO *] AND talky: "walky"'],
      simpleMarker: [false],
    }, 'Context for attributes bounds should be correctly computed as the sum of root parameters and other criteria parameters (but not self)')

    // 2 - Check while resolving, every state is correct
    const componentWrapper = enzymeWrapper.find(CriterionWrapperComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      pluginId: props.criterion.pluginId,
      pluginInstanceId: props.criterion.pluginInstanceId,
      pluginProps: {
        label: props.criterion.label,
        state: props.criterion.state,
        publishState: enzymeWrapper.instance().onUpdateState,
        searchContext: {
          engineType: CatalogDomain.LEGACY_SEARCH_ENGINE,
          searchParameters: {
            a: ['fromRoot'],
            ok: [true],
            q: ['root:true AND rootVal:[* TO 66] AND afterKos: [* TO 36] AND count: [* TO 25] AND [27 TO *] AND talky: "walky"'],
            simpleMarker: [false],
          },
        },
      },
      pluginConf: {
        attributes: {
          attrA: {
            ...attributes[1].content,
            boundsInformation: {
              exists: false,
              loading: false,
              error: false,
            },
          },
          attrB: {
            ...attributes[3].content,
            boundsInformation: {
              exists: true,
              loading: true,
              error: false,
            },
          },
          attrC: {
            ...attributes[4].content,
            boundsInformation: {
              exists: true,
              loading: true,
              error: false,
            },
          },
        },
      },
    }, 'Component should define the expected properties, with currently loading bounds attributes')
  })
  it('should update attribute bounds each time another criterion parameters or root context changes', () => {
    let spiedFetchCount = 0
    const props = {
      groupIndex: 1,
      criterionIndex: 1,
      criterion: {
        pluginId: 4,
        pluginInstanceId: 'p4',
        conf: {
          attributes: {
            attrA: attributes[1].content, // that attribute should not be fetched
            attrB: attributes[3].content, // that attribute should be fetched
            attrC: attributes[4].content, // that attribute should be fetched too
          },
        },
        label: { [UIDomain.LOCALES_ENUM.en]: 'x1', [UIDomain.LOCALES_ENUM.fr]: 'y1' },
        state: { thisState: true, but: 56, and: ['a', 'b', 'c'] },
        requestParameters: { aParam: 'That should not be taken in Account', q: 'ignoredToo' },
        delayedRequestParameters: { anotherParam: 'not found', q: 'ignored' },
      },
      groups: [{ // group 0 : 1 crit
        showTitle: true,
        title: {
          [UIDomain.LOCALES_ENUM.en]: 'Group 1',
          [UIDomain.LOCALES_ENUM.fr]: 'Groupe 1',
        },
        criteria: [{
          pluginId: 8,
          pluginInstanceId: 'anythingIWant',
          conf: {
            attributes: { attr1: attributes[1].content },
          },
          label: { [UIDomain.LOCALES_ENUM.en]: 'Plugin1', [UIDomain.LOCALES_ENUM.fr]: 'Plugin1' },
          state: { OK: true, kos: 36 },
          requestParameters: { ok: true, q: 'afterKos: [* TO 36]' }, // should be reported
        }],
      }, { // group 1 (this group) : 2 criters
        showTitle: false,
        title: {
          [UIDomain.LOCALES_ENUM.en]: '',
          [UIDomain.LOCALES_ENUM.fr]: '',
        },
        criteria: [{
          pluginId: 65,
          pluginInstanceId: 'anythingIWant3',
          conf: {
            attributes: { attr1000: attributes[2].content },
          },
          label: { [UIDomain.LOCALES_ENUM.en]: 'Plugin1', [UIDomain.LOCALES_ENUM.fr]: 'Plugin1' },
          state: { count: { exact: true, val: 26 }, error: true },
          requestParameters: { q: 'count: [* TO 25] AND [27 TO *]' }, // should be reported
          delayedRequestParameters: { q: 'count: 25' }, // should be ignored
        }, {
          pluginId: 4,
          pluginInstanceId: 'p4',
          conf: {
            attributes: {
              attrA: attributes[1].content, // that attribute should not be fetched
              attrB: attributes[3].content, // that attribute should be fetched
              attrC: attributes[4].content, // that attribute should be fetched too
            },
          },
          label: { [UIDomain.LOCALES_ENUM.en]: 'x1', [UIDomain.LOCALES_ENUM.fr]: 'y1' },
          state: { thisState: true, but: 56, and: ['a', 'b', 'c'] },
          requestParameters: { aParam: 'That should not be taken in Account', q: 'ignoredToo' },
          delayedRequestParameters: { anotherParam: 'not found', q: 'ignored' },
        }],
      }, { // group 2
        showTitle: true,
        title: {
          [UIDomain.LOCALES_ENUM.en]: 'Group 3',
          [UIDomain.LOCALES_ENUM.fr]: 'Groupe 3',
        },
        criteria: [{
          pluginId: 8,
          pluginInstanceId: 'oyeoye',
          conf: { // configuration
            attributes: { attr1: attributes[2].content },
          },
          label: { [UIDomain.LOCALES_ENUM.en]: 'aye', [UIDomain.LOCALES_ENUM.fr]: 'aye' },
          state: { count: { exact: true, val: 26 }, error: true },
          requestParameters: { simpleMarker: false, q: 'talky: "walky"' },
        }],
      }],
      rootContextCriteria: [{ requestParameters: { a: 'fromRoot', q: 'root:true' } },
        { requestParameters: { q: 'rootVal:[* TO 66]' } }],
      onUpdatePluginState: () => { },
      dispatchFetchBounds: () => {
        spiedFetchCount += 1
        return new Promise((resolve) => {
          // do not resolve, not required for test
        })
      },
    }
    const enzymeWrapper = shallow(<CriterionWrapperContainer {...props} />, { context })
    assert.equal(spiedFetchCount, 1, 'It should have fetched for initialization')

    // simulate an update of root the context
    const props2 = {
      ...props,
      rootContextCriteria: [{ requestParameters: { q: 'root:true' } }, { requestParameters: { q: 'rootVal:[* TO 67]' } }],
    }
    enzymeWrapper.setProps(props2)
    assert.equal(spiedFetchCount, 2, 'It should have fetched after root context update')
    // simulate an update of any other criterion
    const props3 = {
      ...props2,
      groups: [
        props2.groups[0],
        props2.groups[1], {
          ...props2.groups[2],
          criteria: [{
            ...props2.groups[2].criteria[0],
            requestParameters: { simpleMarker: false, q: 'talky: "walky2"' },
          }],
        },
      ],
    }
    enzymeWrapper.setProps(props3)
    assert.equal(spiedFetchCount, 3, 'It should have fetched after other criterion request parameters update (2:0)')
    // simulate an update on delayed parameters (should be ignored)
    const props4 = {
      ...props3,
      groups: [
        props3.groups[0],
        props3.groups[1], {
          ...props3.groups[2],
          criteria: [{
            ...props3.groups[2].criteria[0],
            delayedRequestParameters: { simpleMarker: true, q: 'talky: "walky5"' },
          }],
        },
      ],
    }
    enzymeWrapper.setProps(props4)
    assert.equal(spiedFetchCount, 3, 'It should not have fetched on delayed parameters update (2:0) - they will be committed later on')
    // simulate an update of self criterion (should not update)
    const props5 = {
      ...props4,
      groups: [
        props4.groups[0], {
          ...props4.groups[1],
          criteria: [
            props4.groups[1].criteria[0], {
              ...props4.groups[1].criteria[1],
              state: { thisState: false, but: 56, and: ['d', 'e', 'f'] },
              requestParameters: { aParam: 'Still ignored', q: 'gru' },
              delayedRequestParameters: { anotherParam: 'xxx', q: 'fuu' },
            },
          ],
        },
        props4.groups[2],
      ],
    }
    enzymeWrapper.setProps(props5)
    assert.equal(spiedFetchCount, 3, 'It should not have fetched on self parameters update')
  })
  it('should update criterion properties on criterion state changes', () => {
    const criterion = {
      pluginId: 4,
      pluginInstanceId: 'p4',
      conf: {
        attributes: {
          attrA: attributes[1].content, // that attribute should not be fetched
          attrB: attributes[3].content, // that attribute should be fetched
          attrC: attributes[4].content, // that attribute should be fetched too
        },
      },
      label: { [UIDomain.LOCALES_ENUM.en]: 'x1', [UIDomain.LOCALES_ENUM.fr]: 'y1' },
      state: { thisState: true, but: 56, and: ['a', 'b', 'c'] },
      requestParameters: { aParam: 'xxx' },
    }
    const props = {
      groupIndex: 0,
      criterionIndex: 0,
      criterion,
      groups: [{
        showTitle: true,
        title: {
          [UIDomain.LOCALES_ENUM.en]: 'Group 1',
          [UIDomain.LOCALES_ENUM.fr]: 'Groupe 1',
        },
        criteria: [criterion],
      }],
      rootContextCriteria: [],
      onUpdatePluginState: () => { },
      dispatchFetchBounds: () => new Promise((resolve) => { }),
    }
    const enzymeWrapper = shallow(<CriterionWrapperContainer {...props} />, { context })
    let componentWrapper = enzymeWrapper.find(CriterionWrapperComponent)
    assert.lengthOf(componentWrapper, 1)
    assert.deepEqual(componentWrapper.props().pluginProps.state, criterion.state, 'Initial state should be correctly reported')

    const updatedCriterion = {
      pluginId: 4,
      pluginInstanceId: 'p4',
      conf: {
        attributes: {
          attrA: attributes[1].content, // that attribute should not be fetched
          attrB: attributes[3].content, // that attribute should be fetched
          attrC: attributes[4].content, // that attribute should be fetched too
        },
      },
      label: { [UIDomain.LOCALES_ENUM.en]: 'x1', [UIDomain.LOCALES_ENUM.fr]: 'y1' },
      state: { thisState: false, but: 33, and: ['e', 'f', 'g'] },
      requestParameters: { aParam: 'yyy' },
    }
    enzymeWrapper.setProps({
      ...props,
      criterion: updatedCriterion,
      groups: [{
        ...props.groups[0],
        criteria: [updatedCriterion],
      }],
    })
    componentWrapper = enzymeWrapper.find(CriterionWrapperComponent)
    assert.deepEqual(componentWrapper.props().pluginProps.state, updatedCriterion.state, 'Criterion state should be updated')
  })
  it('should report correctly a state publish event', () => {
    const spiedUpdateState = {}
    const criterion = {
      pluginId: 4,
      pluginInstanceId: 'p4',
      conf: {
        attributes: {
          attrA: attributes[1].content, // that attribute should not be fetched
          attrB: attributes[3].content, // that attribute should be fetched
          attrC: attributes[4].content, // that attribute should be fetched too
        },
      },
      label: { [UIDomain.LOCALES_ENUM.en]: 'x1', [UIDomain.LOCALES_ENUM.fr]: 'y1' },
      state: { thisState: true, but: 56, and: ['a', 'b', 'c'] },
      requestParameters: { aParam: 'xxx' },
    }
    const props = {
      groupIndex: 9,
      criterionIndex: 25,
      criterion,
      groups: [{
        showTitle: true,
        title: {
          [UIDomain.LOCALES_ENUM.en]: 'Group 1',
          [UIDomain.LOCALES_ENUM.fr]: 'Groupe 1',
        },
        criteria: [criterion],
      }],
      rootContextCriteria: [],
      onUpdatePluginState: (groupIndex, criterionIndex, newState, newRequestParameters) => {
        spiedUpdateState.groupIndex = groupIndex
        spiedUpdateState.criterionIndex = criterionIndex
        spiedUpdateState.newState = newState
        spiedUpdateState.newRequestParameters = newRequestParameters
      },
      dispatchFetchBounds: () => new Promise((resolve) => { }),
    }
    const enzymeWrapper = shallow(<CriterionWrapperContainer {...props} />, { context })
    enzymeWrapper.instance().onUpdateState({
      a: true, b: 52, c: [1, 2], d: { ok: 'ok' },
    }, {
      p: 'a20', v: true, azerty: 18, q: ['a:[*TO 5]'],
    })
    assert.deepEqual(spiedUpdateState, {
      groupIndex: 9,
      criterionIndex: 25,
      newState: {
        a: true, b: 52, c: [1, 2], d: { ok: 'ok' },
      },
      newRequestParameters: {
        p: 'a20', v: true, azerty: 18, q: ['a:[*TO 5]'],
      },
    })
  })
  it('should compute correctly attributes bounds errors', (done) => {
    let enzymeWrapper = null
    const props = {
      groupIndex: 1,
      criterionIndex: 1,
      criterion: {
        pluginId: 4,
        pluginInstanceId: 'p4',
        conf: {
          attributes: {
            attrA: attributes[1].content, // that attribute should not be fetched
            attrB: attributes[3].content, // that attribute should be fetched
            attrC: attributes[4].content, // that attribute should be fetched too
          },
        },
        label: { [UIDomain.LOCALES_ENUM.en]: 'x1', [UIDomain.LOCALES_ENUM.fr]: 'y1' },
        state: { thisState: true, but: 56, and: ['a', 'b', 'c'] },
        requestParameters: { aParam: 'That should not be taken in Account', q: 'ignoredToo' },
        delayedRequestParameters: { anotherParam: 'not found', q: 'ignored' },
      },
      groups: [],
      rootContextCriteria: [],
      onUpdatePluginState: () => { },
      dispatchFetchBounds: () => {
        const promise = new Promise((resolve, reject) => {
          testSuiteHelpers.getRealTimeout(() => {
            // return valid bounds
            reject()
            // after resolve: wait for container to handle promise and check new state
            testSuiteHelpers.getRealTimeout(() => {
              // After loading: check resolved attributes errors
              const componentWrapperAfterUpdate = enzymeWrapper.find(CriterionWrapperComponent)
              testSuiteHelpers.assertWrapperProperties(componentWrapperAfterUpdate, {
                pluginId: props.criterion.pluginId,
                pluginInstanceId: props.criterion.pluginInstanceId,
                pluginProps: {
                  label: props.criterion.label,
                  state: props.criterion.state,
                  publishState: enzymeWrapper.instance().onUpdateState,
                  searchContext: {
                    engineType: CatalogDomain.LEGACY_SEARCH_ENGINE,
                    searchParameters: { q: [] },
                  },
                },
                pluginConf: {
                  attributes: {
                    attrA: {
                      ...attributes[1].content,
                      boundsInformation: {
                        exists: false,
                        loading: false,
                        error: false,
                      },
                    },
                    attrB: {
                      ...attributes[3].content,
                      boundsInformation: {
                        exists: true,
                        loading: false,
                        error: true,
                      },
                    },
                    attrC: {
                      ...attributes[4].content,
                      boundsInformation: {
                        exists: true,
                        loading: false,
                        error: true,
                      },
                    },
                  },
                },
              }, 'After loading: bounds should be resolved')
              done()
            }, 5)
          }, 5)
        })
        return promise
      },
    }
    enzymeWrapper = shallow(<CriterionWrapperContainer {...props} />, { context })
  })
  it('should compute bounds for each attrbiute needing it (and not others)', () => {
    values(DamDomain.MODEL_ATTR_TYPES).forEach((attrType) => {
      const props = {
        groupIndex: 1,
        criterionIndex: 1,
        criterion: {
          pluginId: 4,
          pluginInstanceId: 'p4',
          conf: {
            attributes: {
              attrA: {
                ...attributes[1].content,
                type: attrType,
              },
            },
          },
          label: { [UIDomain.LOCALES_ENUM.en]: 'x1', [UIDomain.LOCALES_ENUM.fr]: 'y1' },
        },
        groups: [],
        rootContextCriteria: [],
        onUpdatePluginState: () => { },
        dispatchFetchBounds: () => new Promise((resolve) => {
          // no need to resolve it for this test
        }),
      }
      const enzymeWrapper = shallow(<CriterionWrapperContainer {...props} />, { context })
      const compWrapper = enzymeWrapper.find(CriterionWrapperComponent)
      assert.lengthOf(compWrapper, 1)
      const attrA = get(compWrapper.props(), 'pluginConf.attributes.attrA')
      switch (attrType) {
        case DamDomain.MODEL_ATTR_TYPES.BOOLEAN:
        case DamDomain.MODEL_ATTR_TYPES.DATE_ARRAY:
        case DamDomain.MODEL_ATTR_TYPES.DATE_INTERVAL:
        case DamDomain.MODEL_ATTR_TYPES.DOUBLE_ARRAY:
        case DamDomain.MODEL_ATTR_TYPES.DOUBLE_INTERVAL:
        case DamDomain.MODEL_ATTR_TYPES.INTEGER_ARRAY:
        case DamDomain.MODEL_ATTR_TYPES.INTEGER_INTERVAL:
        case DamDomain.MODEL_ATTR_TYPES.LONG_ARRAY:
        case DamDomain.MODEL_ATTR_TYPES.LONG_INTERVAL:
        case DamDomain.MODEL_ATTR_TYPES.STRING:
        case DamDomain.MODEL_ATTR_TYPES.STRING_ARRAY:
        case DamDomain.MODEL_ATTR_TYPES.URL:
        case DamDomain.MODEL_ATTR_TYPES.JSON:
          // non boundabled attribute
          assert.deepEqual(attrA, {
            ...props.criterion.conf.attributes.attrA,
            boundsInformation: {
              exists: false,
              loading: false,
              error: false,
            },
          }, `There should be no bound for attribute type: ${attrType}`)
          break
        case DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601:
        case DamDomain.MODEL_ATTR_TYPES.DOUBLE:
        case DamDomain.MODEL_ATTR_TYPES.INTEGER:
        case DamDomain.MODEL_ATTR_TYPES.LONG:
          // boundabled attribute
          assert.deepEqual(attrA, {
            ...props.criterion.conf.attributes.attrA,
            boundsInformation: {
              exists: true,
              loading: true,
              error: false,
            },
          }, `There should be bounds for attribute type: ${attrType}`)
          break
        default:
          assert.fail(`Unknown attribute type: ${attrType}`)
      }
    })
  })
})
