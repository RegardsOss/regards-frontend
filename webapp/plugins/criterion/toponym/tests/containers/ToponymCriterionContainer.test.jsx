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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import { ToponymCriterionContainer } from '../../src/containers/ToponymCriterionContainer'
import styles from '../../src/styles/styles'
import { AccessProjectClient } from '@regardsoss/client'
import ToponymCriterionComponent from '../../src/components/ToponymCriterionComponent'

const context = buildTestContext(styles)

/**
 * Test case for {@link ToponymCriterionContainer}
 *
 * @author Theo Lasserre
 */
describe('[toponym] Testing ToponymCriterionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(ToponymCriterionContainer)
  })
  it('should render correctly without initial value', () => {
    const props = {
      pluginInstanceId: 'any',
      searchContext: criterionTestSuiteHelpers.getSearchContextStub(),
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchToponymClient: {
        actions: new AccessProjectClient.SearchToponymActions('stub.namespace'),
        selectors: AccessProjectClient.getSearchToponymSelectors(),
      },
      state: ToponymCriterionContainer.DEFAULT_STATE,
      isFetching: false,
      toponyms: {
        id: {
          content: {
            labelFr: 'fr',
            labelEn: 'en',
            businessId: 'id',
            description: 'test',
          }
        }
      },
      currentLocale: UIDomain.LOCALES_ENUM.fr,
      publishState: () => { },
      dispatchGetToponyms: () => { },
    }
    const enzymeWrapper = shallow(<ToponymCriterionContainer {...props} />, { context })
    // verify sub component is correctly instantiated
    const componentWrapper = enzymeWrapper.find(ToponymCriterionComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      label: props.label,
      error: false,
      toponymFilterText: '',
      matchingToponyms: props.toponyms,
      isFetching: props.isFetching,
      onUpdateToponymsFilter: enzymeWrapper.instance().onUpdateTextFilter, // callbacks
      onToponymFilterSelected: enzymeWrapper.instance().onFilterSelected, // callbacks
      currentLocale: UIDomain.LOCALES_ENUM.fr
    }, 'Component properties should be correctly reported')
  })
  it('should render correctly with initial value', () => {
    const props = {
      pluginInstanceId: 'any',
      searchContext: criterionTestSuiteHelpers.getSearchContextStub(),
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchToponymClient: {
        actions: new AccessProjectClient.SearchToponymActions('stub.namespace'),
        selectors: AccessProjectClient.getSearchToponymSelectors(),
      },
      state: {
        error: true,
        toponymFilterText: 'testValue',
        selectedToponymBusinessId: '',
        currentLocale: UIDomain.LOCALES_ENUM.fr,
        criteria: '',
      },
      isFetching: false,
      toponyms: {
        id: {
          content: {
            labelFr: 'fr',
            labelEn: 'en',
            businessId: 'id',
            description: 'test',
          }
        }
      },
      currentLocale: UIDomain.LOCALES_ENUM.fr,
      publishState: () => { },
      dispatchGetToponyms: () => { },
    }
    const enzymeWrapper = shallow(<ToponymCriterionContainer {...props} />, { context })
    // verify sub component is correctly instantiated
    const componentWrapper = enzymeWrapper.find(ToponymCriterionComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      label: props.label,
      error: true,
      toponymFilterText: 'testValue',
      matchingToponyms: props.toponyms,
      isFetching: props.isFetching,
      onUpdateToponymsFilter: enzymeWrapper.instance().onUpdateTextFilter, // callbacks
      onToponymFilterSelected: enzymeWrapper.instance().onFilterSelected, // callbacks
      currentLocale: props.state.currentLocale
    }, 'Component properties should be correctly reported')
  })
  it('should update list when mounting and state when user changed the text', () => {
    const spiedDispatchData = {
      toponymFilterText: '',
      currentLocale: UIDomain.LOCALES_ENUM.fr,
      count: 0,
    }
    const spiedPublishData = {
      nextState: null,
      requestParameters: null,
      count: 0,
    }
    const props = {
      pluginInstanceId: 'any',
      searchContext: criterionTestSuiteHelpers.getSearchContextStub(),
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchToponymClient: {
        actions: new AccessProjectClient.SearchToponymActions('stub.namespace'),
        selectors: AccessProjectClient.getSearchToponymSelectors(),
      },
      state: {
        error: true,
        toponymFilterText: 'testValue',
        selectedToponymBusinessId: '',
        currentLocale: UIDomain.LOCALES_ENUM.fr,
        criteria: '',
      },
      isFetching: false,
      toponyms: {
        id: {
          content: {
            labelFr: 'fr',
            labelEn: 'en',
            businessId: 'id',
          }
        }
      },
      currentLocale: UIDomain.LOCALES_ENUM.fr,
      publishState: (nextState, requestParameters) => {
        spiedPublishData.nextState = nextState
        spiedPublishData.requestParameters = requestParameters
        spiedPublishData.count += 1
      },
      dispatchGetToponyms: (toponymFilterText, currentLocale) => {
        spiedDispatchData.toponymFilterText = toponymFilterText
        spiedDispatchData.currentLocale = currentLocale
        spiedDispatchData.count += 1
      },
    }
    const enzymeWrapper = shallow(<ToponymCriterionContainer {...props} />, { context })
    // 0 - Check dispatch was initially called (due to timer, it is not possible to test it later here)
    assert.equal(spiedDispatchData.count, 1, '0 - Dispatch should have been performed')
    assert.equal(spiedDispatchData.toponymFilterText, props.state.toponymFilterText, '0 - Dispatched filter text should be valid')
    assert.equal(spiedDispatchData.currentLocale, props.state.currentLocale, '0 - Dispatched current locale should be valid')

    // 1 - Test with unexisting option
    enzymeWrapper.instance().onUpdateTextFilter('test text')
    assert.equal(spiedPublishData.count, 1, '1 - Data publishing should have been performed')
    assert.deepEqual(spiedPublishData.nextState, {
      toponymFilterText: 'test text',
      error: true,
      selectedToponymBusinessId: '',
      currentLocale: UIDomain.LOCALES_ENUM.fr,
      criteria: 'toponymCriteria',
    }, '1 - Dispatched plugin state should be correctly computed (with an error as text is not an available option)')

    // 2 - Test with existing option
    enzymeWrapper.instance().onUpdateTextFilter('fr', true)
    assert.equal(spiedPublishData.count, 2, '2 - Data publishing should have been performed')
    assert.deepEqual(spiedPublishData.nextState, {
      toponymFilterText: 'fr',
      error: false,
      selectedToponymBusinessId: '',
      currentLocale: UIDomain.LOCALES_ENUM.fr,
      criteria: 'toponymCriteria',
    }, '2 - Dispatched plugin state should be correctly computed (without error as text is an available option)')
  })
  it('should update correctly state on user item selection', () => {
    const spiedDispatchData = {
      toponymFilterText: '',
      currentLocale: UIDomain.LOCALES_ENUM.fr,
      count: 0,
    }
    const spiedPublishData = {
      nextState: null,
      requestParameters: null,
      count: 0,
    }
    const props = {
      pluginInstanceId: 'any',
      searchContext: criterionTestSuiteHelpers.getSearchContextStub(),
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchToponymClient: {
        actions: new AccessProjectClient.SearchToponymActions('stub.namespace'),
        selectors: AccessProjectClient.getSearchToponymSelectors(),
      },
      state: {
        currentLocale: UIDomain.LOCALES_ENUM.fr,
        toponymFilterText: '',
        error: false,
        selectedToponymBusinessId: '',
      },
      isFetching: false,
      toponyms: {
        id: {
          content: {
            labelFr: 'fr',
            labelEn: 'en',
            businessId: 'id',
          }
        }
      },
      currentLocale: UIDomain.LOCALES_ENUM.fr,
      publishState: (nextState, requestParameters) => {
        spiedPublishData.nextState = nextState
        spiedPublishData.requestParameters = requestParameters
        spiedPublishData.count += 1
      },
      dispatchGetToponyms: (toponymFilterText, currentLocale) => {
        spiedDispatchData.toponymFilterText = toponymFilterText
        spiedDispatchData.currentLocale = currentLocale
        spiedDispatchData.count += 1
      },
    }
    const enzymeWrapper = shallow(<ToponymCriterionContainer {...props} />, { context })
    // 0 - Check dispatch was initially called (due to timer, it is not possible to test it later here)
    assert.equal(spiedDispatchData.count, 1, '0 - Dispatch should have been performed')
    assert.equal(spiedDispatchData.toponymFilterText, props.state.toponymFilterText, '0 - Dispatched filter text should be valid')
    assert.equal(spiedDispatchData.currentLocale, props.state.currentLocale, '0 - Dispatched current locale should be valid')

    // 1 - Test with unexisting option
    enzymeWrapper.instance().onUpdateTextFilter('test text')
    assert.equal(spiedPublishData.count, 1, '1 - Data publishing should have been performed')
    assert.deepEqual(spiedPublishData.nextState, {
      toponymFilterText: 'test text',
      error: true,
      selectedToponymBusinessId: '',
      currentLocale: UIDomain.LOCALES_ENUM.fr,
      criteria: 'toponymCriteria',
    }, '1 - Dispatched plugin state should be correctly computed (with an error as text is not an available option)')

    // 2 - Test with existing option
    enzymeWrapper.instance().onUpdateTextFilter('fr', true)
    assert.equal(spiedPublishData.count, 2, '2 - Data publishing should have been performed')
    assert.deepEqual(spiedPublishData.nextState, {
      toponymFilterText: 'fr',
      error: false,
      selectedToponymBusinessId: '',
      currentLocale: UIDomain.LOCALES_ENUM.fr,
      criteria: 'toponymCriteria',
    }, '2 - Dispatched plugin state should be correctly computed (without error as text is an available option)')
  })
})
