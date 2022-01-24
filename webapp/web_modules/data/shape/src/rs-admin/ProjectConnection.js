/*
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
 */
import { ProjectConnectionStateEnum } from '@regardsoss/domain/admin'
import values from 'lodash/values'
import { ProjectContent } from './Project'

/**
 * Entity description for ProjectConnection. A ProjectConnection is the database configuration
 * for a couple microservice/project.
 *
 * @author Sébastien Binda
 */
export const ProjectConnection = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    project: ProjectContent,
    microservice: PropTypes.string,
    userName: PropTypes.string,
    password: PropTypes.string,
    driverClassName: PropTypes.string,
    url: PropTypes.string,
    status: PropTypes.oneOf(values(ProjectConnectionStateEnum)),
    errorCause: PropTypes.string,
  }),
})

export const ProjectConnectionList = PropTypes.objectOf(ProjectConnection)
