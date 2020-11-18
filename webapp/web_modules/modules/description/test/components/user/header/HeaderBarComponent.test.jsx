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
import HeaderBarComponent from '../../../../src/components/user/header/HeaderBarComponent'
import ToggleTreeVisibleOptionContainer from '../../../../src/containers/user/header/ToggleTreeVisibleOptionContainer'
import BreadcrumbComponent from '../../../../src/components/user/header/BreadcrumbComponent'
import SearchEntityOptionComponent from '../../../../src/components/user/header/SearchEntityOptionComponent'
import styles from '../../../../src/styles'
import { resolvedDataEntity, resolvedDatasetEntity } from '../../../dumps/resolved.dump'

const context = buildTestContext(styles)

/**
 * Test HeaderBarComponent
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[Description] Testing HeaderBarComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(HeaderBarComponent)
  })
  it('should render correctly with search option', () => {
    const props = {
      settings: {
        showVersion: false,
        documentModels: [],
        primaryQuicklookGroup: 'primary',
      },
      descriptionEntity: resolvedDataEntity,
      selectedEntityIndex: 0,
      descriptionPath: [resolvedDataEntity, resolvedDatasetEntity],
      allowSearching: true,
      onSelectEntityIndex: () => {},
      onSearchEntity: () => {},
      toggleTreeButton: () => {},
    }
    const enzymeWrapper = shallow(<HeaderBarComponent {...props} />, { context })
    const toggleTreeContainer = enzymeWrapper.find(ToggleTreeVisibleOptionContainer)
    assert.lengthOf(toggleTreeContainer, 1, 'There should be toggle tree visible option')
    testSuiteHelpers.assertWrapperProperties(toggleTreeContainer, {
      toggleTreeButton: props.toggleTreeButton,
    }, 'ToggleTreeVisibleOption container properties should be correctly reported')
    const breadcrumbWrapper = enzymeWrapper.find(BreadcrumbComponent)
    assert.lengthOf(breadcrumbWrapper, 1, 'There should be the breadcrumb component')
    testSuiteHelpers.assertWrapperProperties(breadcrumbWrapper, {
      settings: props.settings,
      selectedEntityIndex: props.selectedEntityIndex,
      descriptionPath: props.descriptionPath,
      onSelectEntityIndex: props.onSelectEntityIndex,
    }, 'Breadcrumb component properties should be correctly reported')
    const searchOptionWrapper = enzymeWrapper.find(SearchEntityOptionComponent)
    assert.lengthOf(searchOptionWrapper, 1, 'There should be search option')
    testSuiteHelpers.assertWrapperProperties(searchOptionWrapper, {
      descriptionEntity: props.descriptionEntity,
      onSearchEntity: props.onSearchEntity,
    }, 'Search option properties should be correctly set')
  })
  it('should render correctly without search option', () => {
    const props = {
      settings: {
        showVersion: true,
        documentModels: ['plop'],
        primaryQuicklookGroup: 'primary',
      },
      descriptionEntity: resolvedDatasetEntity,
      selectedEntityIndex: 0,
      descriptionPath: [resolvedDatasetEntity],
      allowSearching: false,
      onSelectEntityIndex: () => {},
      onSearchEntity: () => {},
      toggleTreeButton: () => {},
    }
    const enzymeWrapper = shallow(<HeaderBarComponent {...props} />, { context })
    const toggleTreeContainer = enzymeWrapper.find(ToggleTreeVisibleOptionContainer)
    assert.lengthOf(toggleTreeContainer, 1, 'There should be toggle tree visible option')
    testSuiteHelpers.assertWrapperProperties(toggleTreeContainer, {
      toggleTreeButton: props.toggleTreeButton,
    }, 'ToggleTreeVisibleOption container properties should be correctly reported')
    const breadcrumbWrapper = enzymeWrapper.find(BreadcrumbComponent)
    assert.lengthOf(breadcrumbWrapper, 1, 'There should be the breadcrumb component')
    testSuiteHelpers.assertWrapperProperties(breadcrumbWrapper, {
      settings: props.settings,
      selectedEntityIndex: props.selectedEntityIndex,
      descriptionPath: props.descriptionPath,
      onSelectEntityIndex: props.onSelectEntityIndex,
    }, 'Breadcrumb component properties should be correctly reported')
    const searchOptionWrapper = enzymeWrapper.find(SearchEntityOptionComponent)
    assert.lengthOf(searchOptionWrapper, 0, 'There should not be search option')
  })
})
