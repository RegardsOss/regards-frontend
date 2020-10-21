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
// Plugin
export { PluginParameterTypes, PluginParamType } from './PluginParamType'
export { default as PluginConfParamsUtils } from './PluginConfParamsUtils'

export { default as EntityIdTester } from './EntityIdTester'
// Data types
export { DATA_TYPES, DATA_TYPES_ENUM } from './DataTypes'
export { default as URLAuthInjector } from './URLAuthInjector'
export { EnumNumericalComparator, EnumNumericalComparators } from './EnumNumericalComparator'
export { default as durationParser } from './DurationParser'
export { default as MimeTypes } from './MimeTypes'
export { SORT_ORDERS_ENUM, SORT_ORDERS, getNextSortOrder } from './SortOrdersEnum'
export { relativeURLRegexp, validURLRegexp } from './URLRegex'
export { validURIRegexp } from './URIRegex'

// Documentation links
export { LINK_DOC_SEARCH_API } from './DocumentationLinks'
