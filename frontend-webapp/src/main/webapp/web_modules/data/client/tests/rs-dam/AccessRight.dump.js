/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
module.exports = {
  content: [
    {
      content: {
        qualityFilter: {
          maxScore: 10,
          minScore: 0,
          qualityLevel: 'ACCEPTED',
        },
        dataAccessRight: {
          dataAccessLevel: 'INHERITED_ACCESS',
        },
        accessLevel: 'FULL_ACCESS',
        id: 42,
        dataset: {
          id: 1,
          label: 'PremierDataSet',
          type: 'DATASET',
          model: {
            id: 2,
            name: 'Premier Modele',
            descirption: 'Description du premier modele de jeux de données',
            type: 'DATASET',
          },
          dataModel: 3,
          tags: [],
        },
      },
      links: [],
    },
    {
      content: {
        qualityFilter: {
          maxScore: 10,
          minScore: 0,
          qualityLevel: 'ACCEPTED',
        },
        dataAccessRight: {
          dataAccessLevel: 'INHERITED_ACCESS',
        },
        accessLevel: 'FULL_ACCESS',
        id: 43,
        dataset: {
          id: 4,
          label: 'PremierDataSet',
          type: 'DATASET',
          model: {
            id: 2,
            name: 'Premier Modele',
            descirption: 'Description du premier modele de jeux de données',
            type: 'DATASET',
          },
          dataModel: 3,
          tags: [],
        },
      },
      links: [],
    },
  ],
  metadata: {
    number: 0,
    size: 10,
    totalElements: 2,
  },
  links: [],
}
