/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonDomain } from '@regardsoss/domain'
import { NoContentComponent } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ParametersSectionComponent from '../../../../../src/components/user/content/parameters/ParametersSectionComponent'
import ThumbnailComponent from '../../../../../src/components/user/content/parameters/DescriptionThumbnailComponent'
import AttributesGroupComponent from '../../../../../src/components/user/content/parameters/AttributesGroupComponent'
import styles from '../../../../../src/styles'
import { resolvedDataEntity } from '../../../../dumps/resolved.dump'

const context = buildTestContext(styles)

/**
 * Test ParametersSectionComponent
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[Description] Testing ParametersSectionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ParametersSectionComponent)
  })
  it('should render correctly when no data', () => {
    const props = {
      attributesGroups: [],
      thumbnail: null,
      scrollAreaHeight: 760,
    }
    const enzymeWrapper = shallow(<ParametersSectionComponent {...props} />, { context })
    const noContentWrapper = enzymeWrapper.find(NoContentComponent)
    assert.lengthOf(noContentWrapper, 1, 'There should be the no content displayer')
    testSuiteHelpers.assertWrapperProperties(noContentWrapper, {
      titleKey: 'module.description.no.parameter.title',
      messageKey: 'module.description.no.parameter.message',
    }, 'No content properties should be correctly set')
    assert.lengthOf(enzymeWrapper.find(ThumbnailComponent), 0, 'There should not be the thumbnail component')
    assert.lengthOf(enzymeWrapper.find(AttributesGroupComponent), 0, 'There should be no attribute group')
  })
  it('should render correctly with only attribute groups', () => {
    const props = {
      attributesGroups: resolvedDataEntity.displayModel.attributesGroups,
      thumbnail: null,
      scrollAreaHeight: 760,
    }
    const enzymeWrapper = shallow(<ParametersSectionComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(NoContentComponent), 0, 'There should not be the no content displayer')
    assert.lengthOf(enzymeWrapper.find(ThumbnailComponent), 0, 'There should not be the thumbnail component')
    const attributeGroupsWrapper = enzymeWrapper.find(AttributesGroupComponent)
    assert.lengthOf(attributeGroupsWrapper, props.attributesGroups.length, 'There should be an attribute group displayer for each group')
    props.attributesGroups.forEach((group, groupIndex) => {
      const attributeGroupWrapper = attributeGroupsWrapper.at(groupIndex)
      testSuiteHelpers.assertWrapperProperties(attributeGroupWrapper, {
        group,
      }, `${group.key} component properties should be correctly reported`)
    })
  })
  it('should render correctly with only thumbnail', () => {
    const props = {
      attributesGroups: [],
      thumbnail: {
        label: 'My picture',
        available: true,
        uri: 'http://this.is/a.test.png',
        type: CommonDomain.DATA_TYPES_ENUM.THUMBNAIL,
        reference: true,
      },
      scrollAreaHeight: 760,
    }
    const enzymeWrapper = shallow(<ParametersSectionComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(NoContentComponent), 0, 'There should not be the no content displayer')
    assert.lengthOf(enzymeWrapper.find(AttributesGroupComponent), 0, 'There should be no attribute group')
    const thumbnailWrapper = enzymeWrapper.find(ThumbnailComponent)
    assert.lengthOf(thumbnailWrapper, 1, 'There should be the thumbnail component')
    testSuiteHelpers.assertWrapperProperties(thumbnailWrapper, {
      thumbnail: props.thumbnail,
    }, 'Thumnail component properties should be correctly set')
  })
  it('should render correctly with both thumbnail and attribute groups', () => {
    const props = {
      attributesGroups: resolvedDataEntity.displayModel.attributesGroups,
      thumbnail: {
        label: 'My picture',
        available: true,
        uri: 'http://this.is/a.test.png',
        type: CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD,
        reference: false,
      },
      scrollAreaHeight: 760,
    }
    const enzymeWrapper = shallow(<ParametersSectionComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(NoContentComponent), 0, 'There should not be the no content displayer')
    assert.lengthOf(enzymeWrapper.find(ThumbnailComponent), 1, 'There should be the thumbnail component')
    assert.lengthOf(enzymeWrapper.find(AttributesGroupComponent), props.attributesGroups.length, 'There should be an attribute group displayer for each group')
  })
})
