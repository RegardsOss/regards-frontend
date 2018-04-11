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
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import TagsComponent from '../../../../../src/components/description/properties/tags/TagsComponent'
import { TagsContainer } from '../../../../../src/containers/description/properties/tags/TagsContainer'
import DescriptionLevelActions from '../../../../../src/model/description/DescriptionLevelActions'
import getDescriptionLevelSelectors from '../../../../../src/model/description/DescriptionLevelSelectors'

const context = buildTestContext()

describe('[Entities Common] Testing TagsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TagsContainer)
  })
  it('should render correctly no data, not fetching tags', () => {
    const fetchedCount = {
      tags: 0,
    }
    const props = {
      entity: null,
      onSearchTag: null,
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors('test'),
      dispatchGetEntity: testSuiteHelpers.getSuccessDispatchStub({
        content: {
          ipId: 'urn:test',
          entityType: ENTITY_TYPES_ENUM.DATASET,
          tags: [],
          label: 'URN:SDF:SDFSDF:SDFSDFSDFSDFSDF',
        },
      }, () => {
        fetchedCount.tags += 1
      }),
    }
    const enzymeWrapper = shallow(<TagsContainer {...props} />, { context })
    assert.equal(fetchedCount.tags, 0, 'There should be no fetch for null entity')
    const componentWrapper = enzymeWrapper.find(TagsComponent)
    assert.lengthOf(componentWrapper, 1, 'The corresponding component should be rendered')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      loading: false,
      simpleTags: [],
      entityTags: [],
      onSearchTag: null,
      levelActions: props.levelActions,
      levelSelectors: props.levelSelectors,
    }, '')
  })
  it('should render correctly with data, fetching entity tags', () => {
    const fetchedCount = {
      tags: 0,
    }
    const props = {
      entity: {
        content: {
          ipId: 'urn:test',
          label: 'kikou',
          entityType: ENTITY_TYPES_ENUM.COLLECTION,
          tags: ['simpleTag1', 'simpleTag2', 'URN:entityTag1', 'URN:entityTag2'],
        },
      },
      onSearchTag: null,
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors('test'),
      dispatchGetEntity: testSuiteHelpers.getSuccessDispatchStub({
        content: {
          ipId: 'urn:test',
          entityType: ENTITY_TYPES_ENUM.DATASET,
          tags: [],
          label: 'URN:SDF:SDFSDF:SDFSDFSDFSDFSDF',
        },
      }, () => {
        fetchedCount.tags += 1
      }),
    }
    shallow(<TagsContainer {...props} />, { context })
    assert.isAbove(fetchedCount.tags, 0, 'Entity tags fetching should have started')
  })
})
