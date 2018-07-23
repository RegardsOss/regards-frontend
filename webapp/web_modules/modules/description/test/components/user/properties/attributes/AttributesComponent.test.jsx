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
import AttributesComponent from '../../../../../src/components/user/properties/attributes/AttributesComponent'
import AttributesGroupComponent from '../../../../../src/components/user/properties/attributes/AttributesGroupComponent'
import DescriptionThumbnailComponent from '../../../../../src/components/user/properties/attributes/DescriptionThumbnailComponent'
import LoadingDisplayerComponent from '../../../../../src/components/user/LoadingDisplayerComponent'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Description] Testing AttributesComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AttributesComponent)
  })
  it('should render correctly when no data', () => {
    const props = {
      loading: false,
      // entity attributes, empty array allowed
      attributeGroups: [],
      thumbnailURL: null,
    }
    const enzymeWrapper = shallow(<AttributesComponent {...props} />, { context })
    const noDataMessageWrapper = enzymeWrapper.findWhere(n => n.props().id === 'module.description.properties.no.attribute')
    assert.lengthOf(noDataMessageWrapper, 1, 'There should be a no data message displayer ')
    assert.lengthOf(enzymeWrapper.find(DescriptionThumbnailComponent), 0, 'Thumbnail should not be displayed')
  })
  it('should render correctly when loading', () => {
    const props = {
      loading: true,
      // entity attributes, empty array allowed
      attributeGroups: [],
      thumbnailURL: null,
    }
    const enzymeWrapper = shallow(<AttributesComponent {...props} />, { context })
    const loadingWrapper = enzymeWrapper.find(LoadingDisplayerComponent)
    assert.lengthOf(loadingWrapper, 1, 'There should be a loading displayer')
    assert.lengthOf(enzymeWrapper.find(DescriptionThumbnailComponent), 0, 'Thumbnail should not be displayed')
  })
  it('should render correctly with content and thumbnail', () => {
    const props = {
      loading: false,
      attributeGroups: [{
        key: 'g1',
        showTitle: false,
        title: {},
        elements: [{
          key: 'el1',
          label: {
            en: 'ONE',
            fr: 'UN',
          },
          attributes: [{
            key: 'attr1',
            Renderer: () => <div id="Renderer1" />,
            renderValue: 'a Value',
          }, {
            key: 'attr1',
            Renderer: () => <div id="Renderer2" />,
            renderValue: null,
          }],
        }],
      }],
      thumbnailURL: 'test:thumbnail.png',
    }
    const enzymeWrapper = shallow(<AttributesComponent {...props} />, { context })
    const groupWrappers = enzymeWrapper.find(AttributesGroupComponent)
    assert.lengthOf(groupWrappers, 1, 'There should be group component for first attribute group')
    assert.deepEqual(groupWrappers.props().group, props.attributeGroups[0], 'Its group model should be correctly set up')
    const thumbnailWrapper = enzymeWrapper.find(DescriptionThumbnailComponent)
    assert.lengthOf(thumbnailWrapper, 1, 'There should be the thumbnail')
    assert.equal(thumbnailWrapper.props().thumbnailURL, props.thumbnailURL, 'URL should be correctly reported')
  })
  it('should render correctly with content and without thumbnail', () => {
    const props = {
      loading: false,
      attributeGroups: [{
        key: 'g1',
        showTitle: false,
        title: {},
        elements: [{
          key: 'el1',
          label: {
            en: 'ONE',
            fr: 'UN',
          },
          attributes: [{
            key: 'attr1',
            Renderer: () => <div id="Renderer1" />,
            renderValue: 'a Value',
          }],
        }],
      }],
      thumbnailURL: null,
    }
    const enzymeWrapper = shallow(<AttributesComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(AttributesGroupComponent), 1, 'There should be group component for first attribute group')
    assert.lengthOf(enzymeWrapper.find(DescriptionThumbnailComponent), 0, 'Thumbnail should not be displayed')
  })
})
