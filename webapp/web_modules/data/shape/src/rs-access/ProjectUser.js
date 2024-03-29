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
import { AdminDomain } from '@regardsoss/domain'
import { quotaFields } from './QuotaInformation'
import { MetadataContentArray } from '../rs-admin/Metadata'

export const ProjectUser = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    role: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    email: PropTypes.string,
    lastConnection: PropTypes.string,
    status: PropTypes.oneOf(AdminDomain.PROJECT_USER_STATUS).isRequired,
    lastUpdate: PropTypes.string,
    metadata: MetadataContentArray,
    ...quotaFields,
  }),
})
export const ProjectUserList = PropTypes.objectOf(ProjectUser)
