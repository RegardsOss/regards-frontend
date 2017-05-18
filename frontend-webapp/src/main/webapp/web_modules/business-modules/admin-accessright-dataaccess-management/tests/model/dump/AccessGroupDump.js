export default {
  AG1: {
    content: {
      id: 1,
      name: 'AG1',
      users: [{
        email: 'florian.philippot@facholand.fr',
      }],
      accessRights: [{
        qualityFilter: {
          maxScore: '10',
          minScore: '0',
          qualityLevel: 'ACCEPTED',
        },
        dataAccessRight: {
          dataAccessLevel: 'INHERITED_ACCESS',
        },
        accessLevel: 'FULL_ACCESS',
        dataSet: {
          id: 1,
          label: 'PremierDataSet',
          type: 'DATASET',
          model: {
            id: 2,
            name: 'Premier Modele',
            descirption: 'Description du premier modele de jeux de données',
            type: 'DATASET',
          },
        },
        id: 1,
      }, {
        qualityFilter: {
          maxScore: '10',
          minScore: '0',
          qualityLevel: 'ACCEPTED',
        },
        dataAccessRight: {
          dataAccessLevel: 'INHERITED_ACCESS',
        },
        accessLevel: 'FULL_ACCESS',
        dataSet: {
          id: 4,
          label: 'QuatriemDataSet',
          type: 'DATASET',
          model: {
            id: 2,
            name: 'Premier Modele',
            descirption: 'Description du premier modele de jeux de données',
            type: 'DATASET',
          },
        },
        id: 2,
      }, {
        qualityFilter: {
          maxScore: '10',
          minScore: '0',
          qualityLevel: 'ACCEPTED',
        },
        dataAccessRight: {
          dataAccessLevel: 'INHERITED_ACCESS',
        },
        accessLevel: 'FULL_ACCESS',
        dataSet: {
          id: 3,
          label: 'TroisiemeDataSet',
          type: 'DATASET',
          model: {
            id: 2,
            name: 'Premier Modele',
            descirption: 'Description du premier modele de jeux de données',
            type: 'DATASET',
          },
        },
        id: 3,
      }, {
        qualityFilter: {
          maxScore: '6',
          minScore: '4',
          qualityLevel: 'REJECTED',
        },
        dataAccessRight: {
          dataAccessLevel: 'CUSTOM_ACCESS',
          pluginConfiguration: 40,
        },
        accessLevel: 'NO_ACCESS',
        dataSet: {
          id: 5,
          label: 'CinquiemeDataSet',
          type: 'DATASET',
          model: {
            id: 2,
            name: 'Premier Modeleee',
            descirption: 'Description du premier modele de jeux de données',
            type: 'DATASET',
          },
        },
        id: 4,
      }],
      isPrivate: true,
    },
    links: [],
  },
  AG2: {
    content: {
      id: 2,
      name: 'AG2',
      users: [],
      accessRights: [],
      isPrivate: true,
    },
    links: [],
  },
}
