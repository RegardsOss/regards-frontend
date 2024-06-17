export default {
  1: {
    content: {
      id: 1,
      type: 'menu',
      description: 'ssalto menu',
      applicationId: 'user',
      container: 'page-top-header',
      conf: {
        home: { title: { en: 'Home page', fr: "Page d'accueil" }, icon: { type: 'DEFAULT_HOME_ICON' } }, displayAuthentication: true, displayCartSelector: true, displayNotificationsSelector: true, displayLocaleSelector: true, displayThemeSelector: true, navigation: [], contacts: 'regards@no-reply.com', projectAboutPage: 'https://regardsoss.github.io/',
      },
      active: true,
      confHash: '0eacc58ab1bb7983b394c30a72252d9d855724ba7190ac6913c50f457fc5ad1c',
    },
    links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/1' }, { rel: 'update', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/1' }, { rel: 'delete', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/1' }],
  },
  2: {
    content: {
      id: 2,
      type: 'search-results',
      description: 'Catalog',
      applicationId: 'user',
      container: 'page-content-module',
      conf: {
        primaryPane: 'ALWAYS_EXPANDED',
        facets: { enabledFor: { DATA: true, DATASET: true }, initiallyEnabled: true, list: [] },
        restrictions: { byDataset: { type: 'NONE', selection: [] }, onData: { lastVersionOnly: false } },
        viewsGroups: {
          DATA: {
            enabled: true,
            tabTitle: {},
            initialMode: 'TABLE',
            enableDownload: false,
            sorting: [{ attributes: [{ name: 'label' }] }],
            views: {
              TABLE: { enabled: true, attributes: [{ attributes: [{ name: 'files' }], label: { en: 'Thumbnail', fr: 'Vignette' } }, { attributes: [{ name: 'label' }], label: { en: 'Label', fr: 'Libellé' } }, { attributes: [{ name: 'providerId' }], label: { en: 'Provider ID', fr: 'ID fournisseur' } }] },
              QUICKLOOK: { enabled: true, attributes: [{ attributes: [{ name: 'label' }], label: { en: 'Label', fr: 'Libellé' } }, { attributes: [{ name: 'providerId' }], label: { en: 'Provider ID', fr: 'ID fournisseur' } }] },
              MAP: {
                enabled: false, attributes: [], initialViewMode: 'MODE_3D', mapEngine: 'CESIUM', layers: [],
              },
            },
          },
          DATASET: {
            enabled: true, tabTitle: {}, initialMode: 'TABLE', sorting: [], views: { TABLE: { enabled: true, attributes: [{ attributes: [{ name: 'label' }], label: { en: 'Label', fr: 'Libellé' } }, { attributes: [{ name: 'providerId' }], label: { en: 'Provider ID', fr: 'ID fournisseur' } }] } },
          },
        },
        criteriaGroups: [],
      },
      active: true,
      page: { home: false, iconType: 'DEFAULT', title: { en: 'Catalog', fr: 'Catalogue' } },
      confHash: '73ee6f7c93f001efae4488c7f8035b02d72de65ee9fa5bf50025e614fa935a60',
    },
    links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/2' }, { rel: 'update', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/2' }, { rel: 'delete', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/2' }],
  },
  3: {
    content: {
      id: 3,
      type: 'description',
      description: 'Entities description',
      applicationId: 'user',
      container: 'page-top-header',
      conf: {
        allowSearching: true,
        DATA: {
          showDescription: true, showTags: true, showCoupling: true, showLinkedDocuments: true, showLinkedEntities: true, showOtherVersions: false, showThumbnail: true, showQuicklooks: true, groups: [{ showTitle: false, title: { en: '', fr: '' }, elements: [{ attributes: [{ name: 'label' }], label: { en: 'Label', fr: 'Libellé' } }, { attributes: [{ name: 'providerId' }], label: { en: 'Provider ID', fr: 'ID fournisseur' } }] }], attributeToDescriptionFiles: [], hideEmptyAttributes: false,
        },
        DATASET: {
          showDescription: true, showTags: true, showCoupling: true, showLinkedDocuments: true, showLinkedEntities: true, showOtherVersions: false, showThumbnail: false, showQuicklooks: true, groups: [{ showTitle: false, title: { en: '', fr: '' }, elements: [{ attributes: [{ name: 'label' }], label: { en: 'Label', fr: 'Libellé' } }, { attributes: [{ name: 'providerId' }], label: { en: 'Provider ID', fr: 'ID fournisseur' } }] }], attributeToDescriptionFiles: [], hideEmptyAttributes: false,
        },
        COLLECTION: {
          showDescription: true, showTags: true, showCoupling: true, showLinkedDocuments: true, showLinkedEntities: true, showOtherVersions: false, showThumbnail: false, showQuicklooks: true, groups: [{ showTitle: false, title: { en: '', fr: '' }, elements: [{ attributes: [{ name: 'label' }], label: { en: 'Label', fr: 'Libellé' } }, { attributes: [{ name: 'providerId' }], label: { en: 'Provider ID', fr: 'ID fournisseur' } }] }], attributeToDescriptionFiles: [], hideEmptyAttributes: false,
        },
        DOCUMENT: {
          showDescription: true, showTags: true, showCoupling: true, showLinkedDocuments: true, showLinkedEntities: true, showOtherVersions: false, showThumbnail: false, showQuicklooks: true, groups: [{ showTitle: false, title: { en: '', fr: '' }, elements: [{ attributes: [{ name: 'label' }], label: { en: 'Label', fr: 'Libellé' } }, { attributes: [{ name: 'providerId' }], label: { en: 'Provider ID', fr: 'ID fournisseur' } }] }], attributeToDescriptionFiles: [], hideEmptyAttributes: false,
        },
      },
      active: false,
      confHash: '29c36c5057b828e181f81d1d218720e0adb4f6c6a0bfa935409420f7d318a004',
    },
    links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/3' }, { rel: 'update', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/3' }, { rel: 'delete', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/3' }],
  },
  4: {
    content: {
      id: 4,
      type: 'order-cart',
      description: 'Cart',
      applicationId: 'user',
      container: 'page-content-module',
      conf: {
        showDatasets: true, showProcessing: true, showFilters: true, primaryPane: 'EXPANDED_COLLAPSIBLE',
      },
      active: true,
      page: { home: false, iconType: 'DEFAULT', title: { en: 'cart', fr: 'panier' } },
      confHash: '6c5c09cee81521d8744562f6a4593d962ecd5e5aba331d2c723de98175e3ec62',
    },
    links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/4' }, { rel: 'update', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/4' }, { rel: 'delete', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/4' }],
  },
  5: {
    content: {
      id: 5, type: 'order-history', description: 'history', applicationId: 'user', container: 'page-content-module', conf: { primaryPane: 'EXPANDED_COLLAPSIBLE' }, active: true, page: { home: false, iconType: 'DEFAULT', title: { en: 'history', fr: 'history' } }, confHash: '541039ed223b0b4988c92fc30dc51d09c06ee573810ba2eb85db538668986479',
    },
    links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/5' }, { rel: 'update', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/5' }, { rel: 'delete', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/5' }],
  },
  6: {
    content: {
      id: 6,
      type: 'search-results',
      description: 'Departements en A',
      applicationId: 'user',
      container: 'page-content-module',
      conf: {
        primaryPane: 'EXPANDED_COLLAPSIBLE',
        facets: { enabledFor: { DATA: true, DATASET: true }, initiallyEnabled: true, list: [] },
        restrictions: { byDataset: { type: 'SELECTED_DATASETS', selection: ['URN:AIP:DATASET:ssalto:b398f032-b252-4e21-9309-f819402fb899:V1'] }, onData: { lastVersionOnly: false } },
        viewsGroups: {
          DATA: {
            enabled: true,
            tabTitle: {},
            initialMode: 'TABLE',
            enableDownload: false,
            enableRefresh: false,
            sorting: [],
            views: {
              TABLE: { enabled: true, attributes: [{ attributes: [{ name: 'label', renderer: 'defaultRenderer' }, { name: 'properties.Code', renderer: 'defaultRenderer' }, { name: 'files', renderer: 'defaultRenderer' }], label: { en: 'Label, Code, Thumbnail', fr: 'Label, Code, Thumbnail' } }] },
              QUICKLOOK: { enabled: false, attributes: [] },
              MAP: {
                enabled: false,
                attributes: [],
                mapEngine: 'CESIUM',
                layers: [{
                  layerName: 'Layer', enabled: false, background: false, layerViewMode: 'MODE_3D', url: null,
                }],
              },
            },
          },
          DATASET: {
            enabled: false, tabTitle: {}, initialMode: 'TABLE', enableRefresh: false, sorting: [], views: { TABLE: { enabled: true, attributes: [] } },
          },
        },
        criteriaGroups: [],
      },
      active: true,
      page: { home: false, iconType: 'DEFAULT', title: { fr: 'Départements en A', en: 'Departements starting with A' } },
      confHash: '8408ec207816c567ae438c1a85c131c13deb9dd930c58b2363fc8fcc9de2b811',
    },
    links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/6' }, { rel: 'update', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/6' }, { rel: 'delete', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/6' }],
  },
  7: {
    content: {
      id: 7,
      type: 'search-results',
      description: 'searchCool',
      applicationId: 'user',
      container: 'page-content-module',
      conf: {
        primaryPane: 'EXPANDED_COLLAPSIBLE',
        facets: { enabledFor: { DATA: true, DATASET: true }, initiallyEnabled: true, list: [] },
        restrictions: { byDataset: { type: 'SELECTED_DATASETS', selection: ['URN:AIP:DATASET:ssalto:0fe2954e-66b7-48fc-8b30-18c2b2281ec1:V1'] }, onData: { lastVersionOnly: false } },
        viewsGroups: {
          DATA: {
            enabled: true,
            tabTitle: {},
            initialMode: 'TABLE',
            enableDownload: false,
            enableRefresh: false,
            sorting: [],
            views: {
              TABLE: { enabled: true, attributes: [{ attributes: [{ name: 'properties.LabelValue', renderer: 'defaultRenderer' }], label: { en: 'LabelValue', fr: 'LabelValue' } }, { attributes: [{ name: 'properties.DoubleValue', renderer: 'defaultRenderer' }], label: { en: 'DoubleValue', fr: 'DoubleValue' } }, { attributes: [{ name: 'properties.LongValue', renderer: 'defaultRenderer' }], label: { en: 'LongValue', fr: 'LongValue' } }, { attributes: [{ name: 'properties.DateValue', renderer: 'defaultRenderer' }], label: { en: 'DateValue', fr: 'DateValue' } }] },
              QUICKLOOK: { enabled: false, attributes: [] },
              MAP: {
                enabled: false,
                attributes: [],
                mapEngine: 'CESIUM',
                layers: [{
                  layerName: 'Layer', enabled: false, background: false, layerViewMode: 'MODE_3D', url: null,
                }],
              },
            },
            enableServices: false,
          },
          DATASET: {
            enabled: false, tabTitle: {}, initialMode: 'TABLE', enableRefresh: false, sorting: [], views: { TABLE: { enabled: true, attributes: [] } },
          },
        },
        criteriaGroups: [{ showTitle: false, title: { en: '', fr: '' }, criteria: [{ pluginId: 4, label: { en: 'rangeLong', fr: 'rangeLong' }, conf: { attributes: { firstField: 'properties.LongValue', secondField: 'properties.LongValue' } } }] }, { showTitle: false, title: { en: '', fr: '' }, criteria: [{ pluginId: 11, label: { en: 'rz', fr: 'zer' }, conf: { attributes: { lowerBound: 'properties.DoubleValue', upperBound: 'properties.DoubleValue' } } }] }, { showTitle: false, title: { en: '', fr: '' }, criteria: [] }],
      },
      active: true,
      page: { home: false, iconType: 'DEFAULT', title: { en: 'Search Test', fr: 'Search Test' } },
      confHash: '9dd1c595c77a23ce6c86fdccf730cea8361a48b718899e3f95b2e4572cc8a365',
    },
    links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/7' }, { rel: 'update', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/7' }, { rel: 'delete', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/7' }],
  },
  52: {
    content: {
      id: 52,
      type: 'description',
      description: 'Test description',
      applicationId: 'user',
      container: 'page-top-header',
      conf: {
        allowSearching: true,
        DATA: {
          showDescription: true, showTags: true, showCoupling: true, showLinkedDocuments: true, showLinkedEntities: true, showOtherVersions: false, showThumbnail: false, showQuicklooks: true, groups: [{ showTitle: false, title: { en: '', fr: '' }, elements: [{ attributes: [{ name: 'label', renderer: 'defaultRenderer' }], label: { en: 'Label', fr: 'Label' } }] }], attributeToDescriptionFiles: [], hideEmptyAttributes: false,
        },
        DATASET: {
          showDescription: true, showTags: true, showCoupling: true, showLinkedDocuments: true, showLinkedEntities: true, showOtherVersions: false, showThumbnail: false, showQuicklooks: true, groups: [], attributeToDescriptionFiles: [{ attributes: [{ name: 'properties.testUrl', renderer: 'defaultRenderer' }] }], hideEmptyAttributes: false,
        },
        COLLECTION: {
          showDescription: true, showTags: true, showCoupling: true, showLinkedDocuments: true, showLinkedEntities: true, showOtherVersions: false, showThumbnail: false, showQuicklooks: true, groups: [], attributeToDescriptionFiles: [], hideEmptyAttributes: false,
        },
        DOCUMENT: {
          showDescription: true, showTags: true, showCoupling: true, showLinkedDocuments: true, showLinkedEntities: true, showOtherVersions: false, showThumbnail: false, showQuicklooks: true, groups: [], attributeToDescriptionFiles: [], hideEmptyAttributes: false,
        },
        tabTitles: { PARAMETERS: { en: 'ParametersEN', fr: 'ParamètresFR' }, INFORMATION: { en: 'InformationEN', fr: 'InformationFR' } },
      },
      active: true,
      page: { home: false, title: {} },
      confHash: 'f6bbd8d96e357707a3e44d62f719c9015b43b311ce0c47e4352f8ace11a3381a',
    },
    links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/52' }, { rel: 'update', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/52' }, { rel: 'delete', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/52' }],
  },
  53: {
    content: {
      id: 53,
      type: 'search-results',
      description: 'Catalogue de données - rendy',
      applicationId: 'user',
      container: 'page-content-module',
      conf: {
        primaryPane: 'EXPANDED_COLLAPSIBLE',
        facets: { enabledFor: { DATA: true, DATASET: true }, initiallyEnabled: true, list: [] },
        restrictions: { byDataset: { type: 'SELECTED_DATASETS', selection: ['URN:AIP:DATASET:ssalto:756cedd4-5601-4bf7-9b1e-bbc405f8c682:V1'] }, onData: { lastVersionOnly: false } },
        viewsGroups: {
          DATA: {
            enabled: true,
            tabTitle: {},
            initialMode: 'TABLE',
            enableDownload: false,
            enableRefresh: false,
            sorting: [],
            views: {
              TABLE: { enabled: true, attributes: [{ attributes: [{ name: 'properties.date', renderer: 'time' }], label: { en: 'Time', fr: 'Temps' } }, { attributes: [{ name: 'properties.date', renderer: 'timeWithMilliseconds' }], label: { en: 'Accurate Time', fr: 'Temps précis' } }, { attributes: [{ name: 'properties.date', renderer: 'date' }], label: { en: 'Date', fr: 'Date' } }, { attributes: [{ name: 'properties.date', renderer: 'dateWithMinutes' }], label: { en: 'Date and minutes', fr: 'Date et minutes' } }, { attributes: [{ name: 'properties.date', renderer: 'defaultRenderer' }], label: { en: 'Date and seconds', fr: 'Date et secondes' } }, { attributes: [{ name: 'properties.date', renderer: 'dateWithMilliseconds' }], label: { en: 'Accurate date', fr: 'Date précise' } }, { attributes: [{ name: 'properties.date', renderer: 'dateIso' }], label: { en: 'ISO Date', fr: 'Date ISO' } }, { attributes: [{ name: 'id', renderer: 'multiline' }], label: { en: 'Internal ID', fr: 'ID Interne' } }] },
              QUICKLOOK: { enabled: true, attributes: [{ attributes: [{ name: 'properties.date', renderer: 'dateWithMilliseconds' }], label: { en: 'Accurate date', fr: 'Date précise' } }] },
              MAP: {
                enabled: false,
                attributes: [],
                mapEngine: 'CESIUM',
                layers: [{
                  layerName: 'Layer', enabled: false, background: false, layerViewMode: 'MODE_3D', url: null,
                }],
              },
            },
          },
          DATASET: {
            enabled: true, tabTitle: {}, initialMode: 'TABLE', enableRefresh: false, sorting: [], views: { TABLE: { enabled: true, attributes: [{ attributes: [{ name: 'properties.testUrl', renderer: 'renderImage' }], label: { en: 'testUrl', fr: 'testUrl' } }] } },
          },
        },
        criteriaGroups: [],
      },
      active: true,
      page: { home: false, iconType: 'DEFAULT', title: { en: 'Renderer test', fr: 'Test de rendu' } },
      confHash: '76f9624e3d23a110bf3db88dee233b99ef28b13a5ada9ef62657534432a50f9f',
    },
    links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/53' }, { rel: 'update', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/53' }, { rel: 'delete', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/53' }],
  },
  54: {
    content: {
      id: 54,
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
        criteriaGroups: [{ showTitle: true, title: { en: 'Defaults', fr: 'Standards' }, criteria: [{ pluginId: 2, label: { en: 'Search for', fr: 'Que recherchez vous ?' }, conf: { attributes: {} } }] }],
      },
      active: true,
      page: { home: false, iconType: 'DEFAULT', title: { en: 'Catalog (default)', fr: 'Catalogue (default)' } },
      confHash: '2735688648c24bd18f5b24c9f91f4d4791bcb91a426f1b5e1605940a5e44559a',
    },
    links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/54' }, { rel: 'update', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/54' }, { rel: 'delete', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/54' }],
  },
  55: {
    content: {
      id: 55,
      type: 'order-cart',
      description: 'Cart (default)',
      applicationId: 'user',
      container: 'page-content-module',
      conf: {
        showDatasets: true, showProcessing: true, showFilters: true, primaryPane: 'ALWAYS_EXPANDED',
      },
      active: true,
      page: { home: false, iconType: 'DEFAULT', title: { en: 'Cart', fr: 'Panier' } },
      confHash: '8210c92d833a3d4d6266f7c52b690cf292fded81d50180fa2b6c58388cb15dc1',
    },
    links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/55' }, { rel: 'update', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/55' }, { rel: 'delete', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/55' }],
  },
  56: {
    content: {
      id: 56, type: 'order-history', description: 'Orders (default)', applicationId: 'user', container: 'page-content-module', conf: { primaryPane: 'ALWAYS_EXPANDED' }, active: true, page: { home: false, iconType: 'DEFAULT', title: { en: 'Orders', fr: 'Commandes' } }, confHash: '659a822a17bc1cf9710fd3defd7a4f27de7aebc7f9483e34b7b1513dabc4e1bd',
    },
    links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/56' }, { rel: 'update', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/56' }, { rel: 'delete', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-access-project/applications/user/modules/56' }],
  },
}
