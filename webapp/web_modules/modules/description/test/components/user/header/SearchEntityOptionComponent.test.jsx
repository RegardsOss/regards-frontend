/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FlatButton from 'material-ui/FlatButton'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SearchEntityOptionComponent from '../../../../src/components/user/header/SearchEntityOptionComponent'
import styles from '../../../../src/styles'
import { resolvedDatasetEntity } from '../../../dumps/resolved.dump'

const context = buildTestContext(styles)

/**
 * Test SearchEntityOptionComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing SearchEntityOptionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchEntityOptionComponent)
  })
  it('should render correctly', () => {
    const spyOnSearchEntity = {}
    const props = {
      descriptionEntity: resolvedDatasetEntity,
      onSearchEntity: (entity) => {
        spyOnSearchEntity.entity = entity
      },
    }
    const enzymeWrapper = shallow(<SearchEntityOptionComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be search button')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
      onClick: enzymeWrapper.instance().onSearchEntity,
      label: 'module.description.header.search.entity.label',
      title: 'module.description.header.search.entity.tooltip',
    }, 'Button properties should be correctly reported')

    assert.isNotOk(spyOnSearchEntity.entity, 'Callback should not have been invoked yet')
    buttonWrapper.props().onClick()
    assert.deepEqual(spyOnSearchEntity.entity, props.descriptionEntity.entity, 'Callback should be invoked with the right entity parameter')
  })
})
