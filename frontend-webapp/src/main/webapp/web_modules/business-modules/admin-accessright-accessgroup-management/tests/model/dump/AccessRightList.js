export default {
  metadata: {
    size: 20,
    totalElements: 2,
    totalPages: 1,
    number: 0,
  },
  content: [{
    content: {
      user: {
        email: 'user1@user1.user1',
      },
      id: 72,
      qualityFilter: {
        maxScore: 10,
        minScore: 0,
        qualityLevel: 'ACCEPTED',
      },
      accessLevel: 'FULL_ACCES',
      dataSet: {
        type: 'DATASET',
        score: 0,
        lastUpdate: '2017-02-07T10:46:44.625',
        creationDate: '2017-02-07T10:46:44.625',
        id: 2662,
        ipId: {
          oaisIdentifier: 'AIP',
          entityType: 'DATASET',
          tenant: 'PROJECT',
          entityId: 'cb42c133-923b-43e9-92eb-ab93df41ea34',
          version: 1,
        },
        label: 'DS1',
        description: 'DESC',
        tags: [],
        model: {
          id: 3007,
          name: 'model1',
          description: 'desc',
          type: 'DATASET',
        },
      },
    },
    links: [{
      rel: 'self',
      href: 'http://localhost/accessrights/72',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://localhost/accessrights/72',
      },
    }],
  }, {
    content: {
      user: {
        email: 'user1@user1.user1',
      },
      id: 73,
      qualityFilter: {
        maxScore: 10,
        minScore: 0,
        qualityLevel: 'ACCEPTED',
      },
      accessLevel: 'FULL_ACCES',
      dataSet: {
        type: 'DATASET',
        score: 0,
        lastUpdate: '2017-02-07T10:46:44.626',
        creationDate: '2017-02-07T10:46:44.626',
        id: 2663,
        ipId: {
          oaisIdentifier: 'AIP',
          entityType: 'DATASET',
          tenant: 'PROJECT',
          entityId: '9b255111-dccb-40bc-8514-c4ff06bbdd20',
          version: 1,
        },
        label: 'DS2',
        tags: [],
        model: {
          id: 3007,
          name: 'model1',
          description: 'desc',
          type: 'DATASET',
        },
      },
    },
    links: [{
      rel: 'self',
      href: 'http://localhost/accessrights/73',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://localhost/accessrights/73',
      },
    }],
  }],
  links: [{
    rel: 'self',
    href: 'http://localhost/accessrights',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://localhost/accessrights',
    },
  }],
}
