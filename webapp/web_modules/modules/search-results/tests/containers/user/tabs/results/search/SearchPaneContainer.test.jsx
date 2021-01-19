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
import { UIDomain } from '@regardsoss/domain'
import { StabilityDelayer } from '@regardsoss/display-control'
import SearchPaneComponent from '../../../../../../src/components/user/tabs/results/search/SearchPaneComponent'
import { SearchPaneContainer } from '../../../../../../src/containers/user/tabs/results/search/SearchPaneContainer'
import styles from '../../../../../../src/styles'
import { dataContext } from '../../../../../dumps/data.context.dump'
import { CriterionBuilder } from '../../../../../../src/definitions/CriterionBuilder'
import { attributes } from '../../../../../dumps/attributes.dump'

const context = buildTestContext(styles)

/**
 * Test SearchPaneContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing SearchPaneContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchPaneContainer)
  })
  it('should render correctly opened, restoring criteria list when mounting, resolving context as it changes and committing new states delayed',
    (done) => {
      const props = {
        moduleId: 25, // as moduleID 25 was used to build the default dataContext
        resultsContext: UIDomain.ResultsContextHelper.deepMerge(dataContext, {
          selectedTab: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
          tabs: {
            [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
              search: {
                open: true,
              },
              criteria: {
                geometry: [{
                  point1: [12],
                  point2: [25],
                  requestParameters: { geo: 'anything' },
                }],
                tagsFiltering: [CriterionBuilder.buildUnresolvedEntityTagCriterion('anyEntity')],
                requestFacets: [{
                  facetLabels: { [UIDomain.LOCALES_ENUM.en]: 'a facet', [UIDomain.LOCALES_ENUM.fr]: 'un facette' },
                  attribute: attributes[1],
                  requestParameters: { no: 'I shouldn\'t be taken in account' },
                }],
                searchCriteria: [
                  {
                    pluginInstanceId: `[25/${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}/111][my.attr.1/my.attr.2][0:0]`,
                    state: { crit1: 'state', booleanHere: false },
                    requestParameters: { p1: false, q: 'any' },
                  }, {
                    pluginInstanceId: `[25/${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}/833][][0:1]`,
                    state: { crit2: 'something', val: 3 },
                    requestParameters: { kappa: [3, 10], quoala: 'Kiki' },
                  }, {
                    pluginInstanceId: `[25/${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}/1025][my.attr.1/label][1:0]`,
                    state: { crit3: 'stillOK', sliderRange: [36, 55, 58, 103] },
                    requestParameters: { x: [36, 55] },
                  }, { // A state that should be ignored (coming for instance from an old configuration)
                    pluginInstanceId: `25/${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}/9999][my.attr.8][1:1]`,
                    state: { crit4: 'I should be ignored', xzPotatoes: { a: 'b', b: '1' } },
                    requestParameters: { x: [36, 55] },
                  }],
              },
            },
          },
        }),
        tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        updateResultsContext: () => {},
      }
      const enzymeWrapper = shallow(<SearchPaneContainer {...props} />, { context })
      let componentWrapper = enzymeWrapper.find(SearchPaneComponent)
      assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
      testSuiteHelpers.assertWrapperProperties(componentWrapper, {
        open: true,
        // runtime criteria should hold both definition and restored state
        groups: [{
          ...props.resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].search.groups[0],
          criteria: [{
            ...props.resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].search.groups[0].criteria[0],
            state: { crit1: 'state', booleanHere: false },
            requestParameters: { p1: false, q: 'any' },
            delayedRequestParameters: undefined,
          }, {
            ...props.resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].search.groups[0].criteria[1],
            state: { crit2: 'something', val: 3 },
            requestParameters: { kappa: [3, 10], quoala: 'Kiki' },
            delayedRequestParameters: undefined,
          }],
        }, {
          ...props.resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].search.groups[1],
          criteria: [{
            ...props.resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].search.groups[1].criteria[0],
            state: { crit3: 'stillOK', sliderRange: [36, 55, 58, 103] },
            requestParameters: { x: [36, 55] },
            delayedRequestParameters: undefined,
          }],
        }],
        // root context criteria should be correctly collected (ignoring applying search parameters and )
        rootContextCriteria: [{
          requestParameters: { // criterion from configuration
            q: 'tags:"URN:DATASET:EXAMPLE1"',
          },
        },
        {
          point1: [12],
          point2: [25],
          requestParameters: { geo: 'anything' },
        },
        CriterionBuilder.buildUnresolvedEntityTagCriterion('anyEntity'),
        ],
        searchDisabled: false, // as there are restored request parameters
        onUpdatePluginState: enzymeWrapper.instance().onUpdatePluginState,
        onResetPluginsStates: enzymeWrapper.instance().onResetPluginsStates,
        onSearch: enzymeWrapper.instance().onSearch,
        onClose: enzymeWrapper.instance().onClose,
      })
      // Change context and check it is correctly recomputed
      enzymeWrapper.setProps({
        ...props,
        resultsContext: UIDomain.ResultsContextHelper.deepMerge(props.resultsContext, {
          selectedTab: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
          tabs: {
            [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
              search: {
                open: true,
              },
              criteria: {
                geometry: [], // remove geometry
                tagsFiltering: [CriterionBuilder.buildWordTagCriterion('tea')], // change tag
              },
            },
          },
        }),
      })
      componentWrapper = enzymeWrapper.find(SearchPaneComponent)
      assert.deepEqual(componentWrapper.props().rootContextCriteria, [{
        requestParameters: { // criterion from configuration
          q: 'tags:"URN:DATASET:EXAMPLE1"',
        },
      },
      CriterionBuilder.buildWordTagCriterion('tea'),
      ], 'Root context update should be correctly reported to component')
      // Change state (replace instance timer for duration sake!)
      enzymeWrapper.instance().stabilityDelayer = new StabilityDelayer(15)
      // change state of criterion 0:0 and check it is correctly reported to chil
      enzymeWrapper.instance().onUpdatePluginState(0, 1, { myState: 'anything I want' }, { myNewParam: 'is shining!' })
      componentWrapper = enzymeWrapper.find(SearchPaneComponent)
      assert.deepEqual(componentWrapper.props().groups, [{
        ...props.resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].search.groups[0],
        criteria: [{
          ...props.resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].search.groups[0].criteria[0],
          state: { crit1: 'state', booleanHere: false },
          requestParameters: { p1: false, q: 'any' },
          delayedRequestParameters: undefined,
        }, { // updated criterion: new parameters should not be committed now to temporize refreshes / fetches
          ...props.resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].search.groups[0].criteria[1],
          state: { myState: 'anything I want' },
          requestParameters: { kappa: [3, 10], quoala: 'Kiki' }, // unchanged
          delayedRequestParameters: { myNewParam: 'is shining!' }, // delayed
        }],
      }, {
        ...props.resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].search.groups[1],
        criteria: [{
          ...props.resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].search.groups[1].criteria[0],
          state: { crit3: 'stillOK', sliderRange: [36, 55, 58, 103] },
          requestParameters: { x: [36, 55] },
          delayedRequestParameters: undefined,
        }],
      }], 'Criteria groups should be updated with waiting parameters')

      // catch timer event to assert final state
      const wrapperCallback = enzymeWrapper.instance().stabilityDelayer.callback
      enzymeWrapper.instance().stabilityDelayer.callback = () => {
        wrapperCallback() // commits the new state
        componentWrapper = enzymeWrapper.find(SearchPaneComponent)
        assert.deepEqual(componentWrapper.props().groups, [{
          ...props.resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].search.groups[0],
          criteria: [{
            ...props.resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].search.groups[0].criteria[0],
            state: { crit1: 'state', booleanHere: false },
            requestParameters: { p1: false, q: 'any' },
            delayedRequestParameters: undefined,
          }, { // updated criterion: new parameters should not be committed now to temporize refreshes / fetches
            ...props.resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].search.groups[0].criteria[1],
            state: { myState: 'anything I want' },
            requestParameters: { myNewParam: 'is shining!' }, // delayed is now reported
            delayedRequestParameters: undefined, // reported should be empty now
          }],
        }, {
          ...props.resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].search.groups[1],
          criteria: [{
            ...props.resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].search.groups[1].criteria[0],
            state: { crit3: 'stillOK', sliderRange: [36, 55, 58, 103] },
            requestParameters: { x: [36, 55] },
            delayedRequestParameters: undefined,
          }],
        }], 'Criteria groups should be updated with waiting parameters')
        done()
      }
    })
  it('should perform search correctly, taking delayed parameters in account', () => {
    let spiedResultsContextDiff = null
    const props = {
      moduleId: 25,
      resultsContext: dataContext,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      updateResultsContext: (moduleId, resultsContextDiff) => {
        assert.equal(moduleId, props.moduleId, 'Module ID should be the right one')
        spiedResultsContextDiff = resultsContextDiff
      },
    }
    const enzymeWrapper = shallow(<SearchPaneContainer {...props} />, { context })
    // simulate edition on criterion 0:0 and 1:0 performed a while ago (timer already ended)
    const currentState = enzymeWrapper.state()
    enzymeWrapper.setState({
      ...currentState,
      groups: [{
        ...currentState.groups[0],
        criteria: [{
          ...currentState.groups[0].criteria[0],
          state: { IAM: 'crit0:0' },
          requestParameters: { iWant: 'aCrit0' },
        },
        currentState.groups[0].criteria[1],
        ],
      }, {
        ...currentState.groups[1],
        criteria: [{
          ...currentState.groups[1].criteria[0],
          state: { thisState: { what: 'first' } },
          requestParameters: { aParam: false }, // that one should be ignored as there is a delayed commit
        }],
      }],
    })
    enzymeWrapper.instance().onSearch()
    // spy search commit: expected current state to be reported to request
    assert.deepEqual(spiedResultsContextDiff, {
      tabs: {
        [props.tabType]: {
          search: {
            open: false, // close pane
          },
          criteria: {
            searchCriteria: [{
              pluginInstanceId: currentState.groups[0].criteria[0].pluginInstanceId,
              state: { IAM: 'crit0:0' },
              requestParameters: { iWant: 'aCrit0' },
            }, {
              pluginInstanceId: currentState.groups[1].criteria[0].pluginInstanceId,
              state: { thisState: { what: 'first' } },
              requestParameters: { aParam: false },
            }],
          },
        },
      },
    }, '1 - current state should be take in account for search computing')

    // 2- simulate a user state change ==> delayed parameters should override the previous ones for criterion 1:0
    enzymeWrapper.instance().onUpdatePluginState(1, 0, { thisState: { what: 'IDK!' } }, { aParam: true, aValue: 1 })
    // spy search commit: expect search pane to be automatically closed, and parameters from crit 0:0 and 1:0 (delayed ones)
    enzymeWrapper.instance().onSearch()
    assert.deepEqual(spiedResultsContextDiff, {
      tabs: {
        [props.tabType]: {
          search: {
            open: false, // close pane
          },
          criteria: {
            searchCriteria: [{
              pluginInstanceId: currentState.groups[0].criteria[0].pluginInstanceId,
              state: { IAM: 'crit0:0' },
              requestParameters: { iWant: 'aCrit0' },
            }, {
              pluginInstanceId: currentState.groups[1].criteria[0].pluginInstanceId,
              state: { thisState: { what: 'IDK!' } },
              requestParameters: { aParam: true, aValue: 1 },
            }],
          },
        },
      },
    }, '2 - Future parameters for state should be taken in account for search computing')
  })
  it('should close pane correctly', () => {
    let spiedResultsContextDiff = null
    const props = {
      moduleId: 25,
      resultsContext: dataContext,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      updateResultsContext: (moduleId, resultsContextDiff) => {
        assert.equal(moduleId, props.moduleId, 'Module ID should be the right one')
        spiedResultsContextDiff = resultsContextDiff
      },
    }
    const enzymeWrapper = shallow(<SearchPaneContainer {...props} />, { context })
    enzymeWrapper.instance().onClose()
    assert.deepEqual(spiedResultsContextDiff, {
      tabs: {
        [props.tabType]: {
          search: {
            open: false, // close pane
          },
        },
      },
    }, 'Tab should be closed')
  })
  it('should compute correctly search enabled disabled state', () => {
    const props = {
      moduleId: 25,
      resultsContext: dataContext,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      updateResultsContext: () => {},
    }

    const enzymeWrapper = shallow(<SearchPaneContainer {...props} />, { context })
    let componentWrapper = enzymeWrapper.find(SearchPaneComponent)
    assert.isTrue(componentWrapper.props().searchDisabled, '(0) Search should be disabled while there is no parameter')
    // (1) simulate edition - no error (byPass timer issues)
    let previousState = enzymeWrapper.state()
    enzymeWrapper.instance().onStateChange({
      ...previousState,
      groups: [{
        ...previousState.groups[0],
        criteria: [
          previousState.groups[0].criteria[0], {
            ...previousState.groups[0].criteria[1],
            state: { s1: 'xxx', a: 25 },
            requestParameters: { p: 'xxx25' },
          }],
      },
      previousState.groups[1],
      ],
    })
    componentWrapper = enzymeWrapper.find(SearchPaneComponent)
    assert.isFalse(componentWrapper.props().searchDisabled, '(1) Search should be enabled as there are parameters')
    // (2) simulate edition - error (byPass timer issues)
    previousState = enzymeWrapper.state()
    enzymeWrapper.instance().onStateChange({
      ...previousState,
      groups: [{
        ...previousState.groups[0],
        criteria: [{
          ...previousState.groups[0].criteria[1],
          state: { error: true, s2: 'yyy', a: 18 },
          requestParameters: { p: 'yyy18' },
        },
        previousState.groups[0].criteria[1]],
      },
      previousState.groups[1],
      ],
    })
    componentWrapper = enzymeWrapper.find(SearchPaneComponent)
    assert.isTrue(componentWrapper.props().searchDisabled, '(2) Search should be disabled as there is a state error')

    // (3) simulate edition - no error (byPass timer issues)
    previousState = enzymeWrapper.state()
    enzymeWrapper.instance().onStateChange({
      ...previousState,
      groups: [{
        ...previousState.groups[0],
        criteria: [{
          ...previousState.groups[0].criteria[1],
          state: { error: false, s2: 'uuu', a: 70 },
          requestParameters: { p: 'uuu70' },
        },
        previousState.groups[0].criteria[1]],
      },
      previousState.groups[1],
      ],
    })
    componentWrapper = enzymeWrapper.find(SearchPaneComponent)
    assert.isFalse(componentWrapper.props().searchDisabled, '(3) Search should be enabled as there is no longer error')
  })
  it('onResetPluginsStates should reset to empty state and clear delayed parameters applying on clear option', () => {
    const props = {
      moduleId: 25,
      resultsContext: dataContext,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<SearchPaneContainer {...props} />, { context })
    const initState = enzymeWrapper.state()
    // 1 - Simulate an old edition then 2 editions waiting validation
    enzymeWrapper.instance().onStateChange({
      groups: [{
        ...initState.groups[0],
        criteria: [
          initState.groups[0].criteria[0], {
            ...initState.groups[0].criteria[1],
            state: { someStateHere: 88 },
            requestParameters: { oli: 'lolo' },
            delayedRequestParameters: undefined,
          }],
      },
      initState.groups[1],
      ],
    })
    enzymeWrapper.instance().onUpdatePluginState(0, 0, { any: true }, { someParameter: 'someParameter' })
    enzymeWrapper.instance().onUpdatePluginState(1, 0, { x: 'y' }, { x: 'y' })
    assert.deepEqual(enzymeWrapper.state(), {
      ...initState,
      groups: [{
        ...initState.groups[0],
        criteria: [{
          ...initState.groups[0].criteria[0],
          state: { any: true },
          requestParameters: undefined,
          delayedRequestParameters: { someParameter: 'someParameter' },
        }, {
          ...initState.groups[0].criteria[1],
          state: { someStateHere: 88 },
          requestParameters: { oli: 'lolo' },
          delayedRequestParameters: undefined,
        }],
      }, {
        ...initState.groups[1],
        criteria: [{
          ...initState.groups[1].criteria[0],
          state: { x: 'y' },
          delayedRequestParameters: { x: 'y' },
        }],
      }],
      searchDisabled: false, // all criteria states valid
    }, 'Checking state is updated and waiting time')
    assert.isNotNull(enzymeWrapper.instance().stabilityDelayer.callback, 'A callback should have been set for later commit')
    assert.isNotNull(enzymeWrapper.instance().stabilityDelayer.currentTimer, 'Timer should be started')
    // 2 - Simulare cancel and check state is back to unedited state
    enzymeWrapper.instance().onResetPluginsStates()
    assert.deepEqual(enzymeWrapper.state(), initState, 'onResetPluginsStates should have reset to default configuration state (no criterion state no request parameter)')
    assert.isNull(enzymeWrapper.instance().stabilityDelayer.callback, 'onResetPluginsStates should have cleared previous operations commit')
    assert.isNull(enzymeWrapper.instance().stabilityDelayer.currentTimer, 'onResetPluginsStates should have stopped any timer running')
  })
  it('should provide open / closed state from current results context, according with displayed tab', () => {
    const props = {
      moduleId: 25,
      resultsContext: UIDomain.ResultsContextHelper.deepMerge(dataContext, {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            search: {
              open: true,
            },
          },
        },
      }),
      tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      updateResultsContext: () => {},
    }
    // 0 - Currently open
    const enzymeWrapper = shallow(<SearchPaneContainer {...props} />, { context })
    let componentWrapper = enzymeWrapper.find(SearchPaneComponent)
    assert.isTrue(componentWrapper.props().open)
    // 1 - Closed in current tab
    enzymeWrapper.setProps({
      ...props,
      resultsContext: UIDomain.ResultsContextHelper.deepMerge(dataContext, {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            search: {
              open: false,
            },
          },
        },
      }),
    })
    componentWrapper = enzymeWrapper.find(SearchPaneComponent)
    assert.isFalse(componentWrapper.props().open)
    // 1 - Opened in background tab
    enzymeWrapper.setProps({
      ...props,
      resultsContext: UIDomain.ResultsContextHelper.deepMerge(dataContext, {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            search: {
              open: true,
            },
          },
        },
      }),
    })
    componentWrapper = enzymeWrapper.find(SearchPaneComponent)
    assert.isFalse(componentWrapper.props().open)
  })
})
