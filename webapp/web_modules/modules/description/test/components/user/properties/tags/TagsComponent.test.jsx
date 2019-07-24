/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DamDomain } from '@regardsoss/domain'
import TagsComponent from '../../../../../src/components/user/properties/tags/TagsComponent'
import SimpleTagContainer from '../../../../../src/containers/user/properties/tags/SimpleTagContainer'
import EntityTagContainer from '../../../../../src/containers/user/properties/tags/EntityTagContainer'
import LoadingDisplayerComponent from '../../../../../src/components/user/LoadingDisplayerComponent'
import styles from '../../../../../src/styles/styles'
import { fullModuleConf } from '../../../../dumps/configuration.dump'

const context = buildTestContext(styles)

describe('[Description] Testing TagsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TagsComponent)
  })
  it('should render correctly tags no data', () => {
    const props = {
      moduleConf: fullModuleConf,
      loading: false,
      showTags: true,
      showLinkedDocuments: true,
      simpleTags: [],
      entityTags: [],
      documentTags: [],
    }
    const enzymeWrapper = shallow(<TagsComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().id === 'module.description.properties.no.tag'), 1, 'There should be a tag no data message')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().id === 'module.description.properties.no.document'), 1, 'There should be a document no data message')
  })
  it('should render correctly loading', () => {
    const props = {
      moduleConf: fullModuleConf,
      loading: true,
      showTags: true,
      showLinkedDocuments: true,
      simpleTags: [],
      entityTags: [],
      documentTags: [],
    }
    const enzymeWrapper = shallow(<TagsComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(LoadingDisplayerComponent), 2, 'There should be two loading displayer. One for tags, One for documents')
  })
  it('should render correctly tags list', () => {
    const props = {
      moduleConf: fullModuleConf,
      loading: false,
      showTags: false,
      showLinkedDocuments: false,
      simpleTags: ['sTag1', 'sTag2'],
      entityTags: [{
        content: {
          id: 'URN:helloooooooooooooo Nanny!',
          providerId: 'Provider1',
          model: '1',
          label: 'Hello, dear nanny',
          tags: [],
          entityType: DamDomain.ENTITY_TYPES_ENUM.COLLECTION,
        },
      }],
      documentTags: [{
        content: {
          id: 'URN:ANOTHERDOC!',
          providerId: 'Provider1',
          model: '2',
          label: 'Hello, dear doc!',
          tags: [],
          entityType: DamDomain.ENTITY_TYPES_ENUM.DOCUMENT,
        },
      }],
    }
    const enzymeWrapper = shallow(<TagsComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(SimpleTagContainer), 0, 'Simple tags should not be shown (by configuration)')
    assert.lengthOf(enzymeWrapper.find(EntityTagContainer), 0, 'Entity tags should not be shown (by configuration)')

    const props2 = {
      ...props,
      showTags: true,
      showLinkedDocuments: true,
    }
    enzymeWrapper.setProps(props2)
    assert.lengthOf(enzymeWrapper.find(SimpleTagContainer), 2, 'All simple tags should be shown (by configuration)')
    assert.lengthOf(enzymeWrapper.find(EntityTagContainer), 2, 'Entity tags and document tags should not be shown')
  })
})
