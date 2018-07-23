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
import TagComponent from '../../../../../src/components/user/properties/tags/TagComponent'
import SimpleTagContainer from '../../../../../src/containers/user/properties/tags/SimpleTagContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Description] Testing SimpleTagContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SimpleTagContainer)
  })
  it('should render correctly', () => {
    const props = {
      tag: 'test',
      onSearchTag: () => { },
      onShowDescription: null,
      isEntity: false,
    }
    const enzymeWrapper = shallow(<SimpleTagContainer {...props} />, { context })
    const compWrapper = enzymeWrapper.find(TagComponent)
    assert.lengthOf(compWrapper, 1, 'The corresponding component should be rendered')
    testSuiteHelpers.assertWrapperProperties(compWrapper, {
      tagLabel: props.tag,
      onSearchTag: enzymeWrapper.instance().onSearchTag,
      onShowDescription: null, // unused by the simple tags
      isEntity: false,
    }, 'It should report required properties for subcontainer to work')
  })
})
