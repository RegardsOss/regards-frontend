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
import { Rectangle } from 'cesium'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import CesiumAdapter from '../src/CesiumAdapter'
import selectedFeature from './selectedFeature.json'
import drawedArea from './drawedArea.json'
import selectedToponym from './selectedToponym.json'

describe('[CESIUM ADAPTER] Testing CesiumAdapter', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should set up a camera destination from a feature selected by a user', () => {
    const cameraDestination = CesiumAdapter.getNewCameraDestination(selectedFeature)
    assert.deepEqual(cameraDestination.destination, new Rectangle(1.068330296086634, 0.6179170811540112, 1.0992897355065279, 0.6222111407903833))
  })
  it('should set up a camera destination from a draxed area by a user ', () => {
    const cameraDestination = CesiumAdapter.getNewCameraDestination(drawedArea)
    assert.deepEqual(cameraDestination.destination, new Rectangle(1.126281811593452, 0.6388119928855807, 1.2608489575282424, 0.6910870826543073))
  })
  it('should set up a camera destination from selected toponym', () => {
    const cameraDestination = CesiumAdapter.getNewCameraDestination(selectedToponym)
    assert.deepEqual(cameraDestination.destination, new Rectangle(0.33378740393318646, 0.6919333821254305, 0.36752154659475333, 0.7445763922325066))
  })
})
