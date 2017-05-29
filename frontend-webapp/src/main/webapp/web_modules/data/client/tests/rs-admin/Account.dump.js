export default {
  metadata: {
    size: 2000,
    totalElements: 2,
    totalPages: 1,
    number: 0,
  },
  content: [{
    content: {
      id: 1,
      email: 'regards-admin@c-s.fr',
      firstName: 'regards-admin@c-s.fr',
      lastName: 'regards-admin@c-s.fr',
      invalidityDate: {
        date: {
          year: 2017,
          month: 6,
          day: 22,
        },
        time: {
          hour: 9,
          minute: 5,
          second: 29,
          nano: 219000000,
        },
      },
      external: false,
      authenticationFailedCounter: 3,
      passwordUpdateDate: {
        date: {
          year: 2017,
          month: 5,
          day: 23,
        },
        time: {
          hour: 9,
          minute: 5,
          second: 29,
          nano: 219000000,
        },
      },
      status: 'ACTIVE',
    },
    links: [{
      rel: 'self',
      href: 'http://172.26.47.52:9000/api/v1/rs-admin/accounts/1',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://172.26.47.52:9000/api/v1/rs-admin/accounts/1',
      },
    }, {
      rel: 'update',
      href: 'http://172.26.47.52:9000/api/v1/rs-admin/accounts/1',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://172.26.47.52:9000/api/v1/rs-admin/accounts/1',
      },
    }, {
      rel: 'inactive',
      href: 'http://172.26.47.52:9000/api/v1/rs-admin/accounts/regards-admin@c-s.fr/inactive',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://172.26.47.52:9000/api/v1/rs-admin/accounts/regards-admin@c-s.fr/inactive',
      },
    }],
  }, {
    content: {
      id: 2,
      email: 'claire.wozniak@c-s.fr',
      firstName: 'claire',
      lastName: 'wozniak',
      invalidityDate: {
        date: {
          year: 2017,
          month: 6,
          day: 22,
        },
        time: {
          hour: 10,
          minute: 5,
          second: 53,
          nano: 750000000,
        },
      },
      external: false,
      authenticationFailedCounter: 0,
      passwordUpdateDate: {
        date: {
          year: 2017,
          month: 5,
          day: 23,
        },
        time: {
          hour: 10,
          minute: 5,
          second: 53,
          nano: 750000000,
        },
      },
      status: 'ACTIVE',
    },
    links: [{
      rel: 'self',
      href: 'http://172.26.47.52:9000/api/v1/rs-admin/accounts/2',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://172.26.47.52:9000/api/v1/rs-admin/accounts/2',
      },
    }, {
      rel: 'update',
      href: 'http://172.26.47.52:9000/api/v1/rs-admin/accounts/2',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://172.26.47.52:9000/api/v1/rs-admin/accounts/2',
      },
    }, {
      rel: 'delete',
      href: 'http://172.26.47.52:9000/api/v1/rs-admin/accounts/2',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://172.26.47.52:9000/api/v1/rs-admin/accounts/2',
      },
    }, {
      rel: 'inactive',
      href: 'http://172.26.47.52:9000/api/v1/rs-admin/accounts/claire.wozniak@c-s.fr/inactive',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://172.26.47.52:9000/api/v1/rs-admin/accounts/claire.wozniak@c-s.fr/inactive',
      },
    }],
  }],
  links: [{
    rel: 'self',
    href: 'http://172.26.47.52:9000/api/v1/rs-admin/accounts',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://172.26.47.52:9000/api/v1/rs-admin/accounts',
    },
  }],
}
