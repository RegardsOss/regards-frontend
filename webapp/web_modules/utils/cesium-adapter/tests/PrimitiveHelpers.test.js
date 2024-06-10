/**
 * Copyright 2017-2024 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { assert } from 'chai'
import flattenDeep from 'lodash/flattenDeep'
import get from 'lodash/get'
import forEach from 'lodash/forEach'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Cartesian3 } from 'cesium'
import PrimitiveHelpers from '../src/PrimitiveHelpers'

describe('[CESIUM ADAPTER] Testing PrimitiveHelpers', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should build polygon geometry instance', () => {
    const polygonFeature = [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [
            [
              [
                36.096717863191515,
                40.48417616799702,
              ],
              [
                32.123859997729994,
                33.373655951416765,
              ],
              [
                40.772255963787615,
                32.041199074988214,
              ],
              [
                44.63127359445656,
                36.88363791911695,
              ],
              [
                44.2498648919383,
                39.47201461742375,
              ],
              [
                36.096717863191515,
                40.48417616799702,
              ],
            ],
          ],
          type: 'Polygon',
        },
      },
    ]
    const geometryInstances = PrimitiveHelpers.buildPolylineGeometryInstances(polygonFeature)
    assert.equal(geometryInstances.length, 1)

    const geometryPositions = get(geometryInstances[0], 'geometry._positions')
    const polygonCoordinates = get(polygonFeature[0], 'geometry.coordinates[0]')
    assert.deepEqual(geometryPositions, Cartesian3.fromDegreesArray(flattenDeep(polygonCoordinates)))
  })
  it('should build multipolygon geometry instance', () => {
    const multiPolygonFeature = [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [
            [
              [
                [
                  -47.900390625,
                  -14.944784875088372,
                ],
                [
                  -51.591796875,
                  -19.91138351415555,
                ],
                [
                  -41.11083984375,
                  -21.309846141087192,
                ],
                [
                  -43.39599609375,
                  -15.390135715305204,
                ],
                [
                  -47.900390625,
                  -14.944784875088372,
                ],
              ],
              [
                [
                  -46.6259765625,
                  -17.14079039331664,
                ],
                [
                  -47.548828125,
                  -16.804541076383455,
                ],
                [
                  -46.23046874999999,
                  -16.699340234594537,
                ],
                [
                  -45.3515625,
                  -19.31114335506464,
                ],
                [
                  -46.6259765625,
                  -17.14079039331664,
                ],
              ],
              [
                [
                  -44.40673828125,
                  -18.375379094031825,
                ],
                [
                  -44.4287109375,
                  -20.097206227083888,
                ],
                [
                  -42.9345703125,
                  -18.979025953255267,
                ],
                [
                  -43.52783203125,
                  -17.602139123350838,
                ],
                [
                  -44.40673828125,
                  -18.375379094031825,
                ],
              ],
            ],
          ],
          type: 'MultiPolygon',
        },
      },
    ]
    const geometryInstances = PrimitiveHelpers.buildPolylineGeometryInstances(multiPolygonFeature)
    assert.equal(geometryInstances.length, 1)

    const multiPolygonCoordinates = get(multiPolygonFeature[0], 'geometry.coordinates')
    forEach(multiPolygonCoordinates, (coord, index) => {
      const geometryPositions = get(geometryInstances[index], 'geometry._positions')
      const polygonCoordinates = flattenDeep(coord)
      assert.deepEqual(geometryPositions, Cartesian3.fromDegreesArray(polygonCoordinates))
    })
  })
  it('should build line geometry instance', () => {
    const lineFeature = [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [
            [
              32.67570306851843,
              46.6148755739176,
            ],
            [
              31.504580130783808,
              40.88202814548396,
            ],
          ],
          type: 'LineString',
        },
      },
    ]
    const geometryInstances = PrimitiveHelpers.buildPolylineGeometryInstances(lineFeature)
    assert.equal(geometryInstances.length, 1)
    const geometryPositions = get(geometryInstances[0], 'geometry._positions')
    const lineCoordinates = get(lineFeature[0], 'geometry.coordinates')
    assert.deepEqual(geometryPositions, Cartesian3.fromDegreesArray(flattenDeep(lineCoordinates)))
  })
})
