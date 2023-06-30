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
export const dumpSessions = {
  0: {
    content: {
      id: 0,
      name: '2018-07-09 14:37:00',
      source: 'JASON2_COMMON_MOE',
      creationDate: '2018-07-09T14:37:00Z',
      lastUpdateDate: '2018-07-09T14:37:00Z',
      state: 'OK',
      lifeCycle: {
        products: {
          running: true,
          done: 800000000,
          errors: 20554545,
          incomplete: 8,
        },
        sip: {
          done: 800000000,
          total: 75,
          pending: 10,
          invalid: 1,
          refused: 0,
          errors: 2,
          generatedAIP: 65,
        },
        aip: {
          done: 800000000,
          total: 10,
          pending: 5,
          errors: 1,
          indexed: 2,
        },
      },
    },
    links: [],
  },
  1: {
    content: {
      id: 1,
      name: '2019-07-09 14:37:00',
      source: 'JASON_BOURNE_MOE',
      creationDate: '2018-07-09T14:37:00Z',
      lastUpdateDate: '2018-07-09T14:37:00Z',
      state: 'ACKNOWLEDGED',
      lifeCycle: {
        products: {
          running: false,
          done: 5054876,
          errors: 0,
          incomplete: 0,
        },
        sip: {
          done: 599450,
          total: 600000,
          pending: 10450,
          invalid: 0,
          refused: 0,
          errors: 0,
          generatedAIP: 65,
        },
        aip: {
          done: 599450,
          total: 599450,
          pending: 0,
          errors: 0,
          indexed: 599450,
        },
      },
    },
    links: [],
  },
  2: {
    content: {
      id: 2,
      name: '2019-07-09 14:37:00',
      source: 'JASON_STATHAM_MOE',
      creationDate: '2018-07-09T14:37:00Z',
      lastUpdateDate: '2018-07-09T14:37:00Z',
      state: 'DELETED',
      lifeCycle: {
        products: {
          running: false,
          done: 50,
          errors: 2,
          incomplete: 8,
        },
        sip: {
          done: 30,
          total: 60,
          pending: 10,
          invalid: 1,
          refused: 0,
          errors: 2,
          generatedAIP: 65,
        },
        aip: {
          done: 5,
          total: 10,
          pending: 5,
          errors: 1,
          indexed: 2,
        },
      },
    },
    links: [],
  },
  3: {
    content: {
      id: 3,
      name: '2019-07-09 14:37:00',
      source: 'JASON_MOMOA_MOE',
      creationDate: '2018-07-09T14:37:00Z',
      lastUpdateDate: '2018-07-09T14:37:00Z',
      state: 'ERROR',
      lifeCycle: {
        products: {
          running: false,
          done: 50,
          errors: 2,
          incomplete: 8,
        },
        sip: {
          done: 30,
          total: 60,
          pending: 10,
          invalid: 1,
          refused: 0,
          errors: 2,
          generatedAIP: 65,
        },
        aip: {
          done: 0,
          total: 10,
          pending: 5,
          errors: 1,
          indexed: 2,
        },
      },
    },
    links: [],
  },
}
