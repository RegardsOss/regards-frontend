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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { MapComponentWithSelection, MapContainer } from '../../../../../../src/containers/user/tabs/results/map/MapContainer'
import styles from '../../../../../../src/styles'
import resultsDump from '../../../../../dumps/results.dump'
import { dataContext } from '../../../../../dumps/data.context.dump'
import { dataEntityWithGeometry } from '../../../../../dumps/entities.dump'

const context = buildTestContext(styles)

/**
 * Test MapContainer
 * @author Raphaël Mechali
 * @author Théo Lasserre
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
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      resultsContext: UIDomain.ResultsContextHelper.deepMerge(dataContext, {
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            selectedType: DamDomain.ENTITY_TYPES_ENUM.DATA,
            types: {
              [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
                selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.MAP,
              },
            },
          },
        },
      }),
      onNewItemOfInterestPicked: () => { },
      entities: [
        // some entities (no valid geometry)
        ...resultsDump.content,
        // an entity with geometry
        dataEntityWithGeometry,
      ],
      pageMetadata: resultsDump.metadata,
      updateResultsContext: () => { },
      uploadToponym: () => { },
    }
    const enzymeWrapper = shallow(<MapContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(MapComponentWithSelection)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      featuresCollection: {
        features: [dataEntityWithGeometry.content], // only the entity with geometry should have been kept
        type: 'FeatureCollection',
      },
      displayedAreas: [], // no area
      mapSelectionMode: UIDomain.MAP_SELECTION_MODES_ENUM.PICK_ON_CLICK,
      viewMode: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D,
      onToggleSelectionMode: enzymeWrapper.instance().onToggleSelectionMode,
      onToggleViewMode: enzymeWrapper.instance().onToggleViewMode,
      onDrawingSelectionUpdated: enzymeWrapper.instance().onDrawingSelectionUpdated,
      onDrawingSelectionDone: enzymeWrapper.instance().onDrawingSelectionDone,
      onProductZoomTo: enzymeWrapper.instance().onProductZoomTo,
      onNewItemOfInterestPicked: props.onNewItemOfInterestPicked,
      tabType: props.tabType,
      onToponymSelected: enzymeWrapper.instance().onToponymSelected,
      selectedToponyms: {
        features: [],
        type: 'FeatureCollection',
      },
      layers: [{
        layerName: 'Layer',
        visible: true,
        background: true,
        enabled: true,
        layerViewMode: 'MODE_3D',
        type: 'OSM',
        url: 'https://c.tile.openstreetmap.org/',
      }], // from configuration
    }, 'Component should define the expected properties')
  })
})
