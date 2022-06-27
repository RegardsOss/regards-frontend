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
export default [{
  content: {
    id: 1,
    name: 'FirstOneAttr',
    description: 'Here is a description',
    label: 'Here is a label',
    jsonPath: 'properties.FirstOneAttr',
    type: 'DOUBLE',
    fragment: {
      id: 1,
      name: 'default',
      description: 'This is a fragment containing a lot of attributes',
    },
    alterable: true,
    optional: true,
    properties: [],
  },
  links: [{
    rel: 'self',
    href: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    },
  }, {
    rel: 'update',
    href: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    },
  }, {
    rel: 'delete',
    href: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    },
  }, {
    rel: 'list',
    href: 'http://localhost:8000/api/v1/rs-dam/models/attributes',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/attributes',
    },
  }],
}, {
  content: {
    id: 7,
    name: 'MyInt',
    description: 'Another attribute with a restriction this time',
    label: 'My int label',
    jsonPath: 'properties.MyInt',
    type: 'INTEGER',
    fragment: {
      id: 1,
      name: 'default',
      description: 'This is a fragment containing a lot of attributes',
    },
    alterable: true,
    optional: false,
    restriction: {
      min: 11,
      max: 116,
      minExcluded: false,
      maxExcluded: true,
      id: 4,
      type: 'INTEGER_RANGE',
    },
    properties: [],
  },
  links: [{
    rel: 'self',
    href: 'http://localhost:8000/api/v1/rs-dam/models/attributes/7',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/attributes/7',
    },
  }, {
    rel: 'update',
    href: 'http://localhost:8000/api/v1/rs-dam/models/attributes/7',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/attributes/7',
    },
  }, {
    rel: 'delete',
    href: 'http://localhost:8000/api/v1/rs-dam/models/attributes/7',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/attributes/7',
    },
  }, {
    rel: 'list',
    href: 'http://localhost:8000/api/v1/rs-dam/models/attributes',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/attributes',
    },
  }],
}, {
  content: {
    id: 8,
    name: 'MyJSONAttribute',
    description: 'Here is a description',
    label: 'Here is a label',
    jsonPath: 'properties.MyJSONAttribute',
    type: 'JSON',
    fragment: {
      id: 1,
      name: 'default',
      description: 'This is a fragment containing a lot of attributes',
    },
    alterable: true,
    optional: true,
    indexed: true,
    esMapping: undefined,
    restriction: {
      id: 126,
      jsonSchema: '{\n    "test":"test"\n}',
      type: 'JSON_SCHEMA',
    },
    properties: [],
  },
  links: [{
    rel: 'self',
    href: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    },
  }, {
    rel: 'update',
    href: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    },
  }, {
    rel: 'delete',
    href: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    },
  }, {
    rel: 'list',
    href: 'http://localhost:8000/api/v1/rs-dam/models/attributes',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/attributes',
    },
  }],
}, {
  content: {
    id: 59,
    name: 'MyJSONAttribute',
    description: 'Here is a description',
    label: 'Here is a label',
    jsonPath: 'properties.MyJSONAttribute',
    type: 'JSON',
    fragment: {
      id: 1,
      name: 'default',
      description: 'This is a fragment containing a lot of attributes',
    },
    alterable: true,
    optional: true,
    indexed: undefined,
    esMapping: '',
    restriction: {
      id: 126,
      jsonSchema: '{\n    "test":"test"\n}',
      type: 'JSON_SCHEMA',
    },
    properties: [],
  },
  links: [{
    rel: 'self',
    href: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    },
  }, {
    rel: 'update',
    href: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    },
  }, {
    rel: 'delete',
    href: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/attributes/1',
    },
  }, {
    rel: 'list',
    href: 'http://localhost:8000/api/v1/rs-dam/models/attributes',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/attributes',
    },
  }],
}]
