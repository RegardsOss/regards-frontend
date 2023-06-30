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
export default [
  {
    content: {
      id: 1,
      name: 'PUBLIC',
      permissions: [],
      authorizedAddresses: [],
      isCorsRequestsAuthorized: true,
      isDefault: true,
      isNative: true,
    },
    links: [],
  },
  {
    content: {
      id: 2,
      name: 'REGISTERED_USER',
      parentRole: {
        id: 1,
        name: 'PUBLIC',
        permissions: [],
        authorizedAddresses: [],
        isCorsRequestsAuthorized: true,
        isDefault: true,
        isNative: true,
      },
      permissions: [],
      authorizedAddresses: [],
      isCorsRequestsAuthorized: true,
      isDefault: false,
      isNative: true,
    },
    links: [],
  },
  {
    content: {
      id: 3,
      name: 'ADMIN',
      parentRole: {
        id: 2,
        name: 'REGISTERED_USER',
        parentRole: {
          id: 1,
          name: 'PUBLIC',
          permissions: [],
          authorizedAddresses: [],
          isCorsRequestsAuthorized: true,
          isDefault: true,
          isNative: true,
        },
        permissions: [],
        authorizedAddresses: [],
        isCorsRequestsAuthorized: true,
        isDefault: false,
        isNative: true,
      },
      permissions: [],
      authorizedAddresses: [],
      isCorsRequestsAuthorized: true,
      isDefault: false,
      isNative: true,
    },
    links: [],
  },
  {
    content: {
      id: 4,
      name: 'PROJECT_ADMIN',
      parentRole: {
        id: 3,
        name: 'ADMIN',
        parentRole: {
          id: 2,
          name: 'REGISTERED_USER',
          parentRole: {
            id: 1,
            name: 'PUBLIC',
            permissions: [],
            authorizedAddresses: [],
            isCorsRequestsAuthorized: true,
            isDefault: true,
            isNative: true,
          },
          permissions: [],
          authorizedAddresses: [],
          isCorsRequestsAuthorized: true,
          isDefault: false,
          isNative: true,
        },
        permissions: [],
        authorizedAddresses: [],
        isCorsRequestsAuthorized: true,
        isDefault: false,
        isNative: true,
      },
      permissions: [],
      authorizedAddresses: [],
      isCorsRequestsAuthorized: true,
      isDefault: false,
      isNative: true,
    },
    links: [],
  },
  {
    content: {
      id: 5,
      name: 'INSTANCE_ADMIN',
      parentRole: {
        id: 4,
        name: 'PROJECT_ADMIN',
        parentRole: {
          id: 3,
          name: 'ADMIN',
          parentRole: {
            id: 2,
            name: 'REGISTERED_USER',
            parentRole: {
              id: 1,
              name: 'PUBLIC',
              permissions: [],
              authorizedAddresses: [],
              isCorsRequestsAuthorized: true,
              isDefault: true,
              isNative: true,
            },
            permissions: [],
            authorizedAddresses: [],
            isCorsRequestsAuthorized: true,
            isDefault: false,
            isNative: true,
          },
          permissions: [],
          authorizedAddresses: [],
          isCorsRequestsAuthorized: true,
          isDefault: false,
          isNative: true,
        },
        permissions: [],
        authorizedAddresses: [],
        isCorsRequestsAuthorized: true,
        isDefault: false,
        isNative: true,
      },
      permissions: [],
      authorizedAddresses: [
        '1.2.3.74',
        '89.56.12.44',
      ],
      isCorsRequestsAuthorized: true,
      isDefault: false,
      isNative: true,
    },
    links: [],
  },
  {
    content: {
      id: 8,
      name: 'Mon_ROLE',
      parentRole: {
        id: 4,
        name: 'PROJECT_ADMIN',
        parentRole: {
          id: 3,
          name: 'ADMIN',
          parentRole: {
            id: 2,
            name: 'REGISTERED_USER',
            parentRole: {
              id: 1,
              name: 'PUBLIC',
              permissions: [],
              authorizedAddresses: [],
              isCorsRequestsAuthorized: true,
              isDefault: true,
              isNative: true,
            },
            permissions: [],
            authorizedAddresses: [],
            isCorsRequestsAuthorized: true,
            isDefault: false,
            isNative: true,
          },
          permissions: [],
          authorizedAddresses: [],
          isCorsRequestsAuthorized: true,
          isDefault: false,
          isNative: true,
        },
        permissions: [],
        authorizedAddresses: [],
        isCorsRequestsAuthorized: true,
        isDefault: false,
        isNative: true,
      },
      permissions: [],
      authorizedAddresses: [
        '1.2.3.4',
        '5.6.7.99',
      ],
      isCorsRequestsAuthorized: true,
      isDefault: false,
      isNative: false,
    },
    links: [],
  },
]
