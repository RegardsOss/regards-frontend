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
import { Breadcrumb } from '@regardsoss/components'
import { TagTypes } from '@regardsoss/domain/catalog'
import { Tag } from '../../../../src/models/navigation/Tag'
import NavigationComponent from '../../../../src/components/user/navigation/NavigationComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing NavigationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigationComponent)
  })
  it('should render correctly when externally driven (no description nor page)', () => {
    const levels = [
      new Tag(TagTypes.DATASET, 'a dataset', 'URN:TEST'),
      new Tag(TagTypes.DATASET, 'styles:patatoes', 'styles:patatoes'),
    ]
    const props = {
      locale: 'fr',
      navigationLevels: levels,
      defaultIconURL: 'any',
      onLevelSelected: () => { },
    }
    const enzymeWrapper = shallow(<NavigationComponent {...props} />, { context })
    const breadcrumb = enzymeWrapper.find(Breadcrumb)
    assert.lengthOf(breadcrumb, 1, 'There should be a breadcrumb component')
    assert.deepEqual(breadcrumb.props().elements, props.navigationLevels, 'breacrumb elements should be the defined navigation levels')
    assert.equal(enzymeWrapper.instance().getLevelLabel(levels[0], 0), 'a dataset', 'level tag should be used as root tag when there is no description')
  })
  it('should render correctly when in modules is in standalone mode (description or page)', () => {
    const levels = [
      new Tag(TagTypes.DATASET, 'a dataset', 'URN:TEST'),
      new Tag(TagTypes.DATASET, 'styles:patatoes', 'styles:patatoes'),
    ]
    const props = {
      description: 'aaa',
      page: { title: { en: 'test-en', fr: 'test-fr' } },
      locale: 'en',
      navigationLevels: levels,
      defaultIconURL: 'any',
      onLevelSelected: () => { },
    }
    const enzymeWrapper = shallow(<NavigationComponent {...props} />, { context })
    const breadcrumb = enzymeWrapper.find(Breadcrumb)
    assert.lengthOf(breadcrumb, 1, 'There should be a breadcrumb component')
    assert.deepEqual(breadcrumb.props().elements, props.navigationLevels, 'breacrumb elements should be the defined navigation levels')
    assert.equal(enzymeWrapper.instance().getLevelLabel(levels[0], 0), 'test-en', 'root label should come from module configuration')
  })
})
