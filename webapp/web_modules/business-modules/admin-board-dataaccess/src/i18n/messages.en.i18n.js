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
const messages = {
  'dataaccess.board.action.list.tooltip': 'List',
  'dataaccess.board.action.add.tooltip': 'Add',

  'dataaccess.board.services.title': 'Services',
  'dataaccess.board.services.description': 'Services applicable on every entity from the current project catalog. Services are available directory from user interface or by using direct HTTP request.',

  'dataaccess.board.searchengines.title': 'Search protocols',
  'dataaccess.board.searchengines.description': 'Search protocols configuration. Legacy protocol is the REGARDS standard protocol. Others protocols can be configured in order to allow external systems to consult your project data catalog.',

  'accessright.board.tooltip.list': 'List',
  'accessright.board.tooltip.add': 'Add',
  'accessright.board.accessgroup.title': 'Access group',
  'accessright.board.accessgroup.description': 'Access groups allow limiting access to data for users.',

  'accessright.board.index.title': 'Data catalog',
  'accessright.board.index.description': 'This section allows you to manage data catalog',
  'accessright.board.index.delete': 'Reset data catalog',
  'accessright.board.index.delete.confirm': 'Warning : If you reset the data catalog index, then all data will be deleted and re-indexed thanks to configured data crawlers.',
  'accessright.board.index.delete.error.message': 'Error occured during catalog reset action.',
}

export default messages
