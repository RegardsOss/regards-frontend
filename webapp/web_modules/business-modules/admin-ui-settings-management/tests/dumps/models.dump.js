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

/**
 * Models dump for tests
 * @author Raphaël Mechali
 */
export const modelsDump = {
  1: {
    content: {
      id: 1, name: 'STAFnvc_model', description: 'Model for STAFnvc AIPS', type: 'DATA',
    },
    links: [{ rel: 'self', href: 'http://localhost:3000/api/v1/rs-dam/models/STAFnvc_model' }, { rel: 'update', href: 'http://localhost:3000/api/v1/rs-dam/models/STAFnvc_model' }, { rel: 'delete', href: 'http://localhost:3000/api/v1/rs-dam/models/STAFnvc_model' }, { rel: 'list', href: 'http://localhost:3000/api/v1/rs-dam/models' }, { rel: 'export', href: 'http://localhost:3000/api/v1/rs-dam/models/STAFnvc_model/export' }],
  },
  4: {
    content: {
      id: 4, name: 'Departement', description: 'Départements francais', type: 'DATA',
    },
    links: [{ rel: 'self', href: 'http://localhost:3000/api/v1/rs-dam/models/Departement' }, { rel: 'update', href: 'http://localhost:3000/api/v1/rs-dam/models/Departement' }, { rel: 'delete', href: 'http://localhost:3000/api/v1/rs-dam/models/Departement' }, { rel: 'list', href: 'http://localhost:3000/api/v1/rs-dam/models' }, { rel: 'export', href: 'http://localhost:3000/api/v1/rs-dam/models/Departement/export' }],
  },
  53: {
    content: {
      id: 53, name: 'CRAWL_DATA_MODEL', description: 'Model pour aspiration de données de validation (REGARDS-2275: Initialisation des données aspirées)', version: '1', type: 'DATA',
    },
    links: [{ rel: 'self', href: 'http://localhost:3000/api/v1/rs-dam/models/CRAWL_DATA_MODEL' }, { rel: 'update', href: 'http://localhost:3000/api/v1/rs-dam/models/CRAWL_DATA_MODEL' }, { rel: 'delete', href: 'http://localhost:3000/api/v1/rs-dam/models/CRAWL_DATA_MODEL' }, { rel: 'list', href: 'http://localhost:3000/api/v1/rs-dam/models' }, { rel: 'export', href: 'http://localhost:3000/api/v1/rs-dam/models/CRAWL_DATA_MODEL/export' }],
  },
}
