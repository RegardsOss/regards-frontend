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
export default [{
  content: {
    id: 1,
    pos: 0,
    mode: 'FROM_DESCENDANTS',
    model: {
      id: 1,
      name: 'Deuxieme Modele',
      description: 'Description du deuxieme modele de jeux de données',
      type: 'DATASET',
    },
    attribute: {
      id: 1,
      name: 'FirstOneAttr',
      description: 'Here is a description',
      label: 'Here is a label',
      type: 'DOUBLE',
      fragment: {
        id: 1,
        name: 'SomeFragment',
        description: 'This is a fragment containing a lot of attributes',
      },
      alterable: true,
      optional: true,
      properties: [],
    },
  },
  links: [{
    rel: 'self',
    href: 'http://localhost:8000/api/v1/rs-dam/models/fragments/1',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/fragments/1',
    },
  }, {
    rel: 'update',
    href: 'http://localhost:8000/api/v1/rs-dam/models/fragments/1',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/fragments/1',
    },
  }, {
    rel: 'delete',
    href: 'http://localhost:8000/api/v1/rs-dam/models/fragments/1',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/fragments/1',
    },
  }, {
    rel: 'list',
    href: 'http://localhost:8000/api/v1/rs-dam/models/fragments',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/fragments',
    },
  }, {
    rel: 'export',
    href: 'http://localhost:8000/api/v1/rs-dam/models/fragments/1/export',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/fragments/1/export',
    },
  }, {
    rel: 'import',
    href: 'http://localhost:8000/api/v1/rs-dam/models/fragments/import',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/fragments/import',
    },
  }],
}, {
  content: {
    id: 2,
    pos: 0,
    mode: 'GIVEN',
    model: {
      id: 5,
      name: 'Deuxieme Modele',
      description: 'Description du deuxieme modele de jeux de données',
      type: 'DATASET',
    },
    attribute: {
      id: 4,
      label: 'Here is a label',
      name: 'Attribute_4',
      description: "Description de l'attribut 0 - 0",
      defaultValue: null,
      type: 'STRING',
      unit: null,
      precision: null,
      arraysize: 0,
      queryable: true,
      facetable: true,
      alterable: true,
      optional: true,
      group: 'leGroup',
      fragment: {
        id: 2,
        name: 'Fragment 2',
      },
    },
  },
  links: [{
    rel: 'self',
    href: 'http://localhost:8000/api/v1/rs-dam/models/fragments/2',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/fragments/2',
    },
  }, {
    rel: 'update',
    href: 'http://localhost:8000/api/v1/rs-dam/models/fragments/2',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/fragments/2',
    },
  }, {
    rel: 'delete',
    href: 'http://localhost:8000/api/v1/rs-dam/models/fragments/2',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/fragments/2',
    },
  }, {
    rel: 'list',
    href: 'http://localhost:8000/api/v1/rs-dam/models/fragments',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/fragments',
    },
  }, {
    rel: 'export',
    href: 'http://localhost:8000/api/v1/rs-dam/models/fragments/2/export',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/fragments/2/export',
    },
  }, {
    rel: 'import',
    href: 'http://localhost:8000/api/v1/rs-dam/models/fragments/import',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/fragments/import',
    },
  }],
}]
