/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import TagsComponent from '../../../../../src/components/user/properties/tags/TagsComponent'
import { TagsContainer } from '../../../../../src/containers/user/properties/tags/TagsContainer'
import { fullModuleConf } from '../../../../dumps/configuration.dump'

const context = buildTestContext()

describe('[Description] Testing TagsContainer', () => {
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
      moduleConf: fullModuleConf,
      onSearchTag: null,
      dispatchGetEntity: testSuiteHelpers.getSuccessDispatchStub({
        content: {
          id: 'urn:test',
          providerId: 'Provider1',
          label: 'URN:SDF:SDFSDF:SDFSDFSDFSDFSDF',
          entityType: ENTITY_TYPES_ENUM.DATASET,
          model: '1',
          tags: [],
        },
      }, () => {
        fetchedCount.tags += 1
      }),
      showTags: true,
      showLinkedDocuments: true,
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
    }, '')
  })
  it('should render correctly with data, fetching entity tags', () => {
    const fetchedCount = {
      tags: 0,
    }
    const props = {
      moduleConf: fullModuleConf,
      entity: {
        content: {
          id: 'urn:test',
          providerId: 'Provider1',
          label: 'kikou',
          entityType: ENTITY_TYPES_ENUM.DATA,
          model: '1',
          files: {},
          tags: ['simpleTag1', 'simpleTag2', 'URN:entityTag1', 'URN:entityTag2'],
        },
      },
      onSearchTag: null,
      dispatchGetEntity: testSuiteHelpers.getSuccessDispatchStub({
        content: {
          id: 'urn:test',
          providerId: 'Provider1',
          label: 'URN:SDF:SDFSDF:SDFSDFSDFSDFSDF',
          entityType: ENTITY_TYPES_ENUM.DATASET,
          model: '1',
          files: {},
          tags: [],
        },
      }, () => {
        fetchedCount.tags += 1
      }),
      showTags: true,
      showLinkedDocuments: true,
    }
    shallow(<TagsContainer {...props} />, { context })
    assert.isAbove(fetchedCount.tags, 0, 'Entity tags fetching should have started')
  })
})
