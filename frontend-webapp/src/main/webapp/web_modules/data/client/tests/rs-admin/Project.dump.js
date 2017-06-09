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
      host: 'http://regards-projet.com'
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
      host: 'http://regards-projet2.com'
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
