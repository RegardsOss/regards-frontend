/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

export { default as PluginsClientsMap } from './client/PluginsClientsMap'
export { NumberRange } from './utils/NumberRange'
export { DateRange } from './utils/DateRange'
export { BOUND_TYPE, formatHintText, formatTooltip } from './utils/AttributesMessagesHelper'
export { initPlugin } from './utils/InitPlugin'
export { TargetEntitiesResolver } from './utils/TargetEntitiesResolver'
export { default as ClientConfBuilder } from './utils/ClientConfBuilder'
// re-export parts of plugins module here to avoid plugin developper importing them from plugins util
export { AttributeModelWithBounds } from '@regardsoss/plugins'
