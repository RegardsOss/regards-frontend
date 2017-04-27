export default [{
  content: {
    id: 1,
    name: 'Deuxieme Modele',
    description: 'Description du deuxieme modele de jeux de données',
    type: 'DATASET',
  },
  links: [{
    rel: 'self',
    href: 'http://localhost:8000/api/v1/rs-dam/models/1',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/1',
    },
  }, {
    rel: 'update',
    href: 'http://localhost:8000/api/v1/rs-dam/models/1',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/1',
    },
  }, {
    rel: 'delete',
    href: 'http://localhost:8000/api/v1/rs-dam/models/1',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost:8000/api/v1/rs-dam/models/1',
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
