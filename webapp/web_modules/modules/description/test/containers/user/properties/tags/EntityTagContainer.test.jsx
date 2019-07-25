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
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { EntityTagContainer } from '../../../../../src/containers/user/properties/tags/EntityTagContainer'
import TagComponent from '../../../../../src/components/user/properties/tags/TagComponent'
import styles from '../../../../../src/styles/styles'
import { fullModuleConf } from '../../../../dumps/configuration.dump'

const context = buildTestContext(styles)

describe('[Description] Testing EntityTagContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EntityTagContainer)
  })
  it('should render correctly with data', () => {
    const onSearchTag = () => { }
    const dispatchShowDetail = () => { }
    const props = {
      moduleConf: fullModuleConf,
      entity: {
        content: {
          id: 'urn:test',
          providerId: 'Provider1',
          label: 'test',
          entityType: ENTITY_TYPES_ENUM.DATA,
          model: '1',
          tags: [],
          files: {},
        },
      },
      onSearchTag,
      descriptionPath: [],
      dispatchShowDetail,
    }
    const enzymeWrapper = shallow(<EntityTagContainer {...props} />, { context })
    const compWrapper = enzymeWrapper.find(TagComponent)
    assert.lengthOf(compWrapper, 1, 'there should a tag component')

    testSuiteHelpers.assertWrapperProperties(compWrapper, {
      tagLabel: props.entity.content.label,
      isEntity: true,
      onSearchTag: enzymeWrapper.instance().onSearchTag,
      onShowDescription: dispatchShowDetail,
    }, 'It should report required properties for subcontainer to work')
  })
  it('should forbid search for item types not allowing description', () => {
    const onSearchTag = () => { }
    const dispatchShowDetail = () => { }
    const props = {
      moduleConf: fullModuleConf,
      entity: {
        content: {
          id: 'urn:test',
          providerId: 'Provider1',
          label: 'test',
          model: '1',
          entityType: ENTITY_TYPES_ENUM.DATASET, // not allowed for description, by configuration
          files: {},
          tags: [],
        },
      },
      onSearchTag,
      descriptionPath: [],
      dispatchShowDetail,
    }
    const enzymeWrapper = shallow(<EntityTagContainer {...props} />, { context })
    const compWrapper = enzymeWrapper.find(TagComponent)
    assert.lengthOf(compWrapper, 1, 'there should a tag component')
    assert.isNull(compWrapper.props().onShowDescription, 'Show description should be forbidden, by configuration, for dataset')
  })
  it('should avoid cyclic path of entities', () => {
    const onSearchTag = () => { }
    const dispatchShowDetail = () => { }
    const entity = {
      content: {
        id: 'urn:test',
        providerId: 'Provider1',
        label: 'test',
        model: '1',
        entityType: ENTITY_TYPES_ENUM.DATASET,
        files: {},
        tags: [],
      },
    }
    const props = {
      moduleConf: fullModuleConf,
      entity,
      onSearchTag,
      descriptionPath: [entity],
      dispatchShowDetail,
    }
    const enzymeWrapper = shallow(<EntityTagContainer {...props} />, { context })
    assert.isTrue(enzymeWrapper.instance().state.alreadyInPath, 'The "alreadyInPath" state should be true')
    const compWrapper = enzymeWrapper.find(TagComponent)
    assert.lengthOf(compWrapper, 1, 'there should be tag compoent')
    testSuiteHelpers.assertWrapperProperties(compWrapper, {
      tagLabel: props.entity.content.label,
      onSearchTag: enzymeWrapper.instance().onSearchTag,
      onShowDescription: null, // show description shuld be forbidden when already shown in path
      isEntity: true,
    }, 'It should report required properties for subcontainer to work')
  })
})
