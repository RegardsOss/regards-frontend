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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import EntityDescriptionComponent from '../../../../../src/components/user/results/options/EntityDescriptionComponent'
import { EntityDescriptionContainer } from '../../../../../src/containers/user/results/options/EntityDescriptionContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test EntityDescriptionContainer
* @author Raphaël Mechali
*/
describe('[Search Results] Testing EntityDescriptionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EntityDescriptionContainer)
  })
  it('should render correctly', () => {
    const props = {
      entity: {
        content: {
          id: 1,
          ipId: 'coucou',
          sipId: '1',
          label: 'O.D.I.L',
          entityType: ENTITY_TYPES_ENUM.DATA,
          files: {},
          geometry: null,
          properties: {},
          tags: [],
          services: [],
        },
      },
      dispatchShowDescription: () => { },
    }
    const enzymeWrapper = shallow(<EntityDescriptionContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(EntityDescriptionComponent), 1)
  })
})
