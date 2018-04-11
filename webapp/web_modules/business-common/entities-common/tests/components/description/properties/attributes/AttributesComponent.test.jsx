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
import AttributesComponent from '../../../../../src/components/description/properties/attributes/AttributesComponent'
import LoadingDisplayerComponent from '../../../../../src/components/description/LoadingDisplayerComponent'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Entities Common] Testing AttributesComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AttributesComponent)
  })
  it('should render correctly when no data', () => {
    const props = {
      loading: false,
      // entity attributes, empty array allowed
      attributes: [],
    }
    const enzymeWrapper = shallow(<AttributesComponent {...props} />, { context })
    const noDataMessageWrapper = enzymeWrapper.findWhere(n => n.props().id === 'entities.common.properties.no.attribute')
    assert.lengthOf(noDataMessageWrapper, 1, 'There should be a no data message displayer ')
  })
  it('should render correctly when loading', () => {
    const props = {
      loading: true,
      attributes: [],
    }
    const enzymeWrapper = shallow(<AttributesComponent {...props} />, { context })
    const loadingWrapper = enzymeWrapper.find(LoadingDisplayerComponent)
    assert.lengthOf(loadingWrapper, 1, 'There should be a loading displayer')
  })
  it('should render correctly with content', () => {
    const props = {
      loading: false,
      attributes: [{
        id: 0,
        label: 'un tout',
        Renderer: () => <div id="Renderer1" />,
        renderValue: { main: 'a Value' },
      }, {
        id: 1,
        label: 'petit bikini',
        Renderer: () => <div id="Renderer2" />,
        renderValue: null,
      }],

    }
    const enzymeWrapper = shallow(<AttributesComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(props.attributes[0].Renderer), 1, 'The first Renderer should be used as value is not null')
    assert.lengthOf(enzymeWrapper.find(props.attributes[1].Renderer), 1, 'The second Renderer should also be used for null valuve')
  })
})
