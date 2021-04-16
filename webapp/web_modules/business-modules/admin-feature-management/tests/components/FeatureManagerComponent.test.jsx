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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ReferencesManagerContainer from '../../src/containers/ReferencesManagerContainer'
import RequestManagerContainer from '../../src/containers/RequestManagerContainer'
import FeatureManagerFiltersComponent from '../../src/components/filters/FeatureManagerFiltersComponent'
import SwitchTables from '../../src/components/SwitchTables'
import FeatureManagerComponent from '../../src/components/FeatureManagerComponent'
import { PANE_TYPES_ENUM } from '../../src/domain/PaneTypes'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test FeatureManagerComponent
 * @author Théo Lasserre
 */
describe('[ADMIN FEATURE MANAGEMENT] Testing FeatureManagerComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FeatureManagerComponent)
  })
  it('should render correctly', () => {
    const props = {
      params: {
        project: 'any',
      },
      clearReferencesSelection: () => {},
      clearRequestSelection: () => {},
    }
    const enzymeWrapper = shallow(<FeatureManagerComponent {...props} />, { context })
    const cardWrapper = enzymeWrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be a Card')

    const filterWrapper = enzymeWrapper.find(FeatureManagerFiltersComponent)
    assert.lengthOf(filterWrapper, 1, 'There should be a FeatureManagerFiltersComponent')
    testSuiteHelpers.assertWrapperProperties(filterWrapper, {
      onApplyFilters: enzymeWrapper.instance().applyFilters,
    }, 'Component should define the expected properties')

    const switchWrapper = enzymeWrapper.find(SwitchTables)
    assert.lengthOf(switchWrapper, 1, 'There should be a SwitchTables')
    testSuiteHelpers.assertWrapperProperties(switchWrapper, {
      params: props.params,
      onSwitchToPane: enzymeWrapper.instance().onSwitchToPane,
      openedPane: PANE_TYPES_ENUM.REFERENCES,
    }, 'Component should define the expected properties')

    const referenceWrapper = enzymeWrapper.find(ReferencesManagerContainer)
    assert.lengthOf(referenceWrapper, 1, 'There should be a ReferencesManagerContainer')
    testSuiteHelpers.assertWrapperProperties(referenceWrapper, {
      params: props.params,
      filters: FeatureManagerFiltersComponent.DEFAULT_FILTERS_STATE,
      paneType: PANE_TYPES_ENUM.REFERENCES,
    }, 'Component should define the expected properties')

    const requestWrapper = enzymeWrapper.find(RequestManagerContainer)
    assert.lengthOf(requestWrapper, 1, 'There should be a RequestManagerContainer')
    testSuiteHelpers.assertWrapperProperties(requestWrapper, {
      params: props.params,
      filters: FeatureManagerFiltersComponent.DEFAULT_FILTERS_STATE,
      paneType: PANE_TYPES_ENUM.REFERENCES,
      onApplyFilters: enzymeWrapper.instance().applyFilters,
    }, 'Component should define the expected properties')
  })
})
