/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { NavigationModelResolutionContainer } from '../../src/containers/user/navigation/NavigationModelResolutionContainer'
import { aNavigationConfiguration, anHomeConfiguration } from './configuration.dump'
import { allDefaultConfigDumpModules } from './modules.dump'

/**
 * Dumps for navigation items as converted by the NavigationModelResolutionContainer
 * @author Raphaël Mechali
 */

/** Provides a way to change selection in navigation model dump */
export const changeSelectedModule = (newSelectionId, model) => NavigationModelResolutionContainer.updateSelection(model, newSelectionId)

/** A full converted model with selection on home */
export const fullConvertedNavigationModel = changeSelectedModule(5,
  NavigationModelResolutionContainer.resolveNavigationModel(aNavigationConfiguration, allDefaultConfigDumpModules, anHomeConfiguration))
