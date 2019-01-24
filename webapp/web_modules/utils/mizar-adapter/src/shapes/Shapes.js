/**
 * Copyright 2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of SCO - Space Climate Observatory.
 *
 * SCO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SCO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SCO. If not, see <http://www.gnu.org/licenses/>.
 **/
import { Collection, CollectionList } from './Collection'
import { Scenario, ScenarioList } from './Scenario'
import { Thematic, ThematicList } from './Thematic'
import { Layer, LayerList } from './Layer'
import { GlobalLayerList } from './GlobalLayer'
import LayerTemporalInfos from './LayerTemporalInfos'
import LayerParameters from './LayerParameters'

/**
 * This module shares constants
 * @author Léo Mieulet
 */
export const Shapes = {
  Collection,
  CollectionList,
  Scenario,
  ScenarioList,
  Thematic,
  ThematicList,
  Layer,
  LayerList,
  GlobalLayerList,
  LayerTemporalInfos,
  LayerParameters,
}
