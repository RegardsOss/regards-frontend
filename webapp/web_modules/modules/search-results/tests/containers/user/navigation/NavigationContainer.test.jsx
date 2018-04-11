/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CatalogDomain, UIDomain } from '@regardsoss/domain'
import { modulesManager } from '@regardsoss/modules'
import { Tag } from '../../../../src/models/navigation/Tag'
import NavigationComponent from '../../../../src/components/user/navigation/NavigationComponent'
import { NavigationContainer } from '../../../../src/containers/user/navigation/NavigationContainer'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing NavigationContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigationContainer)
  })
  it('should render correctly empty with only initial levels (externally driven module case)', () => {
    const props = {
      locale: 'en',
      displayDatasets: true,
      type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
      initialLevels: [new Tag(CatalogDomain.TagTypes.WORD, 'x', 'x')],
      levels: [new Tag(CatalogDomain.TagTypes.WORD, 'x', 'x')], // initial levels are repeated in levels
      gotoLevel: () => { },
    }
    const enzymeWrapper = shallow(<NavigationContainer {...props} />, { context })
    const component = enzymeWrapper.find(NavigationComponent)
    assert.lengthOf(component, 1, 'The corresponding component should be rendered')
    testSuiteHelpers.assertWrapperProperties(component, {
      description: undefined,
      page: undefined,
      defaultIconURL: UIDomain.getModuleDefaultIconURL(modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS),
      navigationLevels: props.levels, // this line checks the root place holder has not been added
      onLevelSelected: enzymeWrapper.instance().onLevelSelected,
    })
  })
  it('should render correctly empty without initial level (standalone module case)', () => {
    const props = {
      locale: 'fr',
      displayDatasets: true,
      description: 'my desc###@',
      page: { fr: 'patate', en: 'potatoe' },
      type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
      initialLevels: [],
      levels: [],
      gotoLevel: () => { },
    }
    const enzymeWrapper = shallow(<NavigationContainer {...props} />, { context })
    const component = enzymeWrapper.find(NavigationComponent)
    assert.lengthOf(component, 1, 'The corresponding component should be rendered')
    testSuiteHelpers.assertWrapperProperties(component, {
      locale: props.locale,
      description: props.description,
      page: props.page,
      defaultIconURL: UIDomain.getModuleDefaultIconURL(modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS),
      navigationLevels: [NavigationComponent.ROOT_PLACEHOLDER],
      onLevelSelected: enzymeWrapper.instance().onLevelSelected,
    })
  })

  it('should render correctly with initial levels and levels (externally driven and user updated)', () => {
    const props = {
      locale: 'en',
      displayDatasets: true,
      type: 'any',
      initialLevels: [new Tag(CatalogDomain.TagTypes.WORD, 'x', 'x')],
      levels: [new Tag(CatalogDomain.TagTypes.WORD, 'x', 'x'), new Tag(CatalogDomain.TagTypes.WORD, 'y', 'y')],
      gotoLevel: () => { },
    }
    const enzymeWrapper = shallow(<NavigationContainer {...props} />, { context })
    const component = enzymeWrapper.find(NavigationComponent)
    assert.lengthOf(component, 1, 'The corresponding component should be rendered')
    testSuiteHelpers.assertWrapperProperties(component, {
      locale: props.locale,
      description: props.description,
      page: props.page,
      navigationLevels: props.levels, //asserting there is not the root placeholder
      onLevelSelected: enzymeWrapper.instance().onLevelSelected,
    })
  })

  it('should render correctly without initial levels but with levels (standalone and user updated)', () => {
    const props = {
      locale: 'fr',
      displayDatasets: true,
      type: 'any',
      initialLevels: [],
      levels: [new Tag(CatalogDomain.TagTypes.WORD, 'x', 'x'), new Tag(CatalogDomain.TagTypes.WORD, 'y', 'y')],
      gotoLevel: () => { },
    }
    const enzymeWrapper = shallow(<NavigationContainer {...props} />, { context })
    const component = enzymeWrapper.find(NavigationComponent)
    assert.lengthOf(component, 1, 'The corresponding component should be rendered')
    testSuiteHelpers.assertWrapperProperties(component, {
      locale: props.locale,
      description: props.description,
      page: props.page,
      // there should be root placeholder
      navigationLevels: [NavigationComponent.ROOT_PLACEHOLDER, ...props.levels],
      onLevelSelected: enzymeWrapper.instance().onLevelSelected,
    })
  })
})
