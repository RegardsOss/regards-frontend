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
import SearchIcon from 'mdi-material-ui/Magnify'
import DescriptionIcon from 'mdi-material-ui/InformationOutline'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import EntityLinkComponent from '../../../../../../src/components/user/content/list/entity/EntityLinkComponent'
import PageLinkCellComponent from '../../../../../../src/components/user/content/list/common/PageLinkCellComponent'
import PageElementOption from '../../../../../../src/components/user/content/list/common/PageElementOption'
import styles from '../../../../../../src/styles'
import { resolvedDataEntity, resolvedDatasetEntity } from '../../../../../dumps/resolved.dump'

const context = buildTestContext(styles)

/**
 * Test EntityLinkComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing EntityLinkComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EntityLinkComponent)
  })
  it('should render correctly when description and search are allowed', () => {
    const spySelectEntity = {}
    const spySearchEntity = {}
    const props = {
      entity: resolvedDataEntity.displayModel.linkedEntities[0],
      isDescriptionAllowed: () => true,
      allowSearching: true,
      onSelectEntityLink: (e) => {
        spySelectEntity.entity = e
      },
      onSearchEntity: (e) => {
        spySearchEntity.entity = e
      },
    }
    const enzymeWrapper = shallow(<EntityLinkComponent {...props} />, { context })
    // 1 - Check main action, show entity description, is enabled
    const linkWrapper = enzymeWrapper.find(PageLinkCellComponent)
    assert.lengthOf(linkWrapper, 1, 'There should be the link component')
    testSuiteHelpers.assertWrapperProperties(linkWrapper, {
      text: props.entity.content.label,
      tooltip: 'module.description.common.show.entity.description.tootlip',
      LinkIconConstructor: DescriptionIcon,
      disabled: false,
      onClick: enzymeWrapper.instance().onSelectEntityLink,
    }, 'Link properties should be correctly set')
    // test show description callback invokation
    assert.isNotOk(spySelectEntity.entity, 'Show description callback should not have been invoked yet')
    linkWrapper.props().onClick()
    assert.deepEqual(spySelectEntity.entity, props.entity, 'Show description callback should have been invoked with the right paramters')
    // 2 - Check secondary action, search, is enabled
    const optionWrapper = enzymeWrapper.find(PageElementOption)
    assert.lengthOf(optionWrapper, 1, 'There should be search option')
    testSuiteHelpers.assertWrapperProperties(optionWrapper, {
      IconConstructor: SearchIcon,
      title: 'module.description.common.search.entity.tooltip',
      onClick: enzymeWrapper.instance().onSearchEntity,
    }, 'Search option properties should be correctly set')
    // test search callback invokation
    assert.isNotOk(spySearchEntity.entity, 'Search callback should not have been invoked yet')
    optionWrapper.props().onClick()
    assert.deepEqual(spySearchEntity.entity, props.entity, 'Search callback should have been invoked with the right paramters')
  })
  it('should render correctly when description is forbidden', () => {
    const props = {
      entity: resolvedDatasetEntity.displayModel.linkedDocuments[0],
      isDescriptionAllowed: () => false,
      allowSearching: true,
      onSelectEntityLink: () => {},
      onSearchEntity: () => {},
    }
    // 1 - Check main action, show entity description, is disabled
    const enzymeWrapper = shallow(<EntityLinkComponent {...props} />, { context })
    const linkWrapper = enzymeWrapper.find(PageLinkCellComponent)
    assert.lengthOf(linkWrapper, 1, 'There should be the link component')
    testSuiteHelpers.assertWrapperProperties(linkWrapper, {
      text: props.entity.content.label,
      tooltip: 'module.description.common.show.entity.description.tootlip',
      LinkIconConstructor: DescriptionIcon,
      disabled: true,
      onClick: enzymeWrapper.instance().onSelectEntityLink,
    }, 'Link properties should be correctly set, disabled')
    // 2 - Check secondary action, search, is enabled
    const optionWrapper = enzymeWrapper.find(PageElementOption)
    assert.lengthOf(optionWrapper, 1, 'There should be search option')
    testSuiteHelpers.assertWrapperProperties(optionWrapper, {
      IconConstructor: SearchIcon,
      title: 'module.description.common.search.entity.tooltip',
      onClick: enzymeWrapper.instance().onSearchEntity,
    }, 'Search option properties should be correctly set')
  })
  it('should render correctly when search is forbidden', () => {
    const props = {
      entity: resolvedDatasetEntity.displayModel.linkedEntities[0],
      isDescriptionAllowed: () => true,
      allowSearching: false,
      onSelectEntityLink: () => {},
      onSearchEntity: () => {},
    }
    // 1 - Check main action (show entity description) is enabled
    const enzymeWrapper = shallow(<EntityLinkComponent {...props} />, { context })
    const linkWrapper = enzymeWrapper.find(PageLinkCellComponent)
    assert.lengthOf(linkWrapper, 1, 'There should be the link component')
    testSuiteHelpers.assertWrapperProperties(linkWrapper, {
      text: props.entity.content.label,
      tooltip: 'module.description.common.show.entity.description.tootlip',
      LinkIconConstructor: DescriptionIcon,
      disabled: false,
      onClick: enzymeWrapper.instance().onSelectEntityLink,
    }, 'Link properties should be correctly set, disabled')
    // 2 - Check secondary action, search, is not present
    const optionWrapper = enzymeWrapper.find(PageElementOption)
    assert.lengthOf(optionWrapper, 0, 'There should not be search option')
  })
})
