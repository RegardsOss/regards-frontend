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
import { DamDomain } from '@regardsoss/domain'
import { CommonShapes, DataManagementShapes } from '@regardsoss/shape'

/**
 * Defines minimal dataset information when editing dataset subsetting (Nota: actual dataset may hold more
 * information, for instance when duplicated or edited)
 *
 * @author Raphaël Mechali
 */
export const SubsettingEditionDataset = PropTypes.shape({
  content: PropTypes.shape({
    dataModel: PropTypes.string.isRequired,
    model: DataManagementShapes.ModelContent.isRequired,
    plgConfDataSource: CommonShapes.PluginConfigurationContent.isRequired,
    type: PropTypes.oneOf([DamDomain.ENTITY_TYPES_ENUM.DATASET]).isRequired,
    feature: PropTypes.shape({
      entityType: PropTypes.oneOf([DamDomain.ENTITY_TYPES_ENUM.DATASET]).isRequired,
      label: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      providerId: PropTypes.string.isRequired,
      properties: PropTypes.objectOf(PropTypes.any),
    }).isRequired,
  }),
})
