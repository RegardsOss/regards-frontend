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
}]
