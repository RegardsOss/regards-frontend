/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * This files holds entity data files as they are returned by the backend
 * @author Raphaël Mechali
 */

export const dataFilesDump = [{
  filename: 'temp.pdf',
  reference: true,
  mimeType: 'application/pdf',
  filesize: 2500,
  online: true,
  uri: 'file://files/temp.pdf',
}, {
  filename: 'temp.md',
  reference: false,
  mimeType: 'text/markdown',
  filesize: 5000,
  online: true,
  uri: 'file://files/temp.md',
}, {
  filename: 'temp.offline',
  reference: false,
  mimeType: 'text/idk',
  filesize: 5000,
  online: false,
  uri: 'file://files/temp.offline',
}]
