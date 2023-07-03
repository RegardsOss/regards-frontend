export const moduleDumps1 = {
  1: { // filters : 3 indexed (1 doublon) 1 non indexed 1 LONG //// criteria : 1 group -> 2 indexed 1 non indexed
    content: {
      id: 1,
      type: 'search-results',
      description: 'Catalog',
      applicationId: 'user',
      container: 'page-content-module',
      conf: {
        primaryPane: 'ALWAYS_EXPANDED',
        facets: {
          enabledFor: {
            DATA: true,
            DATASET: true,
          },
          initiallyEnabled: false,
          list: [
            {
              attributes: [
                {
                  name: 'properties.Name',
                },
              ],
              label: {
                en: 'properties.Name',
                fr: 'properties.Name',
              },
            },
            {
              attributes: [
                {
                  name: 'properties.Name',
                },
              ],
              label: {
                en: 'properties.Name',
                fr: 'properties.Name',
              },
            },
            {
              attributes: [
                {
                  name: 'properties.Code',
                },
              ],
              label: {
                en: 'Code',
                fr: 'Code',
              },
            },
            {
              attributes: [
                {
                  name: 'properties.date',
                },
              ],
              label: {
                en: 'date UTC',
                fr: 'date UTC',
              },
            },
            {
              attributes: [
                {
                  name: 'properties.value_l1',
                },
              ],
              label: {
                en: 'value_l1',
                fr: 'value_l1',
              },
            },
          ],
        },
        restrictions: {
          byDataset: {
            type: 'SELECTED_DATASETS',
            selection: [],
          },
          onData: {
            lastVersionOnly: false,
          },
        },
        viewsGroups: {
          DATA: {
            enabled: true,
            tabTitle: {},
            initialMode: 'TABLE',
            enableDownload: false,
            sorting: [
              {
                attributes: [
                  {
                    name: 'label',
                  },
                ],
              },
            ],
            views: {
              TABLE: {
                enabled: true,
                attributes: [
                  {
                    attributes: [
                      {
                        name: 'files',
                      },
                    ],
                    label: {
                      en: 'Thumbnail',
                      fr: 'Vignette',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'label',
                      },
                    ],
                    label: {
                      en: 'Label',
                      fr: 'Libellé',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'providerId',
                      },
                    ],
                    label: {
                      en: 'Provider ID',
                      fr: 'ID fournisseur',
                    },
                  },
                ],
              },
              QUICKLOOK: {
                enabled: true,
                attributes: [
                  {
                    attributes: [
                      {
                        name: 'label',
                      },
                    ],
                    label: {
                      en: 'Label',
                      fr: 'Libellé',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'providerId',
                      },
                    ],
                    label: {
                      en: 'Provider ID',
                      fr: 'ID fournisseur',
                    },
                  },
                ],
              },
              MAP: {
                enabled: false,
                attributes: [],
                initialViewMode: 'MODE_3D',
                mapEngine: 'CESIUM',
                layers: [],
              },
            },
          },
          DATASET: {
            enabled: true,
            tabTitle: {},
            initialMode: 'TABLE',
            sorting: [],
            views: {
              TABLE: {
                enabled: true,
                attributes: [
                  {
                    attributes: [
                      {
                        name: 'label',
                      },
                    ],
                    label: {
                      en: 'Label',
                      fr: 'Libellé',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'providerId',
                      },
                    ],
                    label: {
                      en: 'Provider ID',
                      fr: 'ID fournisseur',
                    },
                  },
                ],
              },
            },
          },
        },
        criteriaGroups: [
          {
            showTitle: true,
            title: {
              en: 'aaa',
              fr: 'aaa',
            },
            criteria: [
              {
                pluginId: 1,
                label: {
                  en: 'aa',
                  fr: 'aa',
                },
                conf: {
                  attributes: {
                    searchField: 'properties.Code',
                  },
                },
              },
              {
                pluginId: 5,
                label: {
                  en: 'aa',
                  fr: 'aa',
                },
                conf: {
                  attributes: {
                    searchField: 'properties.date',
                  },
                },
              },
              {
                pluginId: 3,
                label: {
                  en: 'retygzrt',
                  fr: 'rzthzrth',
                },
                conf: {
                  attributes: {
                    searchField: 'properties.value_l1',
                  },
                },
              },
            ],
          },
        ],
      },
      active: true,
      page: {
        home: false,
        iconType: 'DEFAULT',
        title: {
          en: 'Catalog',
          fr: 'Catalogue',
        },
      },
      confHash: '73d7a145f78808b6df46e0c769dd7f7d211587c14a1794168079f1e2edb14a9a',
    },
    links: [
      {
        rel: 'self',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/2',
      },
      {
        rel: 'update',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/2',
      },
      {
        rel: 'delete',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/2',
      },
    ],
  },
  2: { // filters : none //// criteria : 2 group -> 1st group 1 indexed 1 non indexed -> 2nd group 1 non indexed
    content: {
      id: 2,
      type: 'search-results',
      description: 'Catalog (default)',
      applicationId: 'user',
      container: 'page-content-module',
      conf: {
        primaryPane: 'EXPANDED_COLLAPSIBLE',
        facets: {
          enabledFor: {
            DATA: true,
            DATASET: true,
          },
          initiallyEnabled: true,
          list: [],
        },
        restrictions: {
          byDataset: {
            type: 'NONE',
            selection: [],
          },
          onData: {
            lastVersionOnly: false,
          },
        },
        viewsGroups: {
          DATA: {
            enabled: true,
            tabTitle: {
              en: 'Data',
              fr: 'Données',
            },
            initialMode: 'TABLE',
            enableDownload: true,
            enableRefresh: true,
            sorting: [],
            views: {
              TABLE: {
                enabled: true,
                attributes: [
                  {
                    attributes: [
                      {
                        name: 'files',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'Thumbnail',
                      fr: 'Thumbnail',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'label',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'Label',
                      fr: 'Libellé',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'id',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'Internal ID',
                      fr: 'Identifiant',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'version',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'Version',
                      fr: 'Version',
                    },
                  },
                ],
              },
              QUICKLOOK: {
                enabled: true,
                attributes: [],
              },
              MAP: {
                enabled: true,
                attributes: [],
                backgroundLayer: {
                  url: 'https://c.tile.openstreetmap.org/',
                  type: 'OSM',
                },
                initialViewMode: 'MODE_3D',
                layers: [
                  {
                    enabled: true,
                    background: true,
                    layerViewMode: 'MODE_3D',
                    layerName: 'osm',
                    url: 'https://c.tile.openstreetmap.org/',
                    type: 'OSM',
                  },
                ],
                mapEngine: 'Cesium',
              },
            },
            enableServices: true,
          },
          DATASET: {
            enabled: true,
            tabTitle: {
              en: 'Datasets',
              fr: 'Jeux de données',
            },
            initialMode: 'TABLE',
            enableRefresh: false,
            sorting: [],
            views: {
              TABLE: {
                enabled: true,
                attributes: [
                  {
                    attributes: [
                      {
                        name: 'label',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'Libellé',
                      fr: 'Label',
                    },
                  },
                ],
              },
            },
          },
        },
        criteriaGroups: [
          {
            showTitle: true,
            title: {
              en: '1stGroup',
              fr: '1stGroup',
            },
            criteria: [
              {
                pluginId: 2,
                label: {
                  en: 'Search for',
                  fr: 'Que recherchez vous ?',
                },
                conf: {
                  attributes: {
                    searchField: 'properties.Code',
                  },
                },
              },
              {
                pluginId: 3,
                label: {
                  en: 'azeaze',
                  fr: 'azezez',
                },
                conf: {
                  attributes: {
                    searchField: 'properties.count',
                  },
                },
              },
            ],
          },
          {
            showTitle: true,
            title: {
              en: '2ndGroup',
              fr: '2ndGroup',
            },
            criteria: [
              {
                pluginId: 2,
                label: {
                  en: 'Search for',
                  fr: 'Que recherchez vous ?',
                },
                conf: {
                  attributes: {
                    searchField: 'properties.count',
                  },
                },
              },
            ],
          },
        ],
      },
      active: true,
      page: {
        home: false,
        iconType: 'DEFAULT',
        title: {
          en: 'Catalog (default)',
          fr: 'Catalogue (default)',
        },
      },
      confHash: '0b72357a499eef6ff1cab6619b4794dc2c9b6f7351fa68319a799589cfc83041',
    },
    links: [
      {
        rel: 'self',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/4',
      },
      {
        rel: 'update',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/4',
      },
      {
        rel: 'delete',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/4',
      },
    ],
  },
  3: { // filters : none //// criteria : none ->>>> ignore module
    content: {
      id: 3,
      type: 'search-results',
      description: 'Catalogue de données - rendu',
      applicationId: 'user',
      container: 'page-content-module',
      conf: {
        primaryPane: 'EXPANDED_COLLAPSIBLE',
        facets: {
          enabledFor: {
            DATA: true,
            DATASET: true,
          },
          initiallyEnabled: true,
          list: [],
        },
        restrictions: {
          byDataset: {
            type: 'SELECTED_DATASETS',
            selection: [
              'URN:AIP:DATASET:ssalto:9d50ea54-a58a-46d7-9dd0-c7f0666b4800:V1',
            ],
          },
          onData: {
            lastVersionOnly: false,
          },
        },
        viewsGroups: {
          DATA: {
            enabled: true,
            tabTitle: {},
            initialMode: 'TABLE',
            enableDownload: false,
            enableRefresh: false,
            sorting: [],
            views: {
              TABLE: {
                enabled: true,
                attributes: [
                  {
                    attributes: [
                      {
                        name: 'properties.date',
                        renderer: 'time',
                      },
                    ],
                    label: {
                      en: 'Time',
                      fr: 'Temps',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'properties.date',
                        renderer: 'timeWithMilliseconds',
                      },
                    ],
                    label: {
                      en: 'Accurate time',
                      fr: 'Temps précis',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'properties.date',
                        renderer: 'date',
                      },
                    ],
                    label: {
                      en: 'Date',
                      fr: 'Date',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'properties.date',
                        renderer: 'dateWithMinutes',
                      },
                    ],
                    label: {
                      en: 'Date and minutes',
                      fr: 'Date et minutes',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'properties.date',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'Dateand seconds',
                      fr: 'Date et secondes',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'properties.date',
                        renderer: 'dateWithMilliseconds',
                      },
                    ],
                    label: {
                      en: 'Accurate date',
                      fr: 'Date précise',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'properties.date',
                        renderer: 'dateIso',
                      },
                    ],
                    label: {
                      en: 'ISO Date',
                      fr: 'Date ISO',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'id',
                        renderer: 'multiline',
                      },
                    ],
                    label: {
                      en: 'Internal ID',
                      fr: 'ID interne',
                    },
                  },
                ],
              },
              QUICKLOOK: {
                enabled: true,
                attributes: [
                  {
                    attributes: [
                      {
                        name: 'properties.date',
                        renderer: 'dateWithMilliseconds',
                      },
                    ],
                    label: {
                      en: 'Accurate date',
                      fr: 'Date précise',
                    },
                  },
                ],
              },
              MAP: {
                enabled: false,
                attributes: [],
                mapEngine: 'CESIUM',
                layers: [
                  {
                    layerName: 'Layer',
                    enabled: false,
                    background: false,
                    layerViewMode: 'MODE_3D',
                    url: null,
                  },
                ],
              },
            },
          },
          DATASET: {
            enabled: true,
            tabTitle: {},
            initialMode: 'TABLE',
            enableRefresh: false,
            sorting: [],
            views: {
              TABLE: {
                enabled: true,
                attributes: [
                  {
                    attributes: [
                      {
                        name: 'properties.testUrl',
                        renderer: 'renderImage',
                      },
                    ],
                    label: {
                      en: 'testUrl',
                      fr: 'testUrl',
                    },
                  },
                ],
              },
            },
          },
        },
        criteriaGroups: [],
      },
      active: true,
      page: {
        home: false,
        iconType: 'DEFAULT',
        title: {
          en: 'Renderer test',
          fr: 'Test de rendu',
        },
      },
      confHash: '363d60f10e3799cb556baba91f8acf7c52b70e35df44ac83462f4808c896f165',
    },
    links: [
      {
        rel: 'self',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/7',
      },
      {
        rel: 'update',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/7',
      },
      {
        rel: 'delete',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/7',
      },
    ],
  },
  4: { // filters : 0 indexed 1 non indexed 1 LONG /// criteria : none ->>>> ignore module
    content: {
      id: 4,
      type: 'search-results',
      description: 'Catalog-REGARDS-2083',
      applicationId: 'user',
      container: 'page-content-module',
      conf: {
        primaryPane: 'EXPANDED_COLLAPSIBLE',
        facets: {
          enabledFor: {
            DATA: true,
            DATASET: true,
          },
          initiallyEnabled: true,
          list: [
            {
              attributes: [
                {
                  name: 'properties.FileSize',
                  renderer: 'defaultRenderer',
                },
              ],
              label: {
                en: 'FileSize',
                fr: 'FileSize',
              },
            },
          ],
        },
        restrictions: {
          byDataset: {
            type: 'SELECTED_DATASETS',
            selection: [
              'URN:AIP:DATASET:ssalto:d0a526a7-0696-465b-be81-69378cb51cf8:V1',
              'URN:AIP:DATASET:ssalto:cd2d7f7e-27d6-4c05-acbb-ce555670765f:V1',
              'URN:AIP:DATASET:ssalto:5bfd0847-f9fe-41f7-92c5-bebdeb652898:V1',
              'URN:AIP:DATASET:ssalto:4fa84664-8dd4-4941-886a-faee6e602952:V1',
            ],
          },
          onData: {
            lastVersionOnly: false,
          },
        },
        viewsGroups: {
          DATA: {
            enabled: true,
            tabTitle: {
              en: 'DATA',
              fr: 'DONNEES',
            },
            initialMode: 'TABLE',
            enableDownload: true,
            enableRefresh: false,
            sorting: [
              {
                attributes: [
                  {
                    name: 'label',
                    renderer: 'defaultRenderer',
                  },
                ],
              },
            ],
            views: {
              TABLE: {
                enabled: true,
                attributes: [
                  {
                    attributes: [
                      {
                        name: 'files',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'Thumbnail',
                      fr: 'Vignette',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'label',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'Label',
                      fr: 'Libellé',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'properties.weight',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'Weight',
                      fr: 'Poids',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'properties.date',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'Date',
                      fr: 'Date',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'properties.description',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'Description',
                      fr: 'Description',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'properties.value_l1',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'Integer',
                      fr: 'Entier',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'properties.value_d1',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'Float',
                      fr: 'Flottant',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'properties.fragment1.state',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'State',
                      fr: 'Etat',
                    },
                  },
                ],
              },
              QUICKLOOK: {
                enabled: false,
                attributes: [],
              },
              MAP: {
                enabled: false,
                attributes: [],
                mapEngine: 'CESIUM',
                layers: [
                  {
                    layerName: 'Layer',
                    enabled: false,
                    background: false,
                    layerViewMode: 'MODE_3D',
                    url: null,
                  },
                ],
              },
            },
            enableServices: true,
          },
          DATASET: {
            enabled: true,
            tabTitle: {},
            initialMode: 'TABLE',
            enableRefresh: false,
            sorting: [],
            views: {
              TABLE: {
                enabled: true,
                attributes: [
                  {
                    attributes: [
                      {
                        name: 'label',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'Label',
                      fr: 'Libellé',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'properties.start_date',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'Start',
                      fr: 'Début',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'properties.end_date',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'End',
                      fr: 'Fin',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'properties.values_l1_sum',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'Integer sum',
                      fr: 'Somme entière',
                    },
                  },
                  {
                    attributes: [
                      {
                        name: 'properties.count',
                        renderer: 'defaultRenderer',
                      },
                    ],
                    label: {
                      en: 'Count',
                      fr: 'Compte',
                    },
                  },
                ],
              },
            },
          },
        },
        criteriaGroups: [],
      },
      active: true,
      page: {
        home: false,
        iconType: 'DEFAULT',
        title: {
          en: 'Catalog REGARDS-2083',
          fr: 'Catalogue REGARDS-2083',
        },
      },
      confHash: 'f25230c91ac5026560f69fe5e31594449a2114da56d383e883fd9bd6b23b92f5',
    },
    links: [
      {
        rel: 'self',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/52',
      },
      {
        rel: 'update',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/52',
      },
      {
        rel: 'delete',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/52',
      },
    ],
  },
  5: { // two temporal filters
    content: {
      id: 5,
      type: 'search-results',
      description: 'Catalog (default)',
      applicationId: 'user',
      container: 'page-content-module',
      conf: {
        primaryPane: 'EXPANDED_COLLAPSIBLE',
        facets: { enabledFor: { DATA: true, DATASET: true }, initiallyEnabled: true, list: [] },
        restrictions: { byDataset: { type: 'NONE', selection: [] }, onData: { lastVersionOnly: false } },
        viewsGroups: {
          DATA: {
            enabled: true,
            tabTitle: { en: 'Data', fr: 'Données' },
            initialMode: 'TABLE',
            enableDownload: true,
            enableRefresh: true,
            sorting: [],
            views: {
              TABLE: { enabled: true, attributes: [{ attributes: [{ name: 'files', renderer: 'defaultRenderer' }], label: { en: 'Thumbnail', fr: 'Thumbnail' } }, { attributes: [{ name: 'label', renderer: 'defaultRenderer' }], label: { en: 'Label', fr: 'Libellé' } }, { attributes: [{ name: 'id', renderer: 'defaultRenderer' }], label: { en: 'Internal ID', fr: 'Identifiant' } }, { attributes: [{ name: 'version', renderer: 'defaultRenderer' }], label: { en: 'Version', fr: 'Version' } }] },
              QUICKLOOK: { enabled: true, attributes: [] },
              MAP: {
                enabled: true,
                attributes: [],
                backgroundLayer: { url: 'https://c.tile.openstreetmap.org/', type: 'OSM' },
                initialViewMode: 'MODE_3D',
                layers: [{
                  enabled: true, background: true, layerViewMode: 'MODE_3D', layerName: 'osm', url: 'https://c.tile.openstreetmap.org/', type: 'OSM',
                }],
                mapEngine: 'CESIUM',
              },
            },
            enableServices: true,
          },
          DATASET: {
            enabled: true, tabTitle: { en: 'Datasets', fr: 'Jeux de données' }, initialMode: 'TABLE', enableRefresh: false, sorting: [], views: { TABLE: { enabled: true, attributes: [{ attributes: [{ name: 'label', renderer: 'defaultRenderer' }], label: { en: 'Libellé', fr: 'Label' } }] } },
          },
        },
        criteriaGroups: [{ showTitle: true, title: { en: 'Defaults', fr: 'Standards' }, criteria: [{ pluginId: 6, label: { en: 'Temporal Periode', fr: 'Période temporelle' }, conf: { attributes: { firstField: 'properties.details.start_date', secondField: 'properties.details.end_date' } } }] }],
      },
      active: true,
      page: { home: false, iconType: 'DEFAULT', title: { en: 'Catalog (default)', fr: 'Catalogue (default)' } },
      confHash: '45454dsfdsfdsf',
    },
    links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/54' }, { rel: 'update', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/54' }, { rel: 'delete', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/54' }],
  },
}

export const attrDumps1 = {
  1: { // indexed
    content: {
      id: 1,
      name: 'Name',
      type: 'STRING',
      unit: 'unitless',
      fragment: {
        id: 1,
        name: 'default',
        description: 'Default fragment',
        virtual: false,
      },
      alterable: true,
      optional: false,
      indexed: true,
      label: 'name attribute',
      properties: [],
      dynamic: true,
      internal: false,
      jsonPath: 'properties.Name',
      virtual: false,
    },
    links: [
      {
        rel: 'self',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/1',
      },
      {
        rel: 'update',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/1',
      },
      {
        rel: 'list',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes{?type,fragmentName,modelNames,noLink}',
      },
    ],
  },
  2: {
    content: {
      id: 2,
      name: 'FileSize',
      description: 'File size',
      type: 'LONG',
      unit: 'octet',
      fragment: {
        id: 1,
        name: 'default',
        description: 'Default fragment',
        virtual: false,
      },
      alterable: true,
      optional: false,
      indexed: false,
      label: 'File size',
      properties: [],
      dynamic: true,
      internal: false,
      jsonPath: 'properties.FileSize',
      virtual: false,
    },
    links: [
      {
        rel: 'self',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/2',
      },
      {
        rel: 'update',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/2',
      },
      {
        rel: 'list',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes{?type,fragmentName,modelNames,noLink}',
      },
    ],
  },
  3: { // indexed
    content: {
      id: 3,
      name: 'Code',
      type: 'STRING',
      unit: 'unitless',
      fragment: {
        id: 1,
        name: 'default',
        description: 'Default fragment',
        virtual: false,
      },
      alterable: true,
      optional: false,
      indexed: true,
      label: 'Code',
      properties: [],
      dynamic: true,
      internal: false,
      jsonPath: 'properties.Code',
      virtual: false,
    },
    links: [
      {
        rel: 'self',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/3',
      },
      {
        rel: 'update',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/3',
      },
      {
        rel: 'list',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes{?type,fragmentName,modelNames,noLink}',
      },
    ],
  },
  4: {
    content: {
      id: 4,
      name: 'count',
      type: 'LONG',
      unit: 'unitless',
      fragment: {
        id: 1,
        name: 'default',
        description: 'Default fragment',
        virtual: false,
      },
      alterable: true,
      optional: false,
      indexed: false,
      label: 'number of data',
      properties: [],
      dynamic: true,
      internal: false,
      jsonPath: 'properties.count',
      virtual: false,
    },
    links: [
      {
        rel: 'self',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/4',
      },
      {
        rel: 'update',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/4',
      },
      {
        rel: 'list',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes{?type,fragmentName,modelNames,noLink}',
      },
    ],
  },
  5: { // indexed
    content: {
      id: 5,
      name: 'date',
      type: 'DATE_ISO8601',
      unit: 'unitless',
      fragment: {
        id: 1,
        name: 'default',
        description: 'Default fragment',
        virtual: false,
      },
      alterable: true,
      optional: false,
      indexed: true,
      label: 'date UTC',
      properties: [],
      dynamic: true,
      internal: false,
      jsonPath: 'properties.date',
      virtual: false,
    },
    links: [
      {
        rel: 'self',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/5',
      },
      {
        rel: 'update',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/5',
      },
      {
        rel: 'list',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes{?type,fragmentName,modelNames,noLink}',
      },
    ],
  },
  6: { // indexed
    content: {
      id: 6,
      name: 'description',
      type: 'STRING',
      unit: 'unitless',
      fragment: {
        id: 1,
        name: 'default',
        description: 'Default fragment',
        virtual: false,
      },
      alterable: true,
      optional: true,
      indexed: true,
      label: 'description',
      properties: [],
      dynamic: true,
      internal: false,
      jsonPath: 'properties.description',
      virtual: false,
    },
    links: [
      {
        rel: 'self',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/6',
      },
      {
        rel: 'update',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/6',
      },
      {
        rel: 'list',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes{?type,fragmentName,modelNames,noLink}',
      },
    ],
  },
  7: {
    content: {
      id: 7,
      name: 'value_l1',
      type: 'LONG',
      unit: 'unitless',
      fragment: {
        id: 1,
        name: 'default',
        description: 'Default fragment',
        virtual: false,
      },
      alterable: true,
      optional: false,
      indexed: false,
      label: 'long value',
      properties: [],
      dynamic: true,
      internal: false,
      jsonPath: 'properties.value_l1',
      virtual: false,
    },
    links: [
      {
        rel: 'self',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/7',
      },
      {
        rel: 'update',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/7',
      },
      {
        rel: 'list',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes{?type,fragmentName,modelNames,noLink}',
      },
    ],
  },
  8: {
    content: {
      id: 8,
      name: 'data_size',
      type: 'LONG',
      unit: 'kb',
      fragment: {
        id: 1,
        name: 'default',
        description: 'Default fragment',
        virtual: false,
      },
      alterable: true,
      optional: false,
      indexed: false,
      label: "taille de l'objet",
      properties: [],
      dynamic: true,
      internal: false,
      jsonPath: 'properties.data_size',
      virtual: false,
    },
    links: [
      {
        rel: 'self',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/8',
      },
      {
        rel: 'update',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/8',
      },
      {
        rel: 'list',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes{?type,fragmentName,modelNames,noLink}',
      },
    ],
  },
  9: { // not indexed
    content: {
      id: 9,
      name: 'start_date',
      type: 'DATE_ISO8601',
      unit: 'unitless',
      fragment: {
        id: 53,
        name: 'details',
        virtual: false,
      },
      alterable: true,
      optional: false,
      indexed: false,
      label: 'start date',
      properties: [],
      dynamic: true,
      internal: false,
      jsonPath: 'properties.details.start_date',
      virtual: false,
    },
    links: [
      {
        rel: 'self',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/5',
      },
      {
        rel: 'update',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/5',
      },
      {
        rel: 'list',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes{?type,fragmentName,modelNames,noLink}',
      },
    ],
  },
  10: { // not indexed
    content: {
      id: 10,
      name: 'end_date',
      type: 'DATE_ISO8601',
      unit: 'unitless',
      fragment: {
        id: 53,
        name: 'details',
        virtual: false,
      },
      alterable: true,
      optional: false,
      indexed: false,
      label: 'end date',
      properties: [],
      dynamic: true,
      internal: false,
      jsonPath: 'properties.details.end_date',
      virtual: false,
    },
    links: [
      {
        rel: 'self',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/5',
      },
      {
        rel: 'update',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes/5',
      },
      {
        rel: 'list',
        href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-dam-public/models/attributes{?type,fragmentName,modelNames,noLink}',
      },
    ],
  },
}
