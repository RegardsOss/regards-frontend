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

/**
 * Provides notification dump
 * @author Raphaël Mechali
 */

/** Some notification */
export const aNotif = {
  date: '2018-09-28T12:45:11.498Z',
  id: 53,
  message: 'Storage of StorageDataFile(0c492eff219d9acaca15bacc493c5b80) failed due to the following IOException: java.net.MalformedURLException: no protocol: /regards-input/localstorage/raph/0c4/0c492eff219d9acaca15bacc493c5b80',
  mimeType: 'text/plain',
  projectUserRecipients: [],
  roleRecipients: ['PROJECT_ADMIN', 'ADMIN'],
  sender: 'rs-storage',
  status: 'UNREAD',
  title: 'Storage of file 0c492eff219d9acaca15bacc493c5b80 failed',
  type: 'INFO',
}

export const generateNotification = (status, id) => ({
  ...aNotif,
  id,
  status,
})
