export default {
  content: [
    {
      content: {
        id: 1,
        name: 'menu',
        description: 'Header menu module',
        applicationId: 'user',
        container: 'header',
        active: true,
        conf: {
          title: 'Regards user interface',
          displayAuthentication: true,
          displayLocaleSelector: true,
          displayThemeSelector: true,
        },
      },
      links: [],
    },
    {
      content: {
        active: true,
        name: 'news',
        description: 'Flux atom',
        container: 'content',
        applicationId: 'user',
        id: 6,
      },
      links: [],
    },
    {
      content: {
        id: 7,
        applicationId: 'user',
        active: true,
        name: 'form',
        description: 'Recherche avec layout',
        container: 'content',
        conf: {
          resultType: 'dataobjects',
          layout: '{\n  "id": "main",\n  "type": "FormMainContainer",\n  "classes": [],\n  "styles": {},\n  "containers": [{\n    "id": "row",\n    "type": "RowContainer",\n    "classes": [],\n    "styles": {"minHeight":"50px","backgroundColor":"Red"},\n    "containers": [{\n      "id": "block1",\n      "type": "LargeColumnContainer",\n      "classes": [],\n      "styles": {"minHeight":"50px","backgroundColor":"White"},\n      "containers": []\n    }, {\n      "id": "block2",\n      "type": "SmallColumnContainer",\n      "classes": [],\n      "styles": {"minHeight":"50px","backgroundColor":"White"},\n      "containers": []\n    }]\n  }, {\n    "id": "row2",\n    "type": "RowContainer",\n    "styles": {"minHeight":"50px","backgroundColor":"Blue"},\n    "classes": [],\n    "containers": [{\n      "id": "block21",\n      "type": "SmallColumnContainer",\n      "classes": [],\n      "styles": {"minHeight":"50px","backgroundColor":"White"},\n      "containers": []\n    }, {\n      "id": "block22",\n      "type": "LargeColumnContainer",\n      "classes": [],\n      "styles": {"minHeight":"50px","backgroundColor":"White"},\n      "containers": []\n    }]\n  }]\n}\n',
          datasets: {
            type: 'selectedDatasets',
            selectedDatasets: [
              1,
              3,
              5,
              19,
              16,
              21,
            ],
          },
        },
      },
      links: [],
    },
    {
      content: {
        active: true,
        conf: {
          layout: '{\n    "id": "main",\n    "type": "FormMainContainer",\n    "classes": [],\n    "styles": {},\n    "containers": []\n}',
          datasets: {
            type: 'selectedDatasets',
            selectedDatasets: [
              1,
              2,
              3,
            ],
          },
          criterion: [
            {
              pluginId: 1,
              container: 'main',
              pluginConf: {
                attributes: {
                  searchField: 0,
                },
              },
            },
            {
              pluginId: 1,
              container: 'main',
              pluginConf: {
                attributes: {
                  searchField: 1,
                },
              },
            },
          ],
        },
        name: 'form',
        description: 'Recherche simple',
        container: 'content',
        applicationId: 'user',
        id: 8,
      },
      links: [],
    },
    {
      content: {
        active: true,
        conf: {},
        name: 'archival-storage-plugins-monitoring',
        description: 'Storage plugins overview',
        container: 'content',
        applicationId: 'user',
        id: 9,
      },
      links: [],
    },
  ],
  metadata: {
    number: 5,
    size: 5,
    totalElements: 5,
  },
  links: [],
}
