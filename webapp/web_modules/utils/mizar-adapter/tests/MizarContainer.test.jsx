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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { BasicPageableActions, BasicPageableSelectors } from '@regardsoss/store-utils'
import { CatalogDomain, DamDomain } from '@regardsoss/domain'
import { MizarContainer } from '../src/MizarContainer'
import MizarAdapter from '../src/adapters/MizarAdapter'

const context = buildTestContext()

/**
 * Test MizarContainer
 * @author Raphaël Mechali
 */
describe('[Mizar adapter] Testing MizarContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MizarContainer)
  })
  it('should render correctly and filter entities without geometry', () => {
    const props = {
      pageActions: new BasicPageableActions({ namespace: 'any', entityEndpoint: 'any', schemaTypes: {} }),
      pageSelectors: new BasicPageableSelectors(),
      entities: [{ // should be filtered
        content: {
          id: 'entity-A',
          model: 'anyModel',
          providerId: 'ea',
          label: 'Entity A',
          entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
          tags: [],
        },
      }, { // should be filtered
        content: {
          id: 'entity-B',
          model: 'anyModel',
          providerId: 'eb',
          label: 'Entity B',
          entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
          tags: [],
        },
      }, { // should be kept
        content: {
          id: 'entity-C',
          model: 'anyModel',
          providerId: 'ec',
          label: 'Entity C',
          entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
          tags: [],
          geometry: {
            type: CatalogDomain.GEOMETRY_TYPES.Point,
            coordinates: [1, 2],
          },
        },
      }],
      flushEntities: () => {},
      fetchEntities: () => {},
    }
    const enzymeWrapper = shallow(<MizarContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(MizarAdapter)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      featuresCollection: {
        features: [props.entities[2].content], // other feature should have been filtered
        type: 'FeatureCollection',
      },
      applyGeoParameter: enzymeWrapper.instance().onApplyGeoParameter,
    }, 'Container should set the right properties for MizarAdapter')
  })
})
