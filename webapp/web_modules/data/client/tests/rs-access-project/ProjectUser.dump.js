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
export default {
  metadata: {
    size: 1000, totalElements: 7, totalPages: 1, number: 0,
  },
  content: [{
    content: {
      id: 1,
      email: 'sylvain.vissiere-guerinet@csgroup.eu',
      lastUpdate: '2020-11-18T14:03:27.84Z',
      status: 'ACCESS_GRANTED',
      metadata: [{ id: 1, key: 'address', value: 'sylvain' }, { id: 4, key: 'reason', value: 'sylvain' }, { id: 3, key: 'organization', value: 'sylvain' }, { id: 2, key: 'country', value: 'UY' }],
      role: {
        id: 5, name: 'PROJECT_ADMIN', authorizedAddresses: [], isDefault: false, isNative: true,
      },
      licenseAccepted: false,
      maxQuota: -1,
      rateLimit: 50,
      currentQuota: 0,
      currentRate: 0,
    },
    links: [{ rel: 'self', href: 'http://172.26.47.52/api/v1/rs-access-project/users/1' }, { rel: 'update', href: 'http://172.26.47.52/api/v1/rs-access-project/users/1' }, { rel: 'delete', href: 'http://172.26.47.52/api/v1/rs-access-project/users/1' }, { rel: 'list', href: 'http://172.26.47.52/api/v1/rs-access-project/users' }, { rel: 'inactive', href: 'http://172.26.47.52/api/v1/rs-access-project/accesses/1/inactive' }],
  }, {
    content: {
      id: 2,
      email: 'raphael.mechali@c-s.fr',
      lastUpdate: '2020-11-19T09:50:27.722Z',
      status: 'ACCESS_GRANTED',
      metadata: [{ id: 8, key: 'reason', value: 'sdf' }, { id: 5, key: 'address', value: 'qscd' }, { id: 6, key: 'country', value: 'ZA' }, { id: 7, key: 'organization', value: 'qsd' }],
      role: {
        id: 5, name: 'PROJECT_ADMIN', authorizedAddresses: [], isDefault: false, isNative: true,
      },
      licenseAccepted: false,
      maxQuota: -1,
      rateLimit: -1,
      currentQuota: 4,
      currentRate: 0,
    },
    links: [{ rel: 'self', href: 'http://172.26.47.52/api/v1/rs-access-project/users/2' }, { rel: 'update', href: 'http://172.26.47.52/api/v1/rs-access-project/users/2' }, { rel: 'delete', href: 'http://172.26.47.52/api/v1/rs-access-project/users/2' }, { rel: 'list', href: 'http://172.26.47.52/api/v1/rs-access-project/users' }, { rel: 'inactive', href: 'http://172.26.47.52/api/v1/rs-access-project/accesses/2/inactive' }],
  }, {
    content: {
      id: 52,
      email: 'theo.lasserre@c-s.fr',
      lastUpdate: '2020-10-07T14:00:31.094Z',
      status: 'ACCESS_GRANTED',
      metadata: [{ id: 52, key: 'address' }, { id: 54, key: 'organization', value: 'CS' }, { id: 55, key: 'reason', value: '-' }, { id: 53, key: 'country', value: 'FR' }],
      role: {
        id: 5, name: 'PROJECT_ADMIN', authorizedAddresses: [], isDefault: false, isNative: true,
      },
      licenseAccepted: false,
      maxQuota: 10000,
      rateLimit: 50,
      currentQuota: 0,
      currentRate: 0,
    },
    links: [{ rel: 'self', href: 'http://172.26.47.52/api/v1/rs-access-project/users/52' }, { rel: 'update', href: 'http://172.26.47.52/api/v1/rs-access-project/users/52' }, { rel: 'delete', href: 'http://172.26.47.52/api/v1/rs-access-project/users/52' }, { rel: 'list', href: 'http://172.26.47.52/api/v1/rs-access-project/users' }, { rel: 'inactive', href: 'http://172.26.47.52/api/v1/rs-access-project/accesses/52/inactive' }],
  }, {
    content: {
      id: 102,
      email: 'arnaud@monkeypatch.io',
      lastUpdate: '2020-11-03T10:12:47.922Z',
      status: 'ACCESS_GRANTED',
      metadata: [{ id: 103, key: 'country', value: 'AF' }, { id: 102, key: 'address', value: '' }, { id: 105, key: 'reason', value: 'zefzge' }, { id: 104, key: 'organization', value: 'MKP' }],
      role: {
        id: 2,
        name: 'REGISTERED_USER',
        parentRole: {
          id: 1, name: 'PUBLIC', authorizedAddresses: [], isDefault: false, isNative: true,
        },
        authorizedAddresses: [],
        isDefault: true,
        isNative: true,
      },
      licenseAccepted: false,
      maxQuota: -1,
      rateLimit: -1,
      currentQuota: 73,
      currentRate: 0,
    },
    links: [{ rel: 'self', href: 'http://172.26.47.52/api/v1/rs-access-project/users/102' }, { rel: 'update', href: 'http://172.26.47.52/api/v1/rs-access-project/users/102' }, { rel: 'delete', href: 'http://172.26.47.52/api/v1/rs-access-project/users/102' }, { rel: 'list', href: 'http://172.26.47.52/api/v1/rs-access-project/users' }, { rel: 'inactive', href: 'http://172.26.47.52/api/v1/rs-access-project/accesses/102/inactive' }],
  }, {
    content: {
      id: 152,
      email: 'leo.mieulet@csgroup.eu',
      lastUpdate: '2020-11-05T11:38:26.339Z',
      status: 'WAITING_ACCOUNT_ACTIVE',
      metadata: [{ id: 155, key: 'reason', value: 'sdffds' }, { id: 152, key: 'address', value: 'dsfsdf' }, { id: 153, key: 'country', value: 'AR' }, { id: 154, key: 'organization', value: 'sdf' }],
      role: {
        id: 2,
        name: 'REGISTERED_USER',
        parentRole: {
          id: 1, name: 'PUBLIC', authorizedAddresses: [], isDefault: false, isNative: true,
        },
        authorizedAddresses: [],
        isDefault: true,
        isNative: true,
      },
      licenseAccepted: false,
      maxQuota: 0,
      rateLimit: 50,
      currentQuota: 0,
      currentRate: 0,
    },
    links: [{ rel: 'self', href: 'http://172.26.47.52/api/v1/rs-access-project/users/152' }, { rel: 'update', href: 'http://172.26.47.52/api/v1/rs-access-project/users/152' }, { rel: 'delete', href: 'http://172.26.47.52/api/v1/rs-access-project/users/152' }, { rel: 'list', href: 'http://172.26.47.52/api/v1/rs-access-project/users' }],
  }, {
    content: {
      id: 202,
      email: 'sebastien.binda@csgroup.eu',
      lastUpdate: '2020-11-18T14:08:46.045Z',
      status: 'ACCESS_GRANTED',
      metadata: [{ id: 205, key: 'reason', value: 'test' }, { id: 203, key: 'country', value: 'FR' }, { id: 202, key: 'address', value: 'CS SI 2' }, { id: 204, key: 'organization', value: 'CS SI' }],
      role: {
        id: 5, name: 'PROJECT_ADMIN', authorizedAddresses: [], isDefault: false, isNative: true,
      },
      licenseAccepted: false,
      maxQuota: 100,
      rateLimit: 50,
      currentQuota: 1,
      currentRate: 0,
    },
    links: [{ rel: 'self', href: 'http://172.26.47.52/api/v1/rs-access-project/users/202' }, { rel: 'update', href: 'http://172.26.47.52/api/v1/rs-access-project/users/202' }, { rel: 'delete', href: 'http://172.26.47.52/api/v1/rs-access-project/users/202' }, { rel: 'list', href: 'http://172.26.47.52/api/v1/rs-access-project/users' }, { rel: 'inactive', href: 'http://172.26.47.52/api/v1/rs-access-project/accesses/202/inactive' }],
  }, {
    content: {
      id: 203,
      email: 'test-user-4-quota@csgroup.eu',
      lastUpdate: '2020-11-18T14:17:47.885Z',
      status: 'ACCESS_GRANTED',
      metadata: [{ id: 206, key: 'address', value: 'Milipilou' }, { id: 207, key: 'country', value: 'MY' }, { id: 208, key: 'organization', value: 'Millepatte' }, { id: 209, key: 'reason', value: 'Mille et une raisons (et surtout tester les quotas sur les nouveaux utilisateurs)' }],
      role: {
        id: 2,
        name: 'REGISTERED_USER',
        parentRole: {
          id: 1, name: 'PUBLIC', authorizedAddresses: [], isDefault: false, isNative: true,
        },
        authorizedAddresses: [],
        isDefault: true,
        isNative: true,
      },
      licenseAccepted: false,
      maxQuota: 10,
      rateLimit: 50,
      currentQuota: 0,
      currentRate: 0,
    },
    links: [{ rel: 'self', href: 'http://172.26.47.52/api/v1/rs-access-project/users/203' }, { rel: 'update', href: 'http://172.26.47.52/api/v1/rs-access-project/users/203' }, { rel: 'delete', href: 'http://172.26.47.52/api/v1/rs-access-project/users/203' }, { rel: 'list', href: 'http://172.26.47.52/api/v1/rs-access-project/users' }, { rel: 'inactive', href: 'http://172.26.47.52/api/v1/rs-access-project/accesses/203/inactive' }],
  }],
  links: [{ rel: 'self', href: 'http://172.26.47.52/api/v1/rs-access-project/users?page\u003d0\u0026size\u003d1000\u0026sort\u003did,asc' }],
}
