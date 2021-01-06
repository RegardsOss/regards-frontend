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
export { default as AttributeColumnBuilder } from './columns/AttributeColumnBuilder'

// configuration component for lists and columns of attributes, adn related elements
export { default as AttributesListConfigurationComponent } from './configuration/AttributesListConfigurationComponent'
export { default as SingleAttributeFieldRender } from './configuration/single/SingleAttributeFieldRender'

// render get method for given type
export { buildRenderDelegate, getTypeRender } from './render/AttributesTypeToRender'
export { default as AttributeModelRender } from './render/AttributeRender'
export { default as AttributeRender } from './render/AttributeRender'
export { default as LabelVersionText } from './render/LabelVersionText'

export { default as ThumbnailAttributeRender } from './render/ThumbnailAttributeRender'

export { default as messages } from './i18n'
