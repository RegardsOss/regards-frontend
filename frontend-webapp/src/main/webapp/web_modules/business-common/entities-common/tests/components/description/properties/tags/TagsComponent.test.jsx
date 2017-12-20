/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DescriptionLevelActions from '../../../../../src/model/description/DescriptionLevelActions'
import getDescriptionLevelSelectors from '../../../../../src/model/description/DescriptionLevelSelectors'
import TagsComponent from '../../../../../src/components/description/properties/tags/TagsComponent'
import SimpleTagContainer from '../../../../../src/containers/description/properties/tags/SimpleTagContainer'
import EntityTagContainer from '../../../../../src/containers/description/properties/tags/EntityTagContainer'
import LoadingDisplayerComponent from '../../../../../src/components/description/LoadingDisplayerComponent'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Entities Common] Testing TagsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TagsComponent)
  })
  it('should render correctly tags no data', () => {
    const props = {
      loading: false,
      simpleTags: [],
      entityTags: [],
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors([]),
    }
    const enzymeWrapper = shallow(<TagsComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().id === 'entities.common.properties.no.tag'), 1, 'There should be a tag no data message')
  })
  it('should render correctly loading', () => {
    const props = {
      loading: true,
      simpleTags: [],
      entityTags: [],
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors([]),
    }
    const enzymeWrapper = shallow(<TagsComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(LoadingDisplayerComponent), 2, 'There should be two loading displayer. One for tags, One for documents')
  })
  it('should render correctly tags list', () => {
    const props = {
      loading: false,
      simpleTags: ['sTag1', 'sTag2'],
      entityTags: [{
        content: {
          ipId: 'URN:helloooooooooooooo Nanny!',
          model: {
            id: 1,
          },
          label: 'Hello, dear nanny',
          tags: [],
          entityType: 'COLLECTION',
        },
      }],
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors([]),
    }
    const enzymeWrapper = shallow(<TagsComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(SimpleTagContainer), 2, 'There should be two tag container to render simple tags')
    assert.lengthOf(enzymeWrapper.find(EntityTagContainer), 1, 'There should be an entity tag container to render entity tag')
  })
})
