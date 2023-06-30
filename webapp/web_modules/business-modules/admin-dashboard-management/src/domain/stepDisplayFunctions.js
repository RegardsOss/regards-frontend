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
import get from 'lodash/get'
import map from 'lodash/map'
import sum from 'lodash/sum'
import find from 'lodash/find'
import { ICON_TYPE_ENUM } from './iconType'

export const getNbInputs = (sessionSteps) => sum(map(sessionSteps, (sessionStep) => get(sessionStep, 'inputRelated', 0)))

export const getNbOutputs = (sessionSteps) => sum(map(sessionSteps, (sessionStep) => get(sessionStep, 'outputRelated', 0)))

export const isRunning = (sessionSteps) => find(sessionSteps, (sessionStep) => get(sessionStep, `state.${ICON_TYPE_ENUM.RUNNING}`, 0) > 0)
