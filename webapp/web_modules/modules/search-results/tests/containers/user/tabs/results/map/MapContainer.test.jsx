/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIClient } from '@regardsoss/client'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MapComponent from '../../../../../../src/components/user/tabs/results/map/MapComponent'
import { MapContainer } from '../../../../../../src/containers/user/tabs/results/map/MapContainer'
import styles from '../../../../../../src/styles'
import resultsDump from '../../../../../dumps/results.dump'
import { dataContext } from '../../../../../dumps/data.context.dump'
import { dataEntityWithGeometry } from '../../../../../dumps/entities.dump'

const context = buildTestContext(styles)

/**
 * Test MapContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing MapContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MapContainer)
  })
  it('should render correctly', () => {
    const props = {
      moduleId: 1,
      resultsContext: UIClient.ResultsContextHelper.mergeDeep(dataContext, {
        type: DamDomain.ENTITY_TYPES_ENUM.DATA,
        typeState: {
          [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
            mode: UIDomain.RESULTS_VIEW_MODES_ENUM.MAP,
          },
        },
      }),
      entities: [
        // some entities (no valid geometry)
        ...resultsDump.content,
        // an entity with geometry
        dataEntityWithGeometry,
      ],
      pageMetadata: resultsDump.metadata,
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<MapContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(MapComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      featuresCollection: {
        features: [dataEntityWithGeometry.content], // only the entity with geometry should have been kept
        type: 'FeatureCollection',
      },
      displayedAreas: [], // no area
      selectionMode: UIDomain.MAP_SELECTION_MODES_ENUM.PICK_ON_CLICK,
      onSetSelectionMode: enzymeWrapper.instance().onSetSelectionMode,
      onDrawingSelectionUpdated: enzymeWrapper.instance().onDrawingSelectionUpdated,
      onDrawingSelectionDone: enzymeWrapper.instance().onDrawingSelectionDone,
      onFeaturesPicked: enzymeWrapper.instance().onFeaturesPicked,
      backgroundLayerURL: 'https://c.tile.openstreetmap.org/', // from configuration
      backgroundLayerType: 'OSM', // from configuration
    }, 'Component should define the expected properties')
  })
})
