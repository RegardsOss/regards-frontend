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
import MainModuleComponent from '../../../src/components/user/MainModuleComponent'
import styles from '../../../src/styles'
import { resolvedDataEntity, resolvedDatasetEntity } from '../../dumps/resolved.dump'
import ContentDisplayComponent from '../../../src/components/user/content/ContentDisplayComponent'
import BrowsingTreeComponent from '../../../src/components/user/tree/BrowsingTreeComponent'
import HeaderBarComponent from '../../../src/components/user/header/HeaderBarComponent'

const context = buildTestContext(styles)

/**
 * Test MainModuleComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing MainModuleComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MainModuleComponent)
  })
  it('should render correctly', () => {
    const props = {
      settings: {
        showVersion: false,
        documentModels: ['any'],
        primaryQuicklookGroup: 'primary',
      },
      descriptionEntity: resolvedDataEntity,
      selectedEntityIndex: 1,
      descriptionPath: [resolvedDatasetEntity, resolvedDataEntity],
      allowSearching: false,
      browsingTreeVisible: false,
      isDescriptionAllowed: () => true,
      onSelectInnerLink: () => {},
      onSelectEntityLink: () => {},
      onSearchWord: () => {},
      onSearchEntity: () => {},
      onSelectEntityIndex: () => {},
    }
    const enzymeWrapper = shallow(<MainModuleComponent {...props} />, { context })
    const headerBarWrapper = enzymeWrapper.find(HeaderBarComponent)
    assert.lengthOf(headerBarWrapper, 1, 'There should be the header')
    testSuiteHelpers.assertWrapperProperties(headerBarWrapper, {
      settings: props.settings,
      descriptionEntity: props.descriptionEntity,
      selectedEntityIndex: props.selectedEntityIndex,
      descriptionPath: props.descriptionPath,
      allowSearching: props.allowSearching,
      onSelectEntityIndex: props.onSelectEntityIndex,
      onSearchEntity: props.onSearchEntity,
    }, 'Header properties should be correctly set')

    const browsingTreeWrapper = enzymeWrapper.find(BrowsingTreeComponent)
    assert.lengthOf(browsingTreeWrapper, 1, 'There should be the browsing tree')
    testSuiteHelpers.assertWrapperProperties(browsingTreeWrapper, {
      allowSearching: props.allowSearching,
      browsingTreeVisible: props.browsingTreeVisible,
      descriptionEntity: props.descriptionEntity,
      isDescriptionAllowed: props.isDescriptionAllowed,
      onSelectInnerLink: props.onSelectInnerLink,
      onSelectEntityLink: props.onSelectEntityLink,
      onSearchWord: props.onSearchWord,
      onSearchEntity: props.onSearchEntity,
    }, 'Browsing tree properties should be correctly set')

    const contentDisplayWrapper = enzymeWrapper.find(ContentDisplayComponent)
    assert.lengthOf(contentDisplayWrapper, 1, 'There should be the content displayer')
    testSuiteHelpers.assertWrapperProperties(contentDisplayWrapper, {
      descriptionEntity: props.descriptionEntity,
      isDescriptionAllowed: props.isDescriptionAllowed,
      allowSearching: props.allowSearching,
      onSelectInnerLink: props.onSelectInnerLink,
      onSelectEntityLink: props.onSelectEntityLink,
      onSearchWord: props.onSearchWord,
      onSearchEntity: props.onSearchEntity,
    }, 'Content displayer properties should be correctly set')
  })
})
