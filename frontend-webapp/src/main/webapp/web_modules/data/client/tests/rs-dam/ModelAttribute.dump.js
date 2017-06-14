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
