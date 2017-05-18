/**
 * LICENSE_PLACEHOLDER
 **/
export default {
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
      },
      links: [],
    },
  ],
  metadata: {
    number: 0,
    size: 10,
    totalElements: 1,
  },
  links: [],
}
