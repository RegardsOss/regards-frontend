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
import IconButton from 'material-ui/IconButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SearchRelatedEntitiesComponent from '../../../../../../../src/components/user/tabs/results/common/options/SearchRelatedEntitiesComponent'
import styles from '../../../../../../../src/styles'
import { datasetEntity, datasetEntityWithFilterLink } from '../../../../../../dumps/entities.dump'

const context = buildTestContext(styles)

/**
 * Test SearchRelatedEntitiesComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing SearchRelatedEntitiesComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchRelatedEntitiesComponent)
  })
  it('should render correctly, button must be enabled', () => {
    const spiedOnSearchEntity = {
      entity: null,
    }
    const props = {
      entity: datasetEntityWithFilterLink,
      onSearchEntity: (entity) => {
        spiedOnSearchEntity.entity = entity
      },
    }
    const enzymeWrapper = shallow(<SearchRelatedEntitiesComponent {...props} />, { context })
    const button = enzymeWrapper.find(IconButton)
    assert.lengthOf(button, 1)
    testSuiteHelpers.assertWrapperProperties(button, {
      onClick: enzymeWrapper.instance().onSearchEntity,
      disabled: false,
    })

    // check parent callback is invoked with the right parament
    assert.isNull(spiedOnSearchEntity.entity, 'Parent callback should not have been invoked yet')
    button.props().onClick()
    assert.equal(spiedOnSearchEntity.entity, props.entity, 'Parent callback should have been invoked')
  })
  it('should render correctly, button must be disabled', () => {
    const spiedOnSearchEntity = {
      entity: null,
    }
    const props = {
      entity: datasetEntity,
      onSearchEntity: (entity) => {
        spiedOnSearchEntity.entity = entity
      },
    }
    const enzymeWrapper = shallow(<SearchRelatedEntitiesComponent {...props} />, { context })
    const button = enzymeWrapper.find(IconButton)
    assert.lengthOf(button, 1)
    testSuiteHelpers.assertWrapperProperties(button, {
      disabled: true,
    })
  })
})
