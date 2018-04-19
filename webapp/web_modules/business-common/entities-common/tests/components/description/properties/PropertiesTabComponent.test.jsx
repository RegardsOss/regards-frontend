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
import { DataManagementClient } from '@regardsoss/client'
import { BasicListSelectors } from '@regardsoss/store-utils'
import DescriptionLevelActions from '../../../../src/model/description/DescriptionLevelActions'
import getDescriptionLevelSelectors from '../../../../src/model/description/DescriptionLevelSelectors'
import PropertiesTabComponent from '../../../../src/components/description/properties/PropertiesTabComponent'
import AttributesContainer from '../../../../src/containers/description/properties/attributes/AttributesContainer'
import TagsContainer from '../../../../src/containers/description/properties/tags/TagsContainer'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Entities Common] Testing PropertiesTabComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PropertiesTabComponent)
  })
  it('should render properly', () => {
    const props = {
      entity: {
        content: {
          ipId: 'URN:helloooooooooooooo Nanny!',
          model: {
            id: 1,
          },
          label: 'Hello, dear nanny',
          tags: [],
          entityType: 'COLLECTION',
        },
      },
      fetchModelAttributesActions: new DataManagementClient.ModelAttributesActions(),
      fetchModelAttributesSelectors: new BasicListSelectors([]),
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors([]),
    }
    const enzymeWrapper = shallow(<PropertiesTabComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(AttributesContainer), 1, 'It should use an attribute container to show attributes')
    assert.lengthOf(enzymeWrapper.find(TagsContainer), 1, 'It should use an attribute container to show Tags')
  })
})