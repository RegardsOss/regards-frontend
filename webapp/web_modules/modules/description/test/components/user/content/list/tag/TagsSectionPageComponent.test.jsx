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
import TagsSectionPageComponent from '../../../../../../src/components/user/content/list/tag/TagsSectionPageComponent'
import styles from '../../../../../../src/styles'
import { resolvedDataEntity } from '../../../../../dumps/resolved.dump'
import ListSectionPageComponent from '../../../../../../src/components/user/content/list/common/ListSectionPageComponent'

const context = buildTestContext(styles)

/**
 * Test TagsSectionPageComponent
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[Description] Testing TagsSectionPageComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TagsSectionPageComponent)
  })
  it('should render correctly', () => {
    const props = {
      allowSearching: true,
      tags: resolvedDataEntity.displayModel.wordTags,
      scrollAreaHeight: 760,
      onSearchWord: () => {},
    }
    const enzymeWrapper = shallow(<TagsSectionPageComponent {...props} />, { context })
    const subcomponentWrapper = enzymeWrapper.find(ListSectionPageComponent)
    assert.lengthOf(subcomponentWrapper, 1, 'There should be list render')
    testSuiteHelpers.assertWrapperProperties(subcomponentWrapper, {
      elements: props.tags,
      buildElementNode: enzymeWrapper.instance().renderTag,
      scrollAreaHeight: props.scrollAreaHeight,
    }, 'List render properties should be correctly set')
    // Test inner render into tag cell component
    props.tags.forEach((tag) => {
      shallow(enzymeWrapper.instance().renderTag(tag), { context })
    })
  })
})
