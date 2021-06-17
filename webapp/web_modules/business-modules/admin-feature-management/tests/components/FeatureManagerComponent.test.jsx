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
import { Card } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ReferencesManagerContainer from '../../src/containers/ReferencesManagerContainer'
import FeatureManagerFiltersComponent from '../../src/components/filters/FeatureManagerFiltersComponent'
import SwitchTables from '../../src/containers/SwitchTables'
import FeatureManagerComponent from '../../src/components/FeatureManagerComponent'
import styles from '../../src/styles'

// mock router
const router = require('react-router')

const context = buildTestContext(styles)

/**
 * Test FeatureManagerComponent
 * @author Théo Lasserre
 */
describe('[ADMIN FEATURE MANAGEMENT] Testing FeatureManagerComponent', () => {
  let currentLocation = {}
  before(() => {
    testSuiteHelpers.before()
    router.browserHistory.setMockedResult(currentLocation)
    router.browserHistory.setReplaceSpy((location) => {
      currentLocation = location
    })
  })
  after(() => {
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(FeatureManagerComponent)
  })
  it('should render correctly', () => {
    const props = {
      params: {
        project: 'any',
      },
      clearReferencesSelection: () => { },
      clearCreationSelection: () => { },
      clearDeleteSelection: () => { },
      clearExtractionSelection: () => { },
      clearNotificationSelection: () => { },
      clearUpdateSelection: () => { },
    }
    const enzymeWrapper = shallow(<FeatureManagerComponent {...props} />, { context })
    const cardWrapper = enzymeWrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be a Card')

    const filterWrapper = enzymeWrapper.find(FeatureManagerFiltersComponent)
    assert.lengthOf(filterWrapper, 1, 'There should be a FeatureManagerFiltersComponent')
    testSuiteHelpers.assertWrapperProperties(filterWrapper, {
      onApplyFilters: enzymeWrapper.instance().onApplyFilters,
      featureManagerFilters: enzymeWrapper.instance().state.featureManagerFilters,
    }, 'Component should define the expected properties')

    const switchWrapper = enzymeWrapper.find(SwitchTables)
    assert.lengthOf(switchWrapper, 1, 'There should be a SwitchTables')
    testSuiteHelpers.assertWrapperProperties(switchWrapper, {
      params: props.params,
      onSwitchToPane: enzymeWrapper.instance().onSwitchToPane,
      openedPane: enzymeWrapper.instance().state.openedPane,
    }, 'Component should define the expected properties')

    const referenceWrapper = enzymeWrapper.find(ReferencesManagerContainer)
    assert.lengthOf(referenceWrapper, 1, 'There should be a ReferencesManagerContainer')
    testSuiteHelpers.assertWrapperProperties(referenceWrapper, {
      params: props.params,
      featureManagerFilters: enzymeWrapper.instance().state.featureManagerFilters,
      paneType: enzymeWrapper.instance().state.openedPane,
    }, 'Component should define the expected properties')

    const cardActionsComponent = enzymeWrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionsComponent, 1, 'There should be a CardActionsComponent')
  })
})
