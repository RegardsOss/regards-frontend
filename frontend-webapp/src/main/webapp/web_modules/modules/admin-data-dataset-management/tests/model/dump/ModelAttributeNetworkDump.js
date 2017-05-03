export default [
  {
    content: {
      id: 0,
      pos: 0,
      mode: 'GIVEN',
      model: {
        id: 5,
        name: 'Deuxieme Modele',
        description: 'Description du deuxieme modele de jeux de données',
        type: 'DATASET',
      },
      attribute: {
        id: 0,
        name: 'Attribute_0_0',
        label: 'Attribute_0_0',
        description: "Description de l'attribut 0 - 0",
        defaultValue: null,
        type: 'STRING',
        unit: null,
        precision: null,
        arraysize: 0,
        alterable: true,
        optional: false,
        group: 'leGroup',
        fragment: {
          id: 1,
          name: 'Fragment 1',
          description: 'Fragment 1',
        },
      },
    },
    links: [],
  },
  {
    content: {
      id: 1,
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
        name: 'Attribute_4',
        label: 'Attribute_4',
        description: "Description de l'attribut 0 - 0",
        defaultValue: null,
        type: 'STRING',
        unit: null,
        precision: null,
        arraysize: 0,
        alterable: true,
        optional: true,
        group: 'leGroup',
        fragment: {
          id: 2,
          name: 'Fragment 2',
          description: 'Fragment 2',
        },
      },
    },
    links: [],
  },
]

