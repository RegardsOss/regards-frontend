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
import NoMatchingDataIcon from 'mdi-material-ui/FilterRemoveOutline'
import NoExistingDataIcon from 'mdi-material-ui/CogOutline'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { UIDomain } from '@regardsoss/domain'
import { NoContentComponent } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import NoRestrictionElementComponent from '../../../../../src/components/admin/content/restrictions/NoRestrictionElementComponent'
import styles from '../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test NoRestrictionElementComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing NoRestrictionElementComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NoRestrictionElementComponent)
  })
  it('should render correctly when filter no data, for selected datasets restriction', () => {
    const props = {
      currentRestrictionType: UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_DATASETS,
      allElements: [{
        id: 'ds1',
        label: 'Tests dataset 1',
      }],
    }
    const enzymeWrapper = shallow(<NoRestrictionElementComponent {...props} />, { context })
    const noContentComponent = enzymeWrapper.find(NoContentComponent)
    assert.lengthOf(noContentComponent, 1, 'There should be no content displayer')
    testSuiteHelpers.assertWrapperProperties(noContentComponent, {
      titleKey: 'search.results.form.restrictions.configuration.no.data.title',
      messageKey: 'search.results.form.restrictions.configuration.no.dataset.matching.message',
      Icon: NoMatchingDataIcon,
    }, 'Component properties should be correctly set for current no data case')
  })
  it('should render correctly when no dataset have been found, for selected datasets restriction', () => {
    const props = {
      currentRestrictionType: UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_DATASETS,
      allElements: [],
    }
    const enzymeWrapper = shallow(<NoRestrictionElementComponent {...props} />, { context })
    const noContentComponent = enzymeWrapper.find(NoContentComponent)
    assert.lengthOf(noContentComponent, 1, 'There should be no content displayer')
    testSuiteHelpers.assertWrapperProperties(noContentComponent, {
      titleKey: 'search.results.form.restrictions.configuration.no.data.title',
      messageKey: 'search.results.form.restrictions.configuration.no.dataset.existing.message',
      Icon: NoExistingDataIcon,
    }, 'Component properties should be correctly set for current no data case')
  })
  it('should render correctly when filter no data, for selected dataset models restriction', () => {
    const props = {
      currentRestrictionType: UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_MODELS,
      allElements: [{
        id: 'dsm1',
        label: 'Test dataset model 1',
      }],
    }
    const enzymeWrapper = shallow(<NoRestrictionElementComponent {...props} />, { context })
    const noContentComponent = enzymeWrapper.find(NoContentComponent)
    assert.lengthOf(noContentComponent, 1, 'There should be no content displayer')
    testSuiteHelpers.assertWrapperProperties(noContentComponent, {
      titleKey: 'search.results.form.restrictions.configuration.no.data.title',
      messageKey: 'search.results.form.restrictions.configuration.no.dataset.model.matching.message',
      Icon: NoMatchingDataIcon,
    }, 'Component properties should be correctly set for current no data case')
  })
  it('should render correctly when no dataset model have been found, for selected dataset models restriction', () => {
    const props = {
      currentRestrictionType: UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_MODELS,
      allElements: [],
    }
    const enzymeWrapper = shallow(<NoRestrictionElementComponent {...props} />, { context })
    const noContentComponent = enzymeWrapper.find(NoContentComponent)
    assert.lengthOf(noContentComponent, 1, 'There should be no content displayer')
    testSuiteHelpers.assertWrapperProperties(noContentComponent, {
      titleKey: 'search.results.form.restrictions.configuration.no.data.title',
      messageKey: 'search.results.form.restrictions.configuration.no.dataset.model.existing.message',
      Icon: NoExistingDataIcon,
    }, 'Component properties should be correctly set for current no data case')
  })
})
