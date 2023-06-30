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
export default {
  metadata: {
    size: 100,
    totalElements: 2,
    totalPages: 1,
    number: 0,
  },
  content: [{
    content: {
      id: 1,
      name: 'project1',
      label: 'Le Projet 1',
      description: '',
      icon: '',
      isPublic: true,
      isAccessible: false,
      isDeleted: false,
      host: 'http://regards-projet.com',
    },
    links: [{
      rel: 'self',
      href: 'http://172.26.47.52:9000/api/v1/rs-admin/projects/project1',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://172.26.47.52:9000/api/v1/rs-admin/projects/project1',
      },
    }, {
      rel: 'delete',
      href: 'http://172.26.47.52:9000/api/v1/rs-admin/projects/project1',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://172.26.47.52:9000/api/v1/rs-admin/projects/project1',
      },
    }, {
      rel: 'update',
      href: 'http://172.26.47.52:9000/api/v1/rs-admin/projects/project1',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://172.26.47.52:9000/api/v1/rs-admin/projects/project1',
      },
    }, {
      rel: 'create',
      href: 'http://172.26.47.52:9000/api/v1/rs-admin/projects',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://172.26.47.52:9000/api/v1/rs-admin/projects',
      },
    }],
  }, {
    content: {
      id: 52,
      name: 'projet2',
      label: 'Le Projet 2',
      description: 'la description du projet2',
      icon: 'http://www.mercator-ocean.fr/wp-content/uploads/2015/03/Logo-AVISO.jpg',
      isPublic: true,
      isAccessible: false,
      isDeleted: false,
      host: 'http://regards-projet2.com',
    },
    links: [{
      rel: 'self',
      href: 'http://172.26.47.52:9000/api/v1/rs-admin/projects/projet2',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://172.26.47.52:9000/api/v1/rs-admin/projects/projet2',
      },
    }, {
      rel: 'delete',
      href: 'http://172.26.47.52:9000/api/v1/rs-admin/projects/projet2',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://172.26.47.52:9000/api/v1/rs-admin/projects/projet2',
      },
    }, {
      rel: 'update',
      href: 'http://172.26.47.52:9000/api/v1/rs-admin/projects/projet2',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://172.26.47.52:9000/api/v1/rs-admin/projects/projet2',
      },
    }, {
      rel: 'create',
      href: 'http://172.26.47.52:9000/api/v1/rs-admin/projects',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://172.26.47.52:9000/api/v1/rs-admin/projects',
      },
    }],
  }],
  links: [{
    rel: 'self',
    href: 'http://172.26.47.52:9000/api/v1/rs-admin/projects',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://172.26.47.52:9000/api/v1/rs-admin/projects',
    },
  }],
}
