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
import { AdminDomain } from '@regardsoss/domain'
import URL from '../rs-common/URL'

export const ProjectContent = PropTypes.shape({
  id: PropTypes.number,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: URL,
  licenseLink: URL,
  isDeleted: PropTypes.bool.isRequired,
  isPublic: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  host: PropTypes.string,
  crs: PropTypes.oneOf(AdminDomain.PROJECT_CRS),
  isPoleToBeManaged: PropTypes.bool,
})

export const Project = PropTypes.shape({
  content: ProjectContent,
})

export const ProjectList = PropTypes.objectOf(Project)
export const ProjectArray = PropTypes.arrayOf(Project)
